import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import {utils} from '@gisatcz/ptr-utils';
import {Link} from '@gisatcz/ptr-state';

import Page, {DocsToDo, SyntaxHighlighter, ImplementationToDo} from '../../../../Page';

import {WorldWindMap, ReactLeafletMap, MapControls, PresentationMap} from "@gisatcz/ptr-maps";
import cz_gadm from "../../../../mockData/map/czGadm1WithStyles/geometries";
import points_50 from "../../../../mockData/map/points_50";
import nuts_2 from "../../../../mockData/map/nuts_2";

import './style.scss';

import largePointData from "../../../../mockData/map/largePointData/geometries";
import largeDataStyle from "../../../../mockData/map/largePointData/style";
import {HoverHandler} from "@gisatcz/ptr-core";

const europeView = {
	center: {lat: 49.8, lon: 12},
	boxRange: 5000000
};

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

// Polygons - fill
const fillStyle = {rules: [{
		styles: [{
			fill: "#10421c",
			fillOpacity: 0.5
		}]
	}]};

const polygonLayers_fill = [{
	key: "polygons_fill",
	type: "vector",
	options: {
		features: cz_gadm.features,
		style: fillStyle
	}
}];

// Polygons - outline
const outlineStyle = {rules: [{
		styles: [{
			outlineColor: "#10421c",
			outlineWidth: 5,
			outlineOpacity: 0.5
		}]
	}]};

const polygonLayers_outline = [{
	key: "polygons_outline",
	type: "vector",
	options: {
		features: cz_gadm.features,
		style: outlineStyle
	}
}];

// Hovered and selected - default
const hoveredSelectedDefault = {
	key: "polygons_hoveredSelectedDefault",
	type: "vector",
	options: {
		features: cz_gadm.features,
		fidColumnName: "GID_1",
		selected: {
			testSelection: {
				keys: ["CZE.1_1"]
			}
		}
	}
}

const polygonLayers_hoveredSelectedDefault = [hoveredSelectedDefault];

// Hovered and selected - default
const hoveredSelectedDefined = {
	key: "polygons_hoveredSelectedDefined",
	type: "vector",
	options: {
		features: cz_gadm.features,
		fidColumnName: "GID_1",
		hovered: {
			style: {
				outlineColor: "#33c21e",
				outlineWidth: 5
			}
		},
		selected: {
			testSelection: {
				keys: ["CZE.1_1"],
				style: {
					fill: "#ff0000"
				},
				hoveredStyle: {
					outlineColor: "#c21ebf",
					outlineWidth: 5,
					fill: "#ff0066"
				}
			}
		}
	}
}

const polygonLayers_hoveredSelectedDefined = [hoveredSelectedDefined];


