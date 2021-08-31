import React from 'react';
import Page from '../../../../Page';
import {ReactLeafletMap} from '@gisatcz/ptr-maps';

const view = {
	center: {lat: -34.094, lon: -59.733},
	boxRange: 80000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
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
					/>
				</div>
			</Page>
		);
	}
}

export default LeafletCogLayer;
