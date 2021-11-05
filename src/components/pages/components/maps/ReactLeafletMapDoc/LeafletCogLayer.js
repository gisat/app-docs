import React from 'react';
import Page, {SyntaxHighlighter} from '../../../../Page';
import {ReactLeafletMap} from '@gisatcz/ptr-maps';

const view = {
	center: {lat: -33.9, lon: -59.733},
	boxRange: 80000,
};

const viewWorld = {
	center: {lat: 0, lon: 0},
	boxRange: 8000000,
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

const croplandClassificationLayer2 = {
	...croplandClassificationLayer,
	options: {
		...croplandClassificationLayer.options,
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/22LHQ/2020_22LHQ_annualcropland_classification_WorldCerealPixelLSTM.tif',
	},
	key: 'cog-layer-2',
};

const croplandClassificationLayer3 = {
	...croplandClassificationLayer,
	options: {
		...croplandClassificationLayer.options,
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/30SWJ/2020_30SWJ_annualcropland_classification_WorldCerealPixelLSTM.tif',
	},
	key: 'cog-layer-3',
};

const croplandClassificationLayer4 = {
	...croplandClassificationLayer,
	options: {
		...croplandClassificationLayer.options,
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/31UFS/2020_31UFS_annualcropland_classification_WorldCerealPixelLSTM.tif',
	},
	key: 'cog-layer-4',
};

const croplandClassificationLayer5 = {
	...croplandClassificationLayer,
	options: {
		...croplandClassificationLayer.options,
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/35UQR/2020_35UQR_annualcropland_classification_WorldCerealPixelLSTM.tif',
	},
	key: 'cog-layer-5',
};

const croplandClassificationLayer6 = {
	...croplandClassificationLayer,
	options: {
		...croplandClassificationLayer.options,
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/37MBV/2020_37MBV_annualcropland_classification_WorldCerealPixelLSTM.tif',
	},
	key: 'cog-layer-6',
};

const croplandClassificationLayer7 = {
	...croplandClassificationLayer,
	options: {
		...croplandClassificationLayer.options,
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/50SMF/2020_50SMF_annualcropland_classification_WorldCerealPixelLSTM.tif',
	},
	key: 'cog-layer-7',
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
				<h2>Basic usage</h2>
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

				<h2>Multiple layers</h2>
				<div style={{height: 500, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="react-leaflet-map-cog-4"
						view={viewWorld}
						backgroundLayer={osmLayer}
						layers={[
							croplandClassificationLayer,
							croplandClassificationLayer2,
							croplandClassificationLayer3,
							croplandClassificationLayer4,
							croplandClassificationLayer5,
							croplandClassificationLayer6,
							croplandClassificationLayer7,
						]}
					/>
				</div>
			</Page>
		);
	}
}

export default LeafletCogLayer;
