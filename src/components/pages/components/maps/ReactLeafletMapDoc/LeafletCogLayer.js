import React from 'react';
import Page from '../../../../Page';
import {ReactLeafletMap} from '@gisatcz/ptr-maps';

const view = {
	center: {lat: -33.8, lon: -59.733},
	boxRange: 80000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

const layer = {
	key: 'cog-layer',
	type: 'cog',
	options: {
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/21HTC/2020_21HTC_annualcropland_classification_WorldCerealPixelLSTM.tif',
	},
};

class LeafletCogLayer extends React.PureComponent {
	render() {
		return (
			<Page title="Leaflet COG layer">
				<div style={{height: 600, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="react-leaflet-map-cog"
						view={view}
						backgroundLayer={backgroundLayer}
						layers={[layer]}
					/>
				</div>
			</Page>
		);
	}
}

export default LeafletCogLayer;
