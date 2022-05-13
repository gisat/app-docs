import React from 'react';
import Page, {ImplementationToDo, SyntaxHighlighter} from '../../../../Page';

import {
	ReactLeafletMap,
	WorldWindMap,
	MapControls,
	MapSet,
	MapSetPresentationMap,
	PresentationMap,
	DeckGlMap,
} from '@gisatcz/ptr-maps';

import {Link} from 'react-router-dom';
import {connects} from '@gisatcz/ptr-state';
import ComponentPropsTable, {
	Prop,
	Section,
} from '../../../../ComponentPropsTable/ComponentPropsTable';

const ConnectedMap = connects.Map(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

/* ===== DATA SOURCES ===== */

/* ===== Connected to store ===== */

const connectedBackgroundLayer = {
	layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
};

/* ===== Unconnected to store ===== */

const unconnectedBackgroundOsm = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

const unconnectedLayersCuzk = [
	{
		key: 'cuzk_ortofoto',
		name: 'CUZK Ortofoto',
		type: 'wms',
		opacity: 0.5,
		options: {
			url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
			params: {
				layers: 'GR_ORTFOTORGB',
			},
		},
	},
];

class MapSetDoc extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const props = this.props;
		props.addSet({
			key: 'docs-MapSetDeck',
			activeMapKey: 'docs-MapSetDeck-Map1',
			data: {
				backgroundLayer: connectedBackgroundLayer,
				view: {
					center: {
						lat: 50,
						lon: 15,
					},
					boxRange: 2000000,
				},
			},
		});

		props.addSet({
			key: 'docs-MapSet',
			activeMapKey: 'docs-MapSet-Map1',
			data: {
				backgroundLayer: connectedBackgroundLayer,
				view: {
					center: {
						lat: 50,
						lon: 15,
					},
					boxRange: 2000000,
				},
			},
		});

		props.addSet({
			key: 'docs-MapSet-worldWind',
			activeMapKey: 'docs-MapSetWorldWind-Map1',
			data: {
				backgroundLayer: connectedBackgroundLayer,
				view: {
					center: {
						lat: 50,
						lon: 15,
					},
					boxRange: 2000000,
				},
			},
		});

		props.setSetSync('docs-MapSetDeck', {
			center: true,
			boxRange: true,
			heading: true,
		});
		props.setSetSync('docs-MapSet', {
			center: true,
			boxRange: true,
			heading: true,
		});
		props.setSetSync('docs-MapSet-worldWind', {
			center: true,
			boxRange: true,
			heading: true,
		});

		props.addMap({key: 'docs-MapSetDeck-Map1'});
		props.addMap({key: 'docs-MapSetDeck-Map2'});
		props.addMap({key: 'docs-MapSetDeck-Map3'});
		props.addMapToSet('docs-MapSetDeck-Map1', 'docs-MapSetDeck');
		props.addMapToSet('docs-MapSetDeck-Map2', 'docs-MapSetDeck');
		props.addMapToSet('docs-MapSetDeck-Map3', 'docs-MapSetDeck');

		props.addMap({key: 'docs-MapSet-Map1'});
		props.addMap({key: 'docs-MapSet-Map2'});
		props.addMap({key: 'docs-MapSet-Map3'});
		props.addMapToSet('docs-MapSet-Map1', 'docs-MapSet');
		props.addMapToSet('docs-MapSet-Map2', 'docs-MapSet');
		props.addMapToSet('docs-MapSet-Map3', 'docs-MapSet');

		props.addMap({key: 'docs-MapSetWorldWind-Map1'});
		props.addMap({key: 'docs-MapSetWorldWind-Map2'});
		props.addMap({key: 'docs-MapSetWorldWind-Map3'});
		props.addMapToSet('docs-MapSetWorldWind-Map1', 'docs-MapSet-worldWind');
		props.addMapToSet('docs-MapSetWorldWind-Map2', 'docs-MapSet-worldWind');
		props.addMapToSet('docs-MapSetWorldWind-Map3', 'docs-MapSet-worldWind');
	}

	componentWillUnmount() {
		this.props.removeSet('docs-MapSet');
		this.props.removeSet('docs-MapSet-worldWind');
		this.props.removeSet('docs-MapSetDeck');
		this.props.removeMap('docs-MapSet-Map1');
		this.props.removeMap('docs-MapSet-Map2');
		this.props.removeMap('docs-MapSet-Map3');
		this.props.removeMap('docs-MapSetWorldWind-Map1');
		this.props.removeMap('docs-MapSetWorldWind-Map2');
		this.props.removeMap('docs-MapSetWorldWind-Map3');
		this.props.removeMap('docs-MapSetDeck-Map1');
		this.props.removeMap('docs-MapSetDeck-Map2');
		this.props.removeMap('docs-MapSetDeck-Map3');
	}

	render() {
		return (
			<Page title="Map set">
				<h2>Props</h2>
				<ComponentPropsTable>
					<Prop
						name="mapComponent"
						type="WorldWindMap|ReactLeafletMap"
						required
					>
						Presentational component to render the final map
					</Prop>
					<Section name="Controlled">
						<Prop name="connectedMapComponent" type="ConnectedMap" required>
							<Link to="./map#connected">Map component connected to store</Link>
							.
						</Prop>
						<Prop name="stateMapSetKey" required type="string">
							Valid key of a map set in map store
						</Prop>
					</Section>
					<Section name="Uncontrolled">
						<Prop name="activeMapKey" type="string" required>
							Valid key of active map
						</Prop>
						<Prop name="view" required type="map view">
							<Link to="/architecture/systemDataTypes/mapView">
								Presentation view
							</Link>
						</Prop>
						<Prop name="layers" type="layers">
							<Link to="/architecture/systemDataTypes/layers">Layers</Link>
						</Prop>
						<Prop name="backgroundLayer" type="background layer">
							<Link to="/architecture/systemDataTypes/layers#backgroundLayer">
								Background layer
							</Link>
						</Prop>
						<Prop name="sync" type="object">
							Which view parameters will be synchronized in all maps
						</Prop>
					</Section>
				</ComponentPropsTable>

				{/* DeckGl ------------------------------------------------------------------------------------*/}
				<h2>DeckGl</h2>
				<h3>Connected to store</h3>
				<p>
					The map is completely controlled from store. The map with given key
					should already be in the store.
				</p>
				<p>
					Layers are served from ptr.gisat.cz. Check your configuration if there
					are no layers in the map below.
				</p>
				<div style={{height: 500}}>
					<ConnectedMapSet
						stateMapSetKey="docs-MapSetDeck"
						mapComponent={DeckGlMap}
						connectedMapComponent={ConnectedMap}
						wrapper
					>
						<MapControls levelsBased zoomOnly key={'mapControls'} />
					</ConnectedMapSet>
				</div>
				<SyntaxHighlighter language="jsx">
					{`import {connects} from '@gisatcz/ptr-state';
import {DeckGlMap, MapControls, MapSet, PresentationMap} from "@gisatcz/ptr-maps";

const ConnectedMap = connects.Map(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

// Map set with key 'docs-MapSetDeck' should already be in the store
<ConnectedMapSet
	stateMapSetKey="docs-MapSetDeck"
	mapComponent={DeckGlMap}
	connectedMapComponent={ConnectedMap}
>
	<MapControls levelsBased zoomOnly/>
</ConnectedMapSet>
`}
				</SyntaxHighlighter>

				<h3>Uncontrolled</h3>
				<ImplementationToDo>
					Fix uncontrolled map set generally
				</ImplementationToDo>

				<h3>Uncontrolled unconnected</h3>
				<p>
					Presentational components only. The map is not controlled from store.
					Layers and backgroundLayer have to be defined directly.
				</p>
				<div style={{height: 500}}>
					<MapSet
						wrapper
						activeMapKey="mapDeck-2"
						mapComponent={DeckGlMap}
						view={{
							boxRange: 2000000,
						}}
						sync={{
							boxRange: true,
							center: true,
						}}
						backgroundLayer={unconnectedBackgroundOsm}
					>
						<MapSetPresentationMap mapKey="mapDeck-1" key={'map-1'} />
						<MapSetPresentationMap mapKey="mapDeck-2" key={'map-2'} />
						<MapSetPresentationMap mapKey="mapDeck-3" key={'map-3'} />
						<MapControls levelsBased zoomOnly key={'mapControls'} />
					</MapSet>
				</div>
				<SyntaxHighlighter language="jsx">
					{`
import {DeckGlMap, MapControls, MapSet} from "@gisatcz/ptr-maps";

<MapSet
	activeMapKey='mapDeck-2'
	mapComponent={DeckGlMap}
	view={{
		boxRange: 2000000
	}}
	sync={{
		boxRange: true,
		center: true
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
>
	<MapSetPresentationMap mapKey='mapDeck-1'/>
	<MapSetPresentationMap mapKey='mapDeck-2'/>
	<MapSetPresentationMap mapKey='mapDeck-3'/>
	<MapControls levelsBased zoomOnly/>
</MapSet>
`}
				</SyntaxHighlighter>

				{/* ReactLeaflet ------------------------------------------------------------------------------------*/}
				<h2>ReactLeaflet</h2>
				<h3>Connected to store</h3>
				<p>
					The map is completely controlled from store. The map with given key
					should already be in the store.
				</p>
				<p>
					Layers are served from ptr.gisat.cz. Check your configuration if there
					are no layers in the map below.
				</p>
				<div style={{height: 500}}>
					<ConnectedMapSet
						wrapper
						stateMapSetKey="docs-MapSet"
						mapComponent={ReactLeafletMap}
						connectedMapComponent={ConnectedMap}
					>
						<MapControls levelsBased zoomOnly key={'mapControls'} />
					</ConnectedMapSet>
				</div>
				<SyntaxHighlighter language="jsx">
					{`import {connects} from '@gisatcz/ptr-state';
import {ReactLeafletMap, MapControls, MapSet, PresentationMap} from "@gisatcz/ptr-maps";

const ConnectedMap = connects.Map(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

// Map set with key 'docs-MapSet' should already be in the store
<ConnectedMapSet
	stateMapSetKey="docs-MapSet"
	mapComponent={ReactLeafletMap}
	connectedMapComponent={ConnectedMap}
>
	<MapControls levelsBased zoomOnly/>
</ConnectedMapSet>
`}
				</SyntaxHighlighter>

				<h3>Uncontrolled</h3>
				<ImplementationToDo>Missing in ptr-state v2</ImplementationToDo>
				<p>
					The map is not controlled from store, but layer data is collected
					based on stored metadata.
				</p>
				<p>
					Layers are served from ptr.gisat.cz. Check your configuration if there
					are no layers in the map below.
				</p>
				<div style={{height: 500}}>
					<ConnectedMapSet
						wrapper
						setKey="uncontrolled-leaflet"
						activeMapKey="map-2"
						mapComponent={ReactLeafletMap}
						view={{
							boxRange: 2000000,
						}}
						sync={{
							boxRange: true,
							center: true,
						}}
						backgroundLayer={connectedBackgroundLayer}
					>
						<MapSetPresentationMap mapKey="map-1" key={'map-1'} />
						<MapSetPresentationMap mapKey="map-2" key={'map-2'} />
						<MapSetPresentationMap mapKey="map-3" key={'map-3'} />
						<MapControls levelsBased zoomOnly key={'mapControls'} />
					</ConnectedMapSet>
				</div>
				<SyntaxHighlighter language="jsx">
					{`import {connects} from '@gisatcz/ptr-state';
import {ReactLeafletMap, MapControls, MapSet, MapSetPresentationMap} from "@gisatcz/ptr-maps";

const ConnectedMapSet = connects.MapSet(MapSet);

<ConnectedMapSet
	setKey="uncontrolled-leaflet"
	activeMapKey='map-2'
	mapComponent={ReactLeafletMap}
	view={{
		boxRange: 2000000
	}}
	sync={{
		boxRange: true,
		center: true
	}}
	backgroundLayer={{
		layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
	}}
>
	<MapSetPresentationMap mapKey='map-1'/>
	<MapSetPresentationMap mapKey='map-2'/>
	<MapSetPresentationMap mapKey='map-3'/>
	<MapControls levelsBased zoomOnly/>
</ConnectedMapSet>
`}
				</SyntaxHighlighter>

				<h3>Uncontrolled unconnected</h3>
				<p>
					Presentational components only. The map is not controlled from store.
					Layers and backgroundLayer have to be defined directly.
				</p>
				<div style={{height: 500}}>
					<MapSet
						wrapper
						activeMapKey="map-2"
						mapComponent={ReactLeafletMap}
						view={{
							boxRange: 2000000,
						}}
						sync={{
							boxRange: true,
							center: true,
						}}
						backgroundLayer={unconnectedBackgroundOsm}
					>
						<MapSetPresentationMap mapKey="map-1" key={'map-1'} />
						<MapSetPresentationMap mapKey="map-2" key={'map-2'} />
						<MapSetPresentationMap mapKey="map-3" key={'map-3'} />
						<MapControls levelsBased zoomOnly key={'mapControls'} />
					</MapSet>
				</div>
				<SyntaxHighlighter language="jsx">
					{`
import {ReactLeafletMap, MapControls, MapSet} from "@gisatcz/ptr-maps";

<MapSet
	activeMapKey='map-2'
	mapComponent={ReactLeafletMap}
	view={{
		boxRange: 2000000
	}}
	sync={{
		boxRange: true,
		center: true
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
>
	<MapSetPresentationMap mapKey='map-1'/>
	<MapSetPresentationMap mapKey='map-2'/>
	<MapSetPresentationMap mapKey='map-3'/>
	<MapControls levelsBased zoomOnly/>
</MapSet>
`}
				</SyntaxHighlighter>

				{/* WorldWind ------------------------------------------------------------------------------------*/}
				<h2>World Wind</h2>
				<h3>Connected to store</h3>
				<p>
					Layers are served from ptr.gisat.cz. Check your configuration if there
					are no layers in the map below.
				</p>
				<div style={{height: 500}}>
					<ConnectedMapSet
						wrapper
						stateMapSetKey="docs-MapSet-worldWind"
						mapComponent={WorldWindMap}
						connectedMapComponent={ConnectedMap}
					>
						<MapControls key={'mapControls'} />
					</ConnectedMapSet>
				</div>

				<h3>Uncontrolled</h3>
				<ImplementationToDo>Missing in ptr-state v2</ImplementationToDo>
				<p>
					Layers are served from ptr.gisat.cz. Check your configuration if there
					are no layers in the map below.
				</p>
				<div style={{height: 500}}>
					<ConnectedMapSet
						wrapper
						activeMapKey="map-2"
						mapComponent={WorldWindMap}
						view={{
							boxRange: 2000000,
							heading: 10,
							tilt: 10,
						}}
						sync={{
							boxRange: true,
							center: true,
							heading: true,
							tilt: true,
						}}
						backgroundLayer={unconnectedBackgroundOsm}
					>
						<MapSetPresentationMap mapKey="map-1" key={'map-1'} />
						<MapSetPresentationMap mapKey="map-2" key={'map-2'} />
						<MapSetPresentationMap mapKey="map-3" key={'map-3'} />
						<MapControls key={'mapControls'} />
					</ConnectedMapSet>
				</div>

				<h3>Uncontrolled unconnected</h3>
				<div style={{height: 500}}>
					<MapSet
						wrapper
						activeMapKey="map-2"
						mapComponent={WorldWindMap}
						view={{
							boxRange: 2000000,
							heading: 10,
							tilt: 10,
						}}
						sync={{
							boxRange: true,
							center: true,
							heading: true,
							tilt: true,
						}}
						backgroundLayer={unconnectedBackgroundOsm}
						layers={unconnectedLayersCuzk}
					>
						<MapSetPresentationMap mapKey="map-1" />
						<MapSetPresentationMap mapKey="map-2" />
						<MapSetPresentationMap mapKey="map-3" />
						<MapControls key={'mapControls'} />
					</MapSet>
				</div>
			</Page>
		);
	}
}

export default MapSetDoc;
