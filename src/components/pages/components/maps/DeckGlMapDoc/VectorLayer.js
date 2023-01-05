import React from 'react';
import {cloneDeep as _cloneDeep} from 'lodash';
import Page, {ImplementationToDo, SyntaxHighlighter} from '../../../../Page';
import {DeckGlMap, MapControls, PresentationMap} from '@gisatcz/ptr-maps';
import largePointDataFeatures from '../../../../mockData/map/largePointData/sample_points_5000_mini.json';
import nuts_2 from '../../../../mockData/map/nuts_2.json';
import {Link} from 'react-router-dom';

const pointsView = {
	center: {lat: 50.35, lon: 15.8},
	boxRange: 10000,
};

const viewEurope = {
	center: {lat: 50, lon: 15},
	boxRange: 1000000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

// Polygons
const choroplethStyle = {
	rules: [
		{
			styles: [
				{
					outlineWidth: 1,
					outlineColor: '#666666',
				},
				{
					attributeKey: 'diverging_attr',
					attributeClasses: [
						{
							interval: [-5, -3],
							intervalBounds: [true, false],
							fill: '#d7191c',
						},
						{
							interval: [-3, -1],
							intervalBounds: [true, false],
							fill: '#fdae61',
						},
						{
							interval: [-1, 1],
							intervalBounds: [true, false],
							fill: '#ffffbf',
						},
						{
							interval: [1, 3],
							intervalBounds: [true, false],
							fill: '#a6d96a',
						},
						{
							interval: [3, 5],
							intervalBounds: [true, false],
							fill: '#1a9641',
						},
					],
				},
			],
		},
	],
};

const choropleth = {
	key: 'choropleth',
	type: 'vector',
	options: {
		features: nuts_2.features,
		hoverable: true,
		selectable: true,
		selected: {
			testSelection: {
				keys: ['CZ03'],
				style: 'default',
			},
		},
		style: choroplethStyle,
		fidColumnName: 'id',
	},
};

const choroplethLayers = [choropleth];

// Points
const pointStyle = {
	rules: [
		{
			styles: [
				{
					fill: '#cccccc',
					fillOpacity: 0.85,
					outlineColor: '#555555',
					outlineWidth: 1,
					outlineOpacity: 1,
					size: 1000,
				},
				{
					attributeKey: 'attr1',
					attributeClasses: [
						{
							fill: '#b1001d',
							interval: [0, 30],
							intervalBounds: [true, false],
						},
						{
							fill: '#ffff00',
							interval: [30, 70],
							intervalBounds: [true, false],
						},
						{
							fill: '#50d48e',
							interval: [70, 100],
							intervalBounds: [true, false],
						},
					],
				},
			],
		},
	],
};

const pointAsMarkerStyle = _cloneDeep(pointStyle);
pointAsMarkerStyle.rules[0].styles[0].size = 40;

const pointLayer = {
	key: 'points',
	type: 'vector',
	options: {
		features: largePointDataFeatures,
		style: pointStyle,
		fidColumnName: 'gid',
	},
};

const pointAsMarkerLayer = {
	key: 'points',
	type: 'vector',
	options: {
		features: largePointDataFeatures,
		style: pointAsMarkerStyle,
		pointAsMarker: true,
		fidColumnName: 'gid',
	},
};

const tooltipLayer = {
	key: 'tooltipLayer',
	type: 'vector',
	options: {
		features: largePointDataFeatures,
		style: pointAsMarkerStyle,
		pointAsMarker: true,
		fidColumnName: 'gid',
		hoverable: true,
	},
};

const CustomTooltip = props => {
	const gidsEl = props?.vector.map(v => {
		return <div>gid: {v?.object?.properties?.gid}</div>;
	});
	return <div style={{background: '#ffffff'}}>{gidsEl}</div>;
};

class VectorLayer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			choroplethLayers,
		};

		this.onLayerClick = this.onLayerClick.bind(this);
	}

	onLayerClick(map, layer, features) {
		if (map === 'choropleth-map') {
			let updatedLayers = [
				{
					...choropleth,
					options: {
						...choropleth.options,
						selected: {
							...choropleth.options.selected,
							testSelection: {
								...choropleth.options.selected.testSelection,
								keys: features,
							},
						},
					},
				},
			];

			this.setState({
				choroplethLayers: updatedLayers,
			});
		}
	}

	render() {
		return (
			<Page title="Deck.gl WMS layer">
				<p>
					Use this type of layer to display analytical units, for interactive
					layers or choropleths (see examples below).
				</p>

				<p>
					VectorLayer component is always used inside DeckGlMap component. The
					data are passed via layers prop (see{' '}
					<Link to="/components/maps/map">Map</Link> documentation), where each
					layer is represented by Vector layer data type. For general
					information about Vector layer system data type, see{' '}
					<Link to="/architecture/systemDataTypes/layers#vector">Layers</Link>{' '}
					section.
				</p>

				<h2>Examples</h2>

				<ImplementationToDo>
					Currently, only basic functionality for points and polygons is
					implemented
				</ImplementationToDo>

				<h3>Polygons</h3>
				<div style={{height: 500, marginBottom: 10}}>
					<PresentationMap
						mapComponent={DeckGlMap}
						mapKey="choropleth-map"
						view={viewEurope}
						backgroundLayer={backgroundLayer}
						layers={this.state.choroplethLayers}
						onLayerClick={this.onLayerClick}
					>
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>

				<h3>Points</h3>
				<p>The points retain their geographical dimension (in meters).</p>
				<div style={{height: 400, marginBottom: 10}}>
					<PresentationMap
						mapComponent={DeckGlMap}
						view={pointsView}
						backgroundLayer={backgroundLayer}
						layers={[pointLayer]}
					>
						<MapControls levelsBased zoomOnly />
					</PresentationMap>
				</div>
				<SyntaxHighlighter language="jsx">
					{`<PresentationMap
	mapComponent={DeckGlMap}
	view={{
		center: {lat: 50.35, lon: 15.8},
		boxRange: 10000
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
	layers={[
		key: 'points',
		type: 'vector',
		options: {
			features: largePointDataFeatures,
			style: pointStyle,
			fidColumnName: 'gid'
		},
	]}
>
	<MapControls levelsBased zoomOnly/>
</PresentationMap>
`}
				</SyntaxHighlighter>

				<h4>Points as markers</h4>
				<p>The points retain their dimension on screen (in pixels).</p>
				<div style={{height: 400, marginBottom: 10}}>
					<PresentationMap
						mapComponent={DeckGlMap}
						view={pointsView}
						backgroundLayer={backgroundLayer}
						layers={[pointAsMarkerLayer]}
					>
						<MapControls levelsBased zoomOnly />
					</PresentationMap>
				</div>
				<SyntaxHighlighter language="jsx">
					{`<PresentationMap
	mapComponent={DeckGlMap}
	view={{
		center: {lat: 50.35, lon: 15.8},
		boxRange: 10000
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
	layers={[
		key: 'points',
		type: 'vector',
		options: {
			features: largePointDataFeatures,
			style: pointStyleAsMarkers,
			fidColumnName: 'gid',
			pointAsMarker: true
		},
	]}
>
	<MapControls levelsBased zoomOnly/>
</PresentationMap>
`}
				</SyntaxHighlighter>

				<h3 id="tooltip">Tooltip</h3>
				<div style={{height: 400, marginBottom: 10}}>
					<DeckGlMap
						view={pointsView}
						backgroundLayer={backgroundLayer}
						layers={[tooltipLayer]}
						Tooltip={CustomTooltip}
					/>
				</div>

				<SyntaxHighlighter language="js">
					{`

const CustomTooltip = props => {
	const gidsEl = props?.vector.map(v => {
		return <div>gid: {v?.object?.properties?.gid}</div>;
	});
	return <div style={{background: '#ffffff'}}>{gidsEl}</div>;
};


<DeckGlMap
	view={{
		center: {lat: 50.35, lon: 15.8},
		boxRange: 10000
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
	layers={[
		key: 'points',
		type: 'vector',
		options: {
			features: largePointDataFeatures,
			style: pointStyleAsMarkers,
			fidColumnName: 'gid',
			pointAsMarker: true
			hoverable: true
		},
	]}
	Tooltip={CustomTooltip}
/>
`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default VectorLayer;
