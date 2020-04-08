import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import {utils} from '@gisatcz/ptr-utils';
import {Link} from '@gisatcz/ptr-state';

import Page, {DocsToDo, SyntaxHighlighter, ImplementationToDo} from '../../../../Page';

import {WorldWindMap, ReactLeafletMap, MapControls, PresentationMap} from "@gisatcz/ptr-maps";
import cz_gadm from "../../../../mockData/map/czGadm1WithStyles/geometries";
import points_50 from "../../../../mockData/map/points_50";

import './style.scss';

import largePointData from "../../../../mockData/map/largePointData/geometries";
import largeDataStyle from "../../../../mockData/map/largePointData/style";

const czView = {
	center: {lat: 49.8, lon: 15},
	boxRange: 2000000
};

const pragueView = {
	center: {lat: 49.8, lon: 14.8},
	boxRange: 300000
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
	}
};

// Polygons - no styles
const polygonLayers_noStyles = [{
	key: "polygons",
	type: "vector",
	options: {
		features: cz_gadm.features
	}
}];


// Polygons - basic styling
const basicStyle = {rules: [{
	styles: [{
		fill: "#ff9248",
		fillOpacity: 0.7,
		outlineColor: "#ff3e0e",
		outlineWidth: 7,
		outlineOpacity: 0.4
	}]
}]};

const polygonLayers_basicStyle = [{
	key: "polygons",
	type: "vector",
	options: {
		features: cz_gadm.features,
		style: basicStyle
	}
}];


// Polygons - attribute values
const attributeValuesStyle = {rules: [{
	styles: [{
		fill: "#cccccc"
	}, {
		attributeKey: 'attr-2',
		attributeValues: {
			'red': {
				fill: "#ff0000",
				outlineColor: "#ffcccc"
			},
			'green': {
				fill: "#00ff00"
			},
			'blue': {
				fill: "#0000ff"
			}
		}
	}]
}]};

const polygonLayers_attributeValues = [{
	key: "polygons",
	type: "vector",
	options: {
		features: cz_gadm.features,
		style: attributeValuesStyle
	}
}];

// Polygons - intervals
const intervalsStyle = {rules: [{
	styles: [{
		fill: "#cccccc"
	}, {
		attributeKey: "e575b4d4-7c7a-4658-bb9a-a9b61fcc2587",
		attributeClasses: [
			{
				interval: [0,5],
				intervalBounds: [true, false],
				fill: "#edf8fb"
			},
			{
				interval: [5,10],
				intervalBounds: [true, false],
				fill: "#b3cde3"
			},{
				interval: [10,20],
				intervalBounds: [true, false],
				fill: "#8c96c6"
			}
		]
	}]
}]};

const polygonLayers_intervals = [{
	key: "polygons",
	type: "vector",
	options: {
		features: cz_gadm.features,
		style: intervalsStyle
	}
}];

// Polygons - scales
const scalesStyle = {rules: [{
	styles: [{
		fill: "#cccccc"
	}, {
		attributeKey: "22a43eb3-6552-476f-97a5-b47490519642",
		attributeScale: {
			fill: {
				"inputInterval": [-10,10],
				"outputInterval": ["#ff0909", "#e6e281", "#05cc00"]
			}
		}
	}, {
		attributeKey: "e575b4d4-7c7a-4658-bb9a-a9b61fcc2587",
		attributeScale: {
			outlineWidth: {
				"inputInterval": [0,20],
				"outputInterval": [0,10]
			}
		}
	}]
}]};

const polygonLayers_scales = [{
	key: "polygons",
	type: "vector",
	options: {
		features: cz_gadm.features,
		style: scalesStyle
	}
}];

// Points - scales (size & volume)
const scalesStyleSize = {rules: [{
	styles: [{
		attributeKey: "attr1",
		attributeScale: {
			size: {
				"inputInterval": [0,100],
				"outputInterval": [1, 20]
			}
		}
	}]
}]};

const scalesStyleVolume = {rules: [{
	styles: [{
		attributeKey: "attr1",
		attributeScale: {
			volume: {
				"inputInterval": [0,100],
				"outputInterval": [Math.PI, Math.PI * 400]
			}
		}
	}]
}]};

const pointLayers_scales_size = [{
	key: "points",
	type: "vector",
	options: {
		features: points_50,
		style: scalesStyleSize
	}
}];

const pointLayers_scales_volume = [{
	key: "points",
	type: "vector",
	options: {
		features: points_50,
		style: scalesStyleVolume
	}
}];


// Polygons & diagrams
const diagramStyle = {rules: [{
	styles: [{
		fill: "#cccccc",
		diagramShape: "circle",
		diagramFillOpacity: 0.85
	}, {
		attributeKey: "22a43eb3-6552-476f-97a5-b47490519642",
		attributeScale: {
			diagramSize: {
				"inputInterval": [-10,10],
				"outputInterval": [2000, 30000]
			}
		}
	}]
}]};

