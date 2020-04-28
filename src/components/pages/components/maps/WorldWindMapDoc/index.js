import React from 'react';
import Page, {SyntaxHighlighter} from "../../../../Page";
import {WorldWindMap} from "@gisatcz/ptr-maps";
import {HoverHandler} from "@gisatcz/ptr-core";

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

const wmsLayers = [cuzk];

class WorldWindMapDoc extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Page title="WorldWindMap">
				<h2>Basic</h2>
				<p>Basic settings with defined view and background layer.</p>
				<div style={{height: 500, marginBottom: 10}}>
					<WorldWindMap
						view={view}
						backgroundLayer={backgroundLayer}
					/>
				</div>
				<SyntaxHighlighter language="jsx">{`<WorldWindMap
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

				<h2>Wms layer</h2>
				<div style={{height: 500, marginBottom: 10}}>
					<HoverHandler>
						<WorldWindMap
							mapKey="wms-layers"
							view={view}
							backgroundLayer={backgroundLayer}
							layers={wmsLayers}
						/>
					</HoverHandler>
				</div>
				<SyntaxHighlighter language="jsx">{`<WorldWindMap
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

export default WorldWindMapDoc;