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

const limited_center_area = {
	key: 'limited_center_area',
	name: 'limited_center_area',
	type: 'vector',
	options: {
		features: [
			{
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'Polygon',
					coordinates: [
						[
							[14, 49.5],
							[14, 50.5],
							[17, 50.5],
							[17, 49.5],
							[14, 49.5],
						],
					],
				},
			},
		],
		style: {
			rules: [
				{
					styles: [
						{
							outlineColor: '#333333',
							outlineWidth: 4,
							outlineOpacity: 0.5,
						},
					],
				},
			],
		},
	},
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
	layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
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
					layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
				},
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
						<Prop name="onResize" type="function">
							Function called when width or height of the map was changed
						</Prop>
						<Prop name="onClick" type="function">
							Function called on click
						</Prop>
						<Prop name="onLayerClick" type="function">
							Function called on layer click
						</Prop>
						<Prop name="resources" type="object">
							External resources for the map. See{' '}
							<Link to="#resources">Resources</Link> section.
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
						mapComponent={ReactLeafletMap}
						backgroundLayer={connectedBackgroundLayer}
					>
						<MapControls levelsBased zoomOnly />
					</Map>
				</div>
				<p>
					Layers are served from ptr.gisat.cz. Check your configuration if there
					are no layers in the map.
				</p>
				<SyntaxHighlighter language="jsx">
					{`import {ReactLeafletMap, MapControls, PresentationMap} from "@gisatcz/ptr-maps";
				const Map = connects.Map(PresentationMap);
				<Map
					mapComponent={ReactLeafletMap}
					backgroundLayer={{
						key: 'osm',
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
					}}
					view={{
						center: {lat: 50, lon: 15},
						boxRange: 500000
					}}
				>
					<MapControls levelsBased zoomOnly/>
				</Map>
				`}
				</SyntaxHighlighter>

				<h3 id="connected">Connected to store</h3>
				<p>
					The map is completely controlled from store. The map with given key
					should already be present in the store.
				</p>
				<div style={{marginTop: 10, height: 400}}>
					<Map mapComponent={ReactLeafletMap} stateMapKey="docs-connected-map">
						<MapControls levelsBased zoomOnly />
					</Map>
				</div>
				<p>
					Layers are served from ptr.gisat.cz. Check your configuration if there
					are no layers in the map.
				</p>
				<SyntaxHighlighter language="jsx">
					{`import {ReactLeafletMap, MapControls, PresentationMap} from "@gisatcz/ptr-maps";
				const Map = connects.Map(PresentationMap);
				// Map with key 'docs-connected-map' should already be in the store
				<Map
					mapComponent={ReactLeafletMap}
					stateMapKey="docs-connected-map"
				>
					<MapControls levelsBased zoomOnly/>
				</Map>
				`}
				</SyntaxHighlighter>

				<h2 id="view-limits">View limits</h2>
				<p>
					Which part of the world is visible on the map and how is represented
					by <Link to="/architecture/systemDataTypes/mapView">view</Link>{' '}
					object. Currently, it is possible to restrict the zoom (Leaflet,
					WorldWind) and center (just Leaflet) via{' '}
					<InlineCodeHighlighter>viewLimits</InlineCodeHighlighter> prop.
				</p>

				<h3>Limited zoom</h3>
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

				<h3>Limited center</h3>
				<p>The limited center area is shown as polygon.</p>

				<SyntaxHighlighter language="jsx">
					{`
				<Map
					//...
					view={{
						center: {lat: 50.5, lon: 15.5},
						boxRange: 100000
					}}
					viewLimits={{
					    center: {
					    	maxLat: 50.5,
					    	minLat: 49.5,
					    	maxLon: 17,
					    	minLon: 14
					    }
					}}
				>
					<MapControls zoomOnly levelsBased />
				</Map>
				`}
				</SyntaxHighlighter>

				<div style={{margin: 5, height: 400, width: 600}}>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						backgroundLayer={presentational_backgroundLayer}
						layers={[limited_center_area]}
						view={{
							center: {lat: 50.5, lon: 15.5},
							boxRange: 100000,
						}}
						viewLimits={{
							center: {
								maxLat: 50.5,
								minLat: 49.5,
								maxLon: 17,
								minLon: 14,
							},
						}}
					>
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>

				<h3>Limits combination</h3>
				<p>
					By combining of the limits, we can only allow a certain area to be
					displayed. In the example below, the map view is limited to the Czech
					Republic area.
				</p>

				<div style={{margin: 5, height: 400, width: 800}}>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						backgroundLayer={presentational_backgroundLayer}
						layers={[limited_center_area]}
						view={{
							center: {lat: 49.8, lon: 15.5},
							boxRange: 200000,
						}}
						viewLimits={{
							boxRangeRange: [null, 200000],
							center: {
								maxLat: 50.5,
								minLat: 49.5,
								maxLon: 17,
								minLon: 14,
							},
						}}
					>
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>

				<h2 id="resources">Resources</h2>
				<p>
					Pass external resources to the map. Currently, the icons are
					implemented.
				</p>
				<SyntaxHighlighter language="javascript">
					{`
				{
					icons: {
						'iconKey': {
							component: Icon, // React component
							componentProps: {icon: 'crop'}, 
							anchorPoint: [0.5, 1] // relative anchor position (it means that the icon reference point is placed in the middle horizontally and at the bottom vertically)
						}
					}
				}
				`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default MapDoc;
