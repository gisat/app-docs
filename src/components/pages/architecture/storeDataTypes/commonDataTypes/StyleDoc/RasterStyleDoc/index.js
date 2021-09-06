import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';

import Page, {DocsToDo, SyntaxHighlighter} from '../../../../../../Page';
import {ReactLeafletMap} from '@gisatcz/ptr-maps';

const view = {
	center: {lat: -33.9, lon: -59.733},
	boxRange: 80000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

const oneBandLayer = {
	key: 'one-band-layer',
	type: 'cog',
	options: {
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/21HTC/2020_21HTC_annualcropland_classification_WorldCerealPixelLSTM.tif',
	},
};

const multiBandLayer = {
	key: 'multi-band-layer',
	type: 'cog',
	options: {
		url: 'https://gisat-gis.eu-central-1.linodeobjects.com/worldcereal/example/21HTC/2020_21HTC_annualcropland_metafeatures_WorldCerealPixelLSTM.tif',
	},
};

// Styles
const basicStyle = {
	rules: [
		{
			styles: [
				{
					color: '#2ed558',
				},
			],
		},
	],
};

const nullValuesStyle = {
	rules: [
		{
			styles: [
				{
					color: '#2ed558',
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
};

const valueClassesStyle = {
	rules: [
		{
			styles: [
				{
					color: null,
				},
				{
					bandIndex: 0,
					valueClasses: [
						{
							interval: [1, 60],
							intervalBounds: [true, true],
							color: '#ff0000',
						},
						{
							interval: [61, 90],
							intervalBounds: [true, true],
							color: '#ffcc00',
						},
						{
							interval: [91, 100],
							intervalBounds: [true, true],
							color: '#5acd48',
						},
					],
				},
			],
		},
	],
};

const valueScaleStyle = {
	rules: [
		{
			styles: [
				{
					color: null,
				},
				{
					bandIndex: 0,
					scale: {
						color: {
							inputInterval: [0, 100],
							inputIntervalBounds: [false, true],
							outputInterval: ['#ffffff', '#000000'],
						},
					},
				},
			],
		},
	],
};

// Layers with styles
const basicStyleLayer = {
	...oneBandLayer,
	options: {
		...oneBandLayer.options,
		style: basicStyle,
	},
};

const nullValuesLayer = {
	...oneBandLayer,
	options: {
		...oneBandLayer.options,
		style: nullValuesStyle,
	},
};

const valueClassesLayer = {
	...oneBandLayer,
	options: {
		...oneBandLayer.options,
		style: valueClassesStyle,
	},
};

const valueScaleLayer = {
	...oneBandLayer,
	options: {
		...oneBandLayer.options,
		style: valueScaleStyle,
	},
};

class RasterStyleDoc extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Page title="Rasters style">
				<DocsToDo>Add description</DocsToDo>
				<h3 id="default">Default</h3>
				<div style={{height: 400, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="default"
						view={view}
						backgroundLayer={backgroundLayer}
						layers={[oneBandLayer]}
					/>
				</div>

				<h3 id="basic">Basic</h3>
				<SyntaxHighlighter language="js">
					{`{
\tcolor: "#10421c",
}`}
				</SyntaxHighlighter>
				<div style={{height: 400, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="default"
						view={view}
						backgroundLayer={backgroundLayer}
						layers={[basicStyleLayer]}
					/>
				</div>

				<h3 id="null-values">Null values</h3>
				<SyntaxHighlighter language="js">
					{`{
	styles: [
		{
			color: "#2ed558"
		},
		{
			bandIndex: 0,
			values: {
				0: {
					color: null
				}
			}
		},
	],
},`}
				</SyntaxHighlighter>
				<div style={{height: 400, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="default"
						view={view}
						backgroundLayer={backgroundLayer}
						layers={[nullValuesLayer]}
					/>
				</div>

				<h3 id="value-classes">Value classes</h3>
				<SyntaxHighlighter language="js">
					{`{
	styles: [
		{
			color: null
		},
		{
			bandIndex: 0,
			valueClasses: [{
					interval: [1, 60],
					intervalBounds: [true, true],
					color: "#ff0000"
				},{
					interval: [61, 90],
					intervalBounds: [true, true],
					color: "#ffcc00"
				},{
					interval: [91, 100],
					intervalBounds: [true, true],
					color: "#5acd48"
			}]
		},
	],
},`}
				</SyntaxHighlighter>
				<div style={{height: 400, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="default"
						view={view}
						backgroundLayer={backgroundLayer}
						layers={[valueClassesLayer]}
					/>
				</div>

				<h3 id="value-classes">Value scales</h3>
				<SyntaxHighlighter language="js">
					{`{
	styles: [
		{
			color: null
		},
		{
			scale: {
				color: {
					inputInterval: [0, 100],
					inputIntervalBounds: [false, true],
					outputInterval: ["#ffffff", "#000000"]
				}
			}
		},
	],
},`}
				</SyntaxHighlighter>
				<div style={{height: 400, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="default"
						view={view}
						backgroundLayer={backgroundLayer}
						layers={[valueScaleLayer]}
					/>
				</div>
			</Page>
		);
	}
}

export default withNamespaces()(RasterStyleDoc);
