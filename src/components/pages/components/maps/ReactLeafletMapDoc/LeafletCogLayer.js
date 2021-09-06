import React from 'react';
import Page, {SyntaxHighlighter} from '../../../../Page';
import {ReactLeafletMap} from '@gisatcz/ptr-maps';

const view = {
	center: {lat: -33.9, lon: -59.733},
	boxRange: 80000,
};

const osmLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

const croplandClassificationLayer = {
	key: 'cog-layer',
	type: 'cog',
	opacity: 0.7,
	options: {
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/21HTC/2020_21HTC_annualcropland_classification_WorldCerealPixelLSTM.tif',
		style: {
			rules: [
				{
					styles: [
						{
							color: '#000000',
						},
						{
							bandIndex: 0,
							values: {
								0: {
									color: null,
								},
							},
						},
					],
				},
			],
		},
	},
};

const croplandConfidenceLayer = {
	key: 'cog-layer-confidence',
	type: 'cog',
	options: {
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/21HTC/2020_21HTC_annualcropland_confidence_WorldCerealPixelLSTM.tif',
		style: {
			rules: [
				{
					styles: [
						{
							color: '#000000',
						},
						{
							bandIndex: 0,
							values: {
								0: {
									color: null,
								},
							},
						},
					],
				},
			],
		},
	},
};

const croplandMetaLayer = {
	key: 'cog-layer-meta',
	type: 'cog',
	options: {
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/21HTC/2020_21HTC_annualcropland_metafeatures_WorldCerealPixelLSTM.tif',
	},
};

class LeafletCogLayer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			basicExampleLayers: [croplandClassificationLayer],
		};
	}

	render() {
		return (
			<Page title="Leaflet COG layer">
				<SyntaxHighlighter language="jsx">
					{`<ReactLeafletMap
	mapKey="react-leaflet-map-cog-3"
	view={view}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
	layers={[{
		key: 'cog-layer',
		type: 'cog',
		opacity: 0.7,
		options: {
			url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/21HTC/2020_21HTC_annualcropland_classification_WorldCerealPixelLSTM.tif',
			style: {
				rules: [{
					styles: [{
						color: "#000000"
					},{
						bandIndex: 0,
						values: {
							0: {color: null}
						}
					}]
				}]
			}
		}
	}]}
/>`}
				</SyntaxHighlighter>
				<div style={{height: 500, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="react-leaflet-map-cog-3"
						view={view}
						backgroundLayer={osmLayer}
						layers={this.state.basicExampleLayers}
					/>
				</div>
			</Page>
		);
	}
}

export default LeafletCogLayer;
