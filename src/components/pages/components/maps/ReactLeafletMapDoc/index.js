import React from 'react';
import Page, {InlineCodeHighlighter, SyntaxHighlighter} from "../../../../Page";
import {MapControls, PresentationMap, ReactLeafletMap} from "@gisatcz/ptr-maps";
import ComponentPropsTable, {Prop} from "../../../../ComponentPropsTable/ComponentPropsTable";
import {Link} from "@gisatcz/ptr-state";
import cz_gadm from "../../../../mockData/map/czGadm1WithStyles/geometries.json";

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 1000000
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
	}
};

// WMS layer
const cuzk = {
	key: 'cuzk_ortofoto',
	name: 'CUZK Ortofoto',
	type: 'wms',
	options: {
		url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
		params: {
			layers: 'GR_ORTFOTORGB'
		}
	}
};

// Vector
const polygons = {
	key: "gadm-1-cz",
	type: "vector",
	options: {
		features: cz_gadm.features,
		fidColumnName: "GID_1",
		opacity: 0.5
	}
};

const wmsExampleLayers = [cuzk];
const polygonLayers = [polygons];

class ReactLeafletMapDoc extends React.PureComponent {
	render() {
		return (
			<Page title="ReactLeafletMap">
				<p>This component is based on <a href="https://react-leaflet.js.org/en/" target="_blank">React-Leaflet</a> library, an abstraction of popular <a href="https://leafletjs.com/" target="_blank">Leaflet</a> map library as React components.</p>

				<h2>Props</h2>
				<p>Bellow are listed specific props for ReactLeafletMap. Other props are common to all maps (<Link to="/components/maps/map">see Map documentation</Link>).</p>
				<ComponentPropsTable>
					<Prop name="mapKey" required type="string">Key required by leaflet to setup a map</Prop>
					<Prop name="crs" defaultValue="EPSG:3857" type="string"><Link to="#crs">Coordinates reference system</Link> used for map. Default is <a href="https://epsg.io/3857" target="_blank">EPSG:3857 (Pseudo-Mercator)</a>. <Link to="#crs">See complete list of available crs</Link>.</Prop>
				</ComponentPropsTable>

				<h2>Layers</h2>
				<p>Layer component is always used inside ReactLeafletMap component. The data are passed via layers prop (see <Link to="/components/maps/map">Map</Link> documentation), where each layer is represented by specific layer data type. For general information about layer system data type, see <Link to="/architecture/systemDataTypes/layers">Layers</Link> in System data types section.</p>

				<p>It is possible to use following layer types inside ReactLeafletMap component:</p>
				<ul className="ptr-docs-basic-list">
					<li><Link to="#wmts">WMTS layer</Link></li>
					<li><Link to="#wms">WMS layer</Link></li>
					<li><Link to="./reactLeaflet/vectorLayer">Vector layer</Link></li>
					<li><Link to="./reactLeaflet/diagramLayer">Diagram layer</Link></li>
				</ul>

				<h3 id="wmts">WMTS layer</h3>
				<p>Typical usage of WMTS layer as background.</p>
				<div style={{height: 400, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey='react-leaflet-map'
						view={view}
						backgroundLayer={backgroundLayer}
					/>
				</div>
				<SyntaxHighlighter language="jsx">{`<ReactLeafletMap
	mapKey='react-leaflet-map'
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 2000000
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
/>
`}
				</SyntaxHighlighter>

				<h3 id="wms">WMS layer</h3>
				<div style={{height: 400, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey='react-leaflet-map-2'
						view={view}
						backgroundLayer={backgroundLayer}
						layers={wmsExampleLayers}
					/>
				</div>
				<SyntaxHighlighter language="jsx">{`<ReactLeafletMap
	mapKey='react-leaflet-map-2'
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 2000000
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
	layers={[
		{
			key: 'cuzk_ortofoto',
			name: 'CUZK Ortofoto',
			type: 'wms',
			options: {
				url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
				params: {
					layers: 'GR_ORTFOTORGB'
				}
			}
		}
	]}
/>
`}
				</SyntaxHighlighter>

				<h2 id="crs">Coordinates reference system</h2>
				<p>A coordinate reference system (CRS) defines, with the help of coordinates, how the two-dimensional, projected map is related to real places on the earth. The decision as to which map projection and coordinate reference system to use, depends on the regional extent of the area you want to work in.</p>
				<p>Currently, it is possible to use following CRS in ReactLeafletMap: </p>
				<ul className="ptr-docs-basic-list">
					<li>Geographic coordinate systems (GCS):</li>
					<ul className="ptr-docs-basic-list">
						<li><a href="https://epsg.io/4326" target="_blank">WGS-84</a> (<InlineCodeHighlighter>'EPSG:4326'</InlineCodeHighlighter>)</li>
					</ul>
					<li>Projected coordinate reference systems (PCRS):</li>
					<ul className="ptr-docs-basic-list">
						<li><a href="https://epsg.io/3857" target="_blank">Pseudo-Mercator</a> (<InlineCodeHighlighter>'EPSG:3857'</InlineCodeHighlighter>) - default value</li>
						<li><a href="https://epsg.io/5514" target="_blank">S-JTSK/Krovak East-North</a> (<InlineCodeHighlighter>'EPSG:5514'</InlineCodeHighlighter>)</li>
					</ul>
				</ul>

				<p>GCS defines where the data is located on the earth’s surface. PCRS tells the data how to draw on a flat surface, like on a paper map or a computer screen. The GCS is round, and so records locations in degrees. The PCRS is flat, so it records locations in linear units (usually meters).</p>

				<SyntaxHighlighter language="jsx">{`<PresentationMap
	mapComponent={ReactLeafletMap}
	mapKey='react-leaflet-map-krovak'
	view={{}}
	backgroundLayer={{}}
	layers={[]}
	crs="EPSG:5514"
>
	<MapControls zoomOnly levelsBased/>
</PresentationMap>`}
				</SyntaxHighlighter>
				<div style={{height: 500, marginBottom: 10}}>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						mapKey='react-leaflet-map-krovak'
						view={view}
						backgroundLayer={cuzk}
						layers={polygonLayers}
						crs="EPSG:5514"
					>
						<MapControls zoomOnly levelsBased/>
					</PresentationMap>
				</div>

				<p>Alternatively, you can set crs for WMS layer only (e.g. in cases, where WMS is not provided in Leaflet's default crs - EPSG:3857) from the list above.</p>
				<SyntaxHighlighter language="js">{`//...
	layers={[{
	    key: 'cuzk_ortofoto',
		name: 'CUZK Ortofoto',
		type: 'wms',
		options: {
			url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
			params: {
				layers: 'GR_ORTFOTORGB',
				crs: 'EPSG:4326'
			}
		}
	}]}
//...`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default ReactLeafletMapDoc;