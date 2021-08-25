import React from 'react';
import Page, {
	DocsToDo,
	DocsToDoInline,
	InlineCodeHighlighter,
	LightDarkBlock,
	SyntaxHighlighter,
} from '../../../../Page';

import {
	ReactLeafletMap,
	WorldWindMap,
	MapControls,
	MapSet,
	MapSetPresentationMap,
	PresentationMap,
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
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
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
			key: 'docs-MapSet',
			activeMapKey: 'docs-MapSet-Map1',
			data: {
				backgroundLayer: connectedBackgroundLayer,
				view: {
					center: {
						lat: 50,
						lon: 15,
					},
					boxRange: 5000000,
				},
			},
		});

		props.addSet({
			key: 'docs-MapSet-worldWind',
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
		this.props.removeMap('docs-MapSet-Map1');
		this.props.removeMap('docs-MapSet-Map2');
		this.props.removeMap('docs-MapSet-Map3');
		this.props.removeMap('docs-MapSetWorldWind-Map1');
		this.props.removeMap('docs-MapSetWorldWind-Map2');
		this.props.removeMap('docs-MapSetWorldWind-Map3');
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
						stateMapSetKey="docs-MapSet"
						mapComponent={ReactLeafletMap}
						connectedMapComponent={ConnectedMap}
					>
						<MapControls levelsBased zoomOnly />
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
						setKey="uncontrolled-leaflet"
						activeMapKey="map-2"
						mapComponent={ReactLeafletMap}
						view={{
							boxRange: 3000000,
						}}
						sync={{
							boxRange: true,
							center: true,
						}}
						backgroundLayer={connectedBackgroundLayer}
					>
						<MapSetPresentationMap mapKey="map-1" />
						<MapSetPresentationMap mapKey="map-2" />
						<MapSetPresentationMap mapKey="map-3" />
						<MapControls levelsBased zoomOnly />
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
		boxRange: 3000000
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
						activeMapKey="map-2"
						mapComponent={ReactLeafletMap}
						view={{
							boxRange: 5000000,
						}}
						sync={{
							boxRange: true,
							center: true,
						}}
						backgroundLayer={unconnectedBackgroundOsm}
					>
						<MapSetPresentationMap mapKey="map-1" />
						<MapSetPresentationMap mapKey="map-2" />
						<MapSetPresentationMap mapKey="map-3" />
						<MapControls levelsBased zoomOnly />
					</MapSet>
				</div>
				<SyntaxHighlighter language="jsx">
					{`import {connects} from '@gisatcz/ptr-state';
import {ReactLeafletMap, MapControls, MapSet} from "@gisatcz/ptr-maps";

<MapSet
	activeMapKey='map-2'
	mapComponent={ReactLeafletMap}
	view={{
		boxRange: 5000000
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

				<h2>World Wind</h2>
				<h3>Connected to store</h3>
				<p>
					Layers are served from ptr.gisat.cz. Check your configuration if there
					are no layers in the map below.
				</p>
				<div style={{height: 500}}>
					<ConnectedMapSet
						stateMapSetKey="docs-MapSet-worldWind"
						mapComponent={WorldWindMap}
						connectedMapComponent={ConnectedMap}
					>
						<MapControls />
					</ConnectedMapSet>
				</div>

				<h3>Uncontrolled</h3>
				<p>
					Layers are served from ptr.gisat.cz. Check your configuration if there
					are no layers in the map below.
				</p>
				<div style={{height: 500}}>
					<ConnectedMapSet
						activeMapKey="map-2"
						mapComponent={WorldWindMap}
						view={{
							boxRange: 1000000,
							heading: 10,
							tilt: 10,
						}}
						sync={{
							boxRange: true,
							center: true,
						}}
						backgroundLayer={unconnectedBackgroundOsm}
					>
						<MapSetPresentationMap mapKey="map-1" />
						<MapSetPresentationMap mapKey="map-2" />
						<MapSetPresentationMap mapKey="map-3" />
						<MapControls />
					</ConnectedMapSet>
				</div>

				<h3>Uncontrolled unconnected</h3>
				<div style={{height: 500}}>
					<MapSet
						activeMapKey="map-2"
						mapComponent={WorldWindMap}
						view={{
							boxRange: 100000,
							heading: 10,
							tilt: 10,
						}}
						sync={{
							boxRange: true,
							center: true,
							heading: true,
						}}
						backgroundLayer={unconnectedBackgroundOsm}
						layers={unconnectedLayersCuzk}
					>
						<MapSetPresentationMap mapKey="map-1" />
						<MapSetPresentationMap mapKey="map-2" />
						<MapSetPresentationMap mapKey="map-3" />
						<MapControls />
					</MapSet>
				</div>
			</Page>
		);
	}
}

export default MapSetDoc;
