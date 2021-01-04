import React from 'react';
import Page, {
	DocsToDo,
	DocsToDoInline,
	InlineCodeHighlighter,
	LightDarkBlock,
	SyntaxHighlighter,
} from '../../../../Page';
import {
	WorldWindMap,
	MapControls,
	PresentationMap,
	ReactLeafletMap,
} from '@gisatcz/ptr-maps';
import {connects} from '@gisatcz/ptr-state';
import {Link} from 'react-router-dom';
import ComponentPropsTable, {
	Prop,
	Section,
} from '../../../../ComponentPropsTable/ComponentPropsTable';

const Map = connects.Map(PresentationMap);

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 500000,
};

const presentational_backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

// Connected background
const connectedBackgroundLayer = {
	layerTemplateKey: 'd54f7782-976b-4fb2-9066-5f1ca4f3b703',
	metadataModifiers: {
		applicationKey: 'docs',
	},
};

// WMS layer
const presentational_cuzk = {
	key: 'cuzk_ortofoto',
	name: 'CUZK Ortofoto',
	type: 'wms',
	options: {
		url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
		params: {
			layers: 'GR_ORTFOTORGB',
		},
	},
};

// WMS layer from BE - from 206
const connected_wms = {
	key: 'layer-geoinv',
	layerTemplateKey: '097d3fed-e6da-4f08-833e-839c88513b8b',
	metadataModifiers: {
		applicationKey: 'docs',
	},
};

const presentationalLayers = [presentational_cuzk];
const connectedLayers = [connected_wms];

class MapDoc extends React.PureComponent {
	constructor(props) {
		super(props);

		props.addMap({
			key: 'docs-connected-map',
			data: {
				view: {
					center: {lat: 50, lon: 14},
					boxRange: 500000,
				},
				backgroundLayer: {
					layerTemplateKey: 'd54f7782-976b-4fb2-9066-5f1ca4f3b703',
				},
				layers: [
					{
						key: 'layer-cz',
						layerTemplateKey: 'b5afa739-7828-4ed0-8844-306a5470e7e0',
					},
				],
			},
		});
	}

