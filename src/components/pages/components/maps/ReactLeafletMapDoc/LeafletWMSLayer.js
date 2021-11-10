import React from 'react';
import Page, {SyntaxHighlighter, InlineCodeHighlighter} from '../../../../Page';
import {ReactLeafletMap} from '@gisatcz/ptr-maps';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';
import {Link} from 'react-router-dom';

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 400000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

// WMS layer
const cuzk = {
	key: 'cuzk_ortofoto',
	name: 'CUZK Ortofoto',
	type: 'wms',
	options: {
		url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
		params: {
			layers: 'GR_ORTFOTORGB',
			// format: 'image/jpeg',
			// crs: 'EPSG:4326',
		},
	},
};

const backgroundLayerZM = {
	key: 'cuzk_zm',
	name: 'CUZK ZM 10',
	type: 'wms',
	options: {
		url: 'https://geoportal.cuzk.cz/WMS_ZM10_PUB/WMService.aspx?',
		params: {
			layers: 'GR_ZM10',
			// format: 'image/jpeg',
			// crs: 'EPSG:4326',
			// crs: 'EPSG:5514',
		},
		singleTile: true,
	},
};

const cuzkSingleTile = {
	key: 'cuzk_ortofoto',
	name: 'CUZK Ortofoto',
	type: 'wms',
	options: {
		url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
		params: {
			layers: 'GR_ORTFOTORGB',
			// format: 'image/jpeg',
			// crs: 'EPSG:4326',
			// crs: 'EPSG:5514',
		},
		singleTile: true,
	},
	opacity: 0.5,
};

const wmsExampleLayers = [cuzk];
const wmsSingleTileExampleLayers = [cuzkSingleTile];

class LeafletWMSLayer extends React.PureComponent {
	render() {
		return (
			<Page title="Leaflet WMS layer">
				<p>Layer component encapsulates WMS layer.</p>

				<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="url" required type="string">
						Url of WMS service
					</Prop>
					<Prop name="crs" defaultValue="EPSG:3857" type="string">
						<Link to="#crs">Coordinates reference system</Link> used for map.
						Default is{' '}
						<a href="https://epsg.io/3857" target="_blank">
							EPSG:3857 (Pseudo-Mercator)
						</a>
						. <Link to="#crs">See complete list of available crs</Link>.
					</Prop>
					<Prop name="singleTile" defaultValue="false" type="bool">
						Request service in single image mode, dont use tile scheme.{' '}
						<Link to="#singleTileWMS">Example</Link>
					</Prop>
					<Prop name="params" defaultValue="undefined" type="Object">
						<Link to="#params">WMS params</Link>
					</Prop>
				</ComponentPropsTable>

				<h3 id="params">Params</h3>
				<p>
					WMS parameters are passed by{' '}
					<InlineCodeHighlighter>params</InlineCodeHighlighter> object. Each of
					key/value property is passed into WMS getMap request.
				</p>
				<p>
					Mandatory params depend on the end map service. Usually,{' '}
					<InlineCodeHighlighter>layers</InlineCodeHighlighter> property is
					mandatory.
				</p>
				<SyntaxHighlighter language="jsx">
					{`
{
	layers: 'GR_ORTFOTORGB',
	time: '2020',
	...
}
`}
				</SyntaxHighlighter>

				<h3>WMS layer</h3>
				<div style={{height: 400, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="react-leaflet-map-2"
						view={view}
						backgroundLayer={backgroundLayer}
						layers={wmsExampleLayers}
					/>
				</div>
				<SyntaxHighlighter language="jsx">
					{`
<WMSLayer 
	url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
	params: {
		layers: 'GR_ORTFOTORGB'
	}
}
/>
`}
				</SyntaxHighlighter>
				<h3 id="singleTileWMS">Single tile layer</h3>
				<p>
					In some cases is required to use single image WMS. It is possible by
					setting optional prop{' '}
					<InlineCodeHighlighter>singleTile</InlineCodeHighlighter> to{' '}
					<InlineCodeHighlighter>true</InlineCodeHighlighter>.
				</p>
				<div style={{height: 400, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="react-leaflet-map-2"
						view={view}
						// crs={"EPSG:5514"}
						backgroundLayer={backgroundLayerZM}
						layers={wmsSingleTileExampleLayers}
					/>
				</div>
				<SyntaxHighlighter language="jsx">
					{`
<WMSLayer 
	url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
	params: {
		layers: 'GR_ORTFOTORGB'
	},
	singleTile: true
}
/>
`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default LeafletWMSLayer;