// Polygons - attribute values
const attributeValuesStyle = {rules: [{
	styles: [{
		fill: "#cccccc",
		outlineColor: "#000000",
		outlineWidth: 2
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
		fill: "#cccccc",
		outlineColor: "#000000",
		outlineWidth: 2
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
		fill: "#cccccc",
		outlineColor: "#000000",
		outlineWidth: 2
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
		outlineColor: "#000000",
		outlineWidth: 1,
		fill: "#ffffff"
	}, {
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
		outlineColor: "#000000",
		outlineWidth: 1,
		fill: "#ffffff"
	},{
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
		style: scalesStyleSize,
		pointAsMarker: true
	}
}];

const pointLayers_scales_volume = [{
	key: "points",
	type: "vector",
	options: {
		features: points_50,
		style: scalesStyleVolume,
		pointAsMarker: true
	}
}];


// Polygons & diagrams
const diagramStyle = {rules: [{
	styles: [{
		fill: "#cccccc",
		outlineColor: "#000000",
		outlineWidth: 1,
		diagramShape: "circle",
		diagramFillOpacity: 1,
		diagramFill: "#ff88ff",
		diagramOutlineWidth: 1,
		diagramOutlineColor: "#b61db6"
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

// Choropleth and diagrams
const diagramChoroplethStyle = {rules: [{
		styles: [{
			outlineWidth: 1,
			outlineColor: "#666",
			diagramShape: "circle",
			diagramFillOpacity: 1,
			diagramFill: "#ff88ff",
			diagramOutlineWidth: 1,
			diagramOutlineColor: "#681968",
		}, {
			attributeKey: "positive_attr",
			attributeScale: {
				diagramSize: {
					"inputInterval": [0,10],
					"outputInterval": [2000, 20000]
				}
			}
		}, {
			attributeKey: "diverging_attr",
			attributeClasses: [
				{
					interval: [-5,-3],
					intervalBounds: [true, false],
					fill: "#d7191c"
				},
				{
					interval: [-3,-1],
					intervalBounds: [true, false],
					fill: "#fdae61"
				},{
					interval: [-1,1],
					intervalBounds: [true, false],
					fill: "#ffffbf"
				},{
					interval: [1,3],
					intervalBounds: [true, false],
					fill: "#a6d96a"
				},{
					interval: [3,5],
					intervalBounds: [true, false],
					fill: "#1a9641"
				}
			]
		}]
	}]};

const polygonLayers_countries = [{
	key: "countries",
	type: "diagram",
	options: {
		features: nuts_2.features,
		style: diagramChoroplethStyle,
		fidColumnName: "id"
	}
}];


// World wind large data layer
const largeDataLayers = [{
	key: "large-data-layers",
	type: "vector",
	options: {
		features: largePointData.features,
		style: largeDataStyle.data.definition,
		fidColumnName: "gid"
	}
}];

const levelsRange = [10, 18];

const MapContainer = (props) => (
	<div className="ptr-docs-styles-maps-container">
		{props.hideWorldWind ? null : (
			<div>
				<PresentationMap
					mapKey={utils.uuid()}
					mapComponent={WorldWindMap}
					backgroundLayer={backgroundLayer}
					layers={props.layers}
					view={props.view}
					onLayerClick={props.onSelect}
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
					onLayerClick={props.onSelect}
					mapKey={utils.uuid()}
				>
					<MapControls zoomOnly levelsBased/>
				</PresentationMap>
			</div>
		)}
	</div>
);

class Index extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			hoveredSelectedDefault: polygonLayers_hoveredSelectedDefault,
			hoveredSelectedDefined: polygonLayers_hoveredSelectedDefined
		}

		this.onLayerClick = this.onLayerClick.bind(this);
	}

	onLayerClick(map, layer, features) {
		if (layer === 'polygons_hoveredSelectedDefault') {
			let updatedLayers = [{
				...hoveredSelectedDefault,
				options: {
					...hoveredSelectedDefault.options,
					selected: {
						...hoveredSelectedDefault.options.selected,
						testSelection: {
							...hoveredSelectedDefault.options.selected.testSelection,
							keys: features
						}
					}
				}
			}];

			this.setState({
				hoveredSelectedDefault: updatedLayers
			})
		} else if (layer === 'polygons_hoveredSelectedDefined') {
			let updatedLayers = [{
				...hoveredSelectedDefined,
				options: {
					...hoveredSelectedDefined.options,
					selected: {
						...hoveredSelectedDefined.options.selected,
						testSelection: {
							...hoveredSelectedDefined.options.selected.testSelection,
							keys: features
						}
					}
				}
			}];

			this.setState({
				hoveredSelectedDefined: updatedLayers
			})
		}
	}

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


				<h3 id="fill">Fill styling</h3>
				<p>For interior of shapes, it is possible to set color and opacity. If color is not defined, the interior will be fully transparent. If opacity is not defined, the interior will be opaque.</p>
				<SyntaxHighlighter language="js">{`{
\tstyles: [{
\t\tfill: "#10421c",
\t\tfillOpacity: 0.5
\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_fill} view={czView}/>


				<h3 id="outline">Outline styling</h3>
				<p>Three properties of outline can be defined - color, width and opacity. To draw the outline, both color and width must be defined. If opacity is not defined, the outline will be opaque.</p>
				<SyntaxHighlighter language="js">{`{
\tstyles: [{
\t\toutlineColor: "#10421c",
\t\toutlineWidth: 5,
\t\toutlineOpacity: 0.5
\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_outline} view={czView}/>


				<h3 id="hovered-selected">Hovered and selected</h3>
				<p>If styles for hovered, selected or hovered selected are not defined, default styles will be used. Move cursor over area to see the popup and hovered style. Click on the area to select it.</p>
				<HoverHandler
					popupContentComponent={
						(props) => <b>{props.data["NAME_1"]}</b>
					}
				>
					<MapContainer layers={this.state.hoveredSelectedDefault} view={czView} onSelect={this.onLayerClick}/>
				</HoverHandler>


				<p>Hovered, selected or hovered selected styles could be defined in <Link to="/architecture/systemDataTypes/layers#vector">layer definition</Link>.</p>
				<SyntaxHighlighter language="js">{`{
\tkey: "polygons_hoveredSelectedDefined",
\ttype: "vector",
\toptions: {
\t\tfeatures: cz_gadm.features,
\t\tfidColumnName: "GID_1",
\t\thovered: {
\t\t\tstyle: {
\t\t\t\toutlineColor: "#33c21e",
\t\t\t\toutlineWidth: 5
\t\t\t}
\t\t},
\t\tselected: {
\t\t\ttestSelection: {
\t\t\t\tkeys: ["CZE.1_1"],
\t\t\t\tstyle: {
\t\t\t\t\tfill: "#ff0000"
\t\t\t\t},
\t\t\t\thoveredStyle: {
\t\t\t\t\toutlineColor: "#c21ebf",
\t\t\t\t\toutlineWidth: 5,
\t\t\t\t\tfill: "#ff0066"
\t\t\t\t}
\t\t\t}
\t\t}
\t}
}`}
				</SyntaxHighlighter>
				<HoverHandler
					popupContentComponent={
						(props) => <b>{props.data["NAME_1"]}</b>
					}
				>
					<MapContainer layers={this.state.hoveredSelectedDefined} view={czView} onSelect={this.onLayerClick}/>
				</HoverHandler>



				<h3 id="values">Attribute values</h3>
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
				<ImplementationToDo>Currently implemented for Markers only. <Link to="#large-data-layer">See WorldWind LargeDataLayer usage</Link> or <Link to="/components/maps/presentational/reactLeaflet/vectorLayer#points">ReactLeaflet Vector layer usage</Link>.</ImplementationToDo>


				<h3 id="diagrams">Diagrams</h3>
				<ImplementationToDo>This functionality is not implemented in WorldWind</ImplementationToDo>

				<h4>Basic diagrams</h4>
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


				<h4>Basic diagrams with choropleth</h4>
				<SyntaxHighlighter language="js">{`{
\t\tstyles: [{
\t\t\toutlineWidth: 1,
\t\t\toutlineColor: "#666",
\t\t\tdiagramShape: "circle",
\t\t\tdiagramFillOpacity: 1
\t\t}, {
\t\t\tattributeKey: "positive_attr",
\t\t\tattributeScale: {
\t\t\t\tdiagramSize: {
\t\t\t\t\t"inputInterval": [0,10],
\t\t\t\t\t"outputInterval": [2000, 20000]
\t\t\t\t}
\t\t\t}
\t\t}, {
\t\t\tattributeKey: "diverging_attr",
\t\t\tattributeClasses: [
\t\t\t\t{
\t\t\t\t\tinterval: [-5,-3],
\t\t\t\t\tintervalBounds: [true, false],
\t\t\t\t\tfill: "#d7191c"
\t\t\t\t},
\t\t\t\t{
\t\t\t\t\tinterval: [-3,-1],
\t\t\t\t\tintervalBounds: [true, false],
\t\t\t\t\tfill: "#fdae61"
\t\t\t\t},{
\t\t\t\t\tinterval: [-1,1],
\t\t\t\t\tintervalBounds: [true, false],
\t\t\t\t\tfill: "#ffffbf"
\t\t\t\t},{
\t\t\t\t\tinterval: [1,3],
\t\t\t\t\tintervalBounds: [true, false],
\t\t\t\t\tfill: "#a6d96a"
\t\t\t\t},{
\t\t\t\t\tinterval: [3,5],
\t\t\t\t\tintervalBounds: [true, false],
\t\t\t\t\tfill: "#1a9641"
\t\t\t\t}
\t\t\t]
\t\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_countries} view={europeView} hideWorldWind/>



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
						pointAsMarker
					>
						<MapControls levelsBased={levelsRange}/>
					</PresentationMap>
				</div>
			</Page>
		);
	}
}

export default withNamespaces()(Index);