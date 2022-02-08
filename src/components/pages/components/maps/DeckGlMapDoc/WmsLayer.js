import React from 'react';
import Page from '../../../../Page';
import {DeckGlMap} from '@gisatcz/ptr-maps';
import {Link} from 'react-router-dom';

const viewCz = {
	center: {lat: 50, lon: 15},
	boxRange: 400000,
};

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 40000000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

// WMS layer
const cuzk = {
	key: 'cuzk_ortofoto',
	name: 'CUZK Ortofoto',
	type: 'wms',
	options: {
		url: 'https://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx',
		params: {
			layers: 'GR_ORTFOTORGB',
		},
	},
};

const composite = {
	key: 'Testing wms',
	name: 'Testing WMS',
	type: 'wms',
	opacity: 0.5,
	options: {
		url: 'https://ows.terrestris.de/osm/service',
		params: {
			layers: 'OSM-Overlay-WMS',
		},
	},
};

const wmsExampleLayers = [composite];
const wmsExampleLayersCz = [cuzk];

class WmsLayer extends React.PureComponent {
	render() {
		return (
			<Page title="Deck.gl WMS layer">
				<h2>Props</h2>
				See{' '}
				<Link to="/architecture/systemDataTypes/layers#wms">
					WMS layer definition
				</Link>
				.<h2>Examples</h2>
				<div style={{height: 400, marginBottom: 10}}>
					<DeckGlMap
						mapKey="map-1"
						view={view}
						backgroundLayer={backgroundLayer}
						layers={wmsExampleLayers}
					/>
				</div>
				<div style={{height: 400, marginBottom: 10}}>
					<DeckGlMap
						mapKey="map-2"
						view={viewCz}
						backgroundLayer={backgroundLayer}
						layers={wmsExampleLayersCz}
					/>
				</div>
			</Page>
		);
	}
}

export default WmsLayer;
