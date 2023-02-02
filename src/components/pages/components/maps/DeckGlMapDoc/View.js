import React from 'react';
import Page from '../../../../Page';

import {
	MapScale,
	MapControls,
	deckgl_core,
	deckgl_geolayers,
	deckgl_layers,
	PresentationMap,
	DeckGlMap,
} from '@gisatcz/ptr-maps';
import {IconTool} from '@gisatcz/ptr-atoms';
import {useState, useRef} from 'react';

const defaultView = {
	center: {lat: 37.78, lon: -122.45}, //Porta Vila Island
	boxRange: 4000,
	pitch: 0,
	bearing: 0,
};

const layer = new deckgl_geolayers.TileLayer({
	// https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
	data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',

	minZoom: 0,
	maxZoom: 19,
	tileSize: 256,

	renderSubLayers: props => {
		const {
			bbox: {west, south, east, north},
		} = props.tile;

		return new deckgl_layers.BitmapLayer(props, {
			data: null,
			image: props.data,
			bounds: [west, south, east, north],
		});
	},
});

const View = () => {
	const [viewIn3D, setViewIn3D] = useState(false);
	const [stateVersion, setStateVersion] = useState(0);
	const stateViewRef = useRef(defaultView);

	const removeViewTransitionRef = useRef(update => {
		update.deckGlTransitionProperties = {};

		stateViewRef.current = {
			...stateViewRef.current,
			deckGlTransitionProperties: {},
		};
	});

	const toggle3DView = () => {
		setViewIn3D(!viewIn3D);

		const stateUpdate = {
			...stateViewRef.current,
			pitch: viewIn3D ? 0 : 60,
			bearing: viewIn3D ? 0 : 0,
			deckGlTransitionProperties: {
				transitionInterpolator: new deckgl_core.LinearInterpolator([
					'pitch',
					'bearing',
				]),
				transitionDuration: 700,
				onTransitionEnd: removeViewTransitionRef.current,
			},
		};
		stateViewRef.current = stateUpdate;
	};

	const updateStateView = view => {
		setStateVersion(stateVersion + 1);
		stateViewRef.current = {
			...stateViewRef.current,
			...view,
		};
	};

	return (
		<Page title="Deck.gl 3D view">
			<h2>Example</h2>
			<div style={{height: 400, marginBottom: 10, position: 'relative'}}>
				<div
					className="Flus-Map-Components"
					style={{position: 'absolute', top: '16px', right: '16px'}}
				>
					<IconTool
						className={`Flus-3Dview ${viewIn3D ? 'is-active' : ''}`}
						onClick={() => toggle3DView()}
						floating
						medium
						icon="ri-3D-view"
					/>
				</div>
				<PresentationMap
					mapComponent={DeckGlMap}
					view={stateViewRef.current}
					layers={[layer]}
					mapComponentProps={{
						controller: {
							dragRotate: viewIn3D,
						},
					}}
					onViewChange={updateStateView}
				>
					<MapControls levelsBased zoomOnly className="" />
					<MapScale className="" />
				</PresentationMap>
			</div>
		</Page>
	);
};

export default View;
