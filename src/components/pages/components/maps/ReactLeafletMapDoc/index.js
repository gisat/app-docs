import React from 'react';
import Page, {SyntaxHighlighter} from "../../../../Page";
import {ReactLeafletMap} from "@gisatcz/ptr-maps";
import ComponentPropsTable, {Prop} from "../../../../ComponentPropsTable/ComponentPropsTable";
import {Link} from "@gisatcz/ptr-state";

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 2000000
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

const wmsExampleLayers = [cuzk];

class ReactLeafletMapDoc extends React.PureComponent {
	render() {
		return (
			<Page title="ReactLeafletMap">
				<h2>Props</h2>
				<p>Bellow are listed specific props for ReactLeafletMap. Other props are common to all maps (<Link to="/components/maps/map">see Map documentation</Link>).</p>
				<ComponentPropsTable>
					<Prop name="mapKey" required type="string">Key required by leaflet to setup a map</Prop>
				</ComponentPropsTable>

				<h2>Basic - WMTS layer</h2>
				<p>Basic settings with defined view and background layer.</p>
				<div style={{height: 500, marginBottom: 10}}>
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

				<h2>WMS layer</h2>
				<div style={{height: 500, marginBottom: 10}}>
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
			</Page>
		);
	}
}

export default ReactLeafletMapDoc;