	render() {
		return (
			<Page title="Map">
				<div style={{marginBottom: 10, height: 300}}>
					<PresentationMap
						mapComponent={WorldWindMap}
						backgroundLayer={presentational_backgroundLayer}
						layers={presentationalLayers}
						view={view}
					>
						<MapControls />
					</PresentationMap>
				</div>

				<p>
					The Map is a fundamental component for spatial data visualization. It
					wraps <Link to="./presentational">Presentational map component</Link>{' '}
					together with other optional components useful for visualization and
					control (e.g. <Link to="./controls/MapControls">MapControls</Link>).{' '}
				</p>

				<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="mapComponent" required>
						Presentational component to render the final map
					</Prop>
					<Section name="Controlled">
						<Prop name="stateMapKey" required type="string">
							Valid key of a map in map store
						</Prop>
					</Section>
					<Section name="Uncontrolled">
						<Prop name="mapKey" type="string" />
						<Prop name="view" required type="map view">
							<Link to="/architecture/systemDataTypes/mapView">
								Presentation view
							</Link>
						</Prop>
						<Prop name="viewLimits" type="object">
							Restrict which part of the world is visible and how. See{' '}
							<Link to="#view-limits">View limits</Link> section.
						</Prop>
						<Prop name="layers" type="layers">
							<Link to="/architecture/systemDataTypes/layers">Layers</Link>
						</Prop>
						<Prop name="backgroundLayer" type="background layer">
							<Link to="/architecture/systemDataTypes/layers#backgroundLayer">
								Background layer
							</Link>
						</Prop>
						<Prop name="onViewChange" type="function">
							Function called when a view change is initiated inside the
							Presentation component
						</Prop>
						<Prop name="onClick" type="function">
							Function called on click
						</Prop>
						<Prop name="onLayerClick" type="function">
							Function called on layer click
						</Prop>
						<Prop name="wrapperClasses" type="string">
							Class names for wrapper component
						</Prop>
					</Section>
				</ComponentPropsTable>

				<h2>Component types</h2>
				<h3>Uncontrolled unconnected</h3>
				<p>
					Presentational components only. The map is not controlled from store.
					Layers and backgroundLayer have to be defined directly.
				</p>

				<div style={{marginTop: 10, height: 400}}>
					<PresentationMap
						mapComponent={WorldWindMap}
						backgroundLayer={presentational_backgroundLayer}
						layers={presentationalLayers}
						view={view}
					>
						<MapControls />
					</PresentationMap>
				</div>
				<SyntaxHighlighter language="jsx">
					{`import {WorldWindMap, MapControls, PresentationMap} from "@gisatcz/ptr-maps";

<PresentationMap
	mapComponent={WorldWindMap}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
	layers={[{
		key: 'cuzk_ortofoto',
		name: 'CUZK Ortofoto',
		type: 'wms',
		options: {
			url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
			params: {
				layers: 'GR_ORTFOTORGB'
			}
		}
	}]}
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 500000
	}}
>
	<MapControls/>
</PresentationMap>
`}
				</SyntaxHighlighter>

				<h3>Uncontrolled</h3>
				<p>
					The map is not controlled from store, but layer data is collected
					based on stored metadata.
				</p>
				<div style={{marginTop: 10, height: 400}}>
					<Map
						mapKey="uncontrolled-map"
						view={view}
						mapComponent={WorldWindMap}
						backgroundLayer={connectedBackgroundLayer}
						layers={connectedLayers}
					>
						<MapControls />
					</Map>
				</div>
				<p>
					Layers are served from 192.168.2.206. Check your configuration if
					there are no layers in the map.
				</p>
				<SyntaxHighlighter language="jsx">
					{`import {WorldWindMap, MapControls, PresentationMap} from "@gisatcz/ptr-maps";
const Map = connects.Map(PresentationMap);
<Map
	mapComponent={WorldWindMap}
	backgroundLayer={{
		key: 'layer-geoinv',
		layerTemplateKey: '097d3fed-e6da-4f08-833e-839c88513b8b',
		metadataModifiers: {
			applicationKey: 'docs'
		}
	}}
	layers={[{
		key: 'layer-geoinv',
		layerTemplateKey: '097d3fed-e6da-4f08-833e-839c88513b8b',
		metadataModifiers: {
			applicationKey: 'docs'
		}
	}]}
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 500000
	}}
>
	<MapControls/>
</Map>
`}
				</SyntaxHighlighter>

				<h3 id="connected">Connected to store</h3>
				<p>
					The map is completely controlled from store. The map with given key
					should already be present in the store.
				</p>
				<div style={{marginTop: 10, height: 400}}>
					<Map mapComponent={WorldWindMap} stateMapKey="docs-connected-map">
						<MapControls />
					</Map>
				</div>
				<p>
					Layers are served from 192.168.2.206. Check your configuration if
					there are no layers in the map.
				</p>
				<SyntaxHighlighter language="jsx">
					{`import {WorldWindMap, MapControls, PresentationMap} from "@gisatcz/ptr-maps";
const Map = connects.Map(PresentationMap);
// Map with key 'docs-connected-map' should already be in the store
<Map
	mapComponent={WorldWindMap}
	stateMapKey="docs-connected-map"
>
	<MapControls/>
</Map>
`}
				</SyntaxHighlighter>

				<h2 id="view-limits">View limits</h2>
				<p>
					Which part of the world is visible on the map and how is represented
					by <Link to="/architecture/systemDataTypes/mapView">view</Link>{' '}
					object. Currently, it is possible to restrict the zoom via{' '}
					<InlineCodeHighlighter>viewLimits</InlineCodeHighlighter> prop.
				</p>

				<SyntaxHighlighter language="jsx">
					{`
<Map
	//...
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 16000
	}}
	viewLimits={{
	    boxRangeRange: [4000, 64000]
	}}
>
	<MapControls/>
</Map>
`}
				</SyntaxHighlighter>
				<div style={{display: 'flex', flexWrap: 'wrap'}}>
					<div style={{margin: 5, height: 300, width: 500}}>
						<PresentationMap
							mapComponent={WorldWindMap}
							backgroundLayer={presentational_backgroundLayer}
							view={{
								center: {lat: 50, lon: 15},
								boxRange: 16000,
							}}
							viewLimits={{
								boxRangeRange: [4000, 64000],
							}}
						>
							<MapControls />
						</PresentationMap>
					</div>

					<div style={{margin: 5, height: 300, width: 500}}>
						<PresentationMap
							mapComponent={WorldWindMap}
							backgroundLayer={presentational_backgroundLayer}
							view={{
								center: {lat: 50, lon: 15},
								boxRange: 16000,
							}}
							viewLimits={{
								boxRangeRange: [4000, 64000],
							}}
							levelsBased
						>
							<MapControls zoomOnly levelsBased />
						</PresentationMap>
					</div>

					<div style={{margin: 5, height: 300, width: 500}}>
						<PresentationMap
							mapComponent={ReactLeafletMap}
							backgroundLayer={presentational_backgroundLayer}
							view={{
								center: {lat: 50, lon: 15},
								boxRange: 16000,
							}}
							viewLimits={{
								boxRangeRange: [4000, 64000],
							}}
						>
							<MapControls zoomOnly levelsBased />
						</PresentationMap>
					</div>
				</div>
			</Page>
		);
	}
}

export default MapDoc;