const polygonLayers_diagrams = [{
	key: "polygons",
	type: "diagram",
	options: {
		features: cz_gadm.features,
		style: diagramStyle,
		fidColumnName: "GID_1"
	}
}];

// World wind large data layer
const largeDataLayers = [{
	key: "large-data-layers",
	type: "vector",
	options: {
		features: largePointData.features,
		style: largeDataStyle.data.definition
	}
}];

const levelsRange = [10, 18];

const MapContainer = (props) => (
	<div className="ptr-docs-styles-maps-container">
		{props.hideWorldWind ? null : (
			<div>
				<PresentationMap
					mapComponent={WorldWindMap}
					backgroundLayer={backgroundLayer}
					layers={props.layers}
					view={props.view}
				>
					<MapControls/>
				</PresentationMap>
			</div>
		)}
		{props.hideLeaflet ? null : (
			<div>
				<PresentationMap
					mapComponent={ReactLeafletMap}
					backgroundLayer={backgroundLayer}
					layers={props.layers}
					view={props.view}
					mapKey={utils.uuid()}
				>
					<MapControls zoomOnly levelsBased/>
				</PresentationMap>
			</div>
		)}
	</div>
);

class Index extends React.PureComponent {

	render() {
		return (
			<Page title="Styles">
				<DocsToDo>Add description</DocsToDo>

				<SyntaxHighlighter language="javascript">
					{
`{
	key: '3a188ace-94d2-46e5-86c8-684172bd2af4',
	data: {
		nameInternal: '',
		nameDisplay: '',
		description: '',
		source: 'geoserver|definition',
		nameGeoserver: '',
		definition: {
			rules: [
				{
					filter: {
						['and'|'or']: [
							{
								featureType: 'Point|MultiPolygon|pixel|...',
								attributeKey: '4a188ace-94d2-46e5-86c8-684172bd2af5',
								attributeInterval: [-10.12,11.45] | [null, 11.45],
								attributeValue: 'Prague' | 7 | ...
								...
							}
						], 
						featureType: 'Point|MultiPolygon|pixel|...',
						attributeKey: '4a188ace-94d2-46e5-86c8-684172bd2af5',
						attributeInterval: [-10.12,11.45] | [null, 11.45],
						attributeValue: 'Prague' | 7 | ...
						...
					},
					styles: [
						{
							attributeKey: '54fba0c3-889b-4a26-bda9-5cf9235517d0',
							attributeClasses: [
								{
									interval: [7, 8]
									intervalBounds: [true, false] // 7 is included, 8 not
									fill: '#ff00ee'
								}, {
									
								}
							]
						}
					]
				}
			]
		}
	}
}`
					}
				</SyntaxHighlighter>

				<h2>Filter</h2>
				<ImplementationToDo>Not implemented yet</ImplementationToDo>

				<h2>Styles</h2>
				<h3 id="without-style">Without styles</h3>
				<p>If styles are not defined default styles will be used.</p>
				<MapContainer layers={polygonLayers_noStyles} view={czView}/>




				<h3 id="basic">Basic styling</h3>
				<p>Add custom fill, outline and opacity.</p>

				<SyntaxHighlighter language="js">{`{
\tstyles: [{
\t\tfill: "#ff9248",
\t\tfillOpacity: 0.7,
\t\toutlineColor: "#ff3e0e",
\t\toutlineWidth: 7,
\t\toutlineOpacity: 0.4
\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_basicStyle} view={czView}/>



				<h3 id="values">Values</h3>
				<SyntaxHighlighter language="js">{`{
\tstyles: [{
\t\tfill: "#cccccc"
\t}, {
\t\tattributeKey: 'attr-2',
\t\tattributeValues: {
\t\t\t'red': {
\t\t\t\tfill: "#ff0000",
\t\t\t\toutlineColor: "#ffcccc"
\t\t\t},
\t\t\t'green': {
\t\t\t\tfill: "#00ff00"
\t\t\t},
\t\t\t'blue': {
\t\t\t\tfill: "#0000ff"
\t\t\t}
\t\t}
\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_attributeValues} view={czView}/>



				<h3 id="intervals">Intervals</h3>
				<SyntaxHighlighter language="js">{`{
\tstyles: [{
\t\tfill: "#cccccc"
\t}, {
\t\tattributeKey: "e575b4d4-7c7a-4658-bb9a-a9b61fcc2587",
\t\tattributeClasses: [
\t\t\t{
\t\t\t\tinterval: [0,5],
\t\t\t\tintervalBounds: [true, false],
\t\t\t\tfill: "#edf8fb"
\t\t\t},
\t\t\t{
\t\t\t\tinterval: [5,10],
\t\t\t\tintervalBounds: [true, false],
\t\t\t\tfill: "#b3cde3"
\t\t\t},{
\t\t\t\tinterval: [10,20],
\t\t\t\tintervalBounds: [true, false],
\t\t\t\tfill: "#8c96c6"
\t\t\t}
\t\t]
\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_intervals} view={czView}/>




				<h3 id="scales">Scales</h3>
				<p>It is possible to set fill, outlines or opacity based on the scale.</p>
				<SyntaxHighlighter language="js">{`{
\tstyles: [{
\t\tfill: "#cccccc"
\t}, {
\t\tattributeKey: "22a43eb3-6552-476f-97a5-b47490519642",
\t\tattributeScale: {
\t\t\tfill: {
\t\t\t\t"inputInterval": [-10,10],
\t\t\t\t"outputInterval": ["#ff0909", "#e6e281", "#05cc00"]
\t\t\t}
\t\t}
\t}, {
\t\tattributeKey: "e575b4d4-7c7a-4658-bb9a-a9b61fcc2587",
\t\tattributeScale: {
\t\t\toutlineWidth: {
\t\t\t\t"inputInterval": [0,20],
\t\t\t\t"outputInterval": [0,10]
\t\t\t}
\t\t}
\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_scales} view={czView}/>

				<p>For point layers (only if using ReactLeafletMap), you can specify symbol size with scale.</p>
				<ImplementationToDo>This functionality is not fully implemented in WorldWind (just for LargeDataLayers, <Link to="#large-data-layer">see usage</Link>)</ImplementationToDo>
				<MapContainer layers={pointLayers_scales_size} view={pragueView} hideWorldWind/>

				<p>This time symbol volume is specified with scale.</p>
				<MapContainer layers={pointLayers_scales_volume} view={pragueView} hideWorldWind/>



				<h3 id="transformations">Transformations</h3>
				<ImplementationToDo>Currently implemented for arrows in WorldWind LargeDataLayer only. <Link to="#large-data-layer">See usage.</Link></ImplementationToDo>



				<h3 id="symbols">Symbols</h3>
				<ImplementationToDo>Currently implemented for arrows in WorldWind LargeDataLayer only. <Link to="#large-data-layer">See usage.</Link></ImplementationToDo>


				<h3 id="diagrams">Diagrams</h3>
				<ImplementationToDo>This functionality is not implemented in WorldWind</ImplementationToDo>
				<SyntaxHighlighter language="js">{`{
\tstyles: [{
\t\tfill: "#cccccc",
\t\tdiagramShape: "circle",
\t\tdiagramFillOpacity: 0.85
\t}, {
\t\tattributeKey: "22a43eb3-6552-476f-97a5-b47490519642",
\t\tattributeScale: {
\t\t\tdiagramSize: {
\t\t\t\t"inputInterval": [-10,10],
\t\t\t\t"outputInterval": [2000, 30000]
\t\t\t}
\t\t}
\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_diagrams} view={czView} hideWorldWind/>



				<h3 id="large-data-layer">World Wind LargeDataLayer example</h3>

				<SyntaxHighlighter language="javascript">
					{
`{
	"styles": [
		{
			"shape": "circle-with-arrow",
			"outlineWidth": 1,
			"arrowColor": "#39ff14",
			"arrowWidth": 3
		},
		{
			"attributeKey": "attr1",
			"attributeClasses": [
				{
					"interval": [0,25],
					"fill": "#edf8fb"
				},
				{
					"interval": [25,50],
					"fill": "#b3cde3"
				},{
					"interval": [50,75],
					"fill": "#8c96c6"
				},{
					"interval": [75,101],
					"fill": "#88419d"
				}
			]
		},{
			"attributeKey": "attr3",
			"attributeScale": {
				"size": {
					"inputInterval": [0,1],
					"outputInterval": [5,20]
				}
			}
		},{
			"attributeKey": "attr2",
			"attributeScale": {
				"arrowLength": {
					"inputTransformation": ["abs"],
					"inputInterval": [0,10],
					"outputInterval": [0,30]
				}
			}
		},{
			"attributeKey": "attr2",
			"attributeTransformation": {
				"arrowDirection": {
					"inputTransformation": ["sign"]
				}
			}
		}
	]
}`
					}
				</SyntaxHighlighter>

				<div style={{marginTop: 10, height: 400}}>
					<PresentationMap
						levelsBased={levelsRange}
						mapComponent={WorldWindMap}
						backgroundLayer={backgroundLayer}
						layers={largeDataLayers}
						view={{
							boxRange: 20000,
							center: {
								lat: 50.25,
								lon: 15.75
							}
						}}
					>
						<MapControls levelsBased={levelsRange}/>
					</PresentationMap>
				</div>
			</Page>
		);
	}
}

export default withNamespaces()(Index);