import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import {utils} from '@gisatcz/ptr-utils';
import {Link} from 'react-router-dom';

import Page, {
	DocsToDo,
	SyntaxHighlighter,
	ImplementationToDo,
} from '../../../../../../Page';

import {
	WorldWindMap,
	ReactLeafletMap,
	DeckGlMap,
	MapControls,
	PresentationMap,
} from '@gisatcz/ptr-maps';
import cz_gadm from '../../../../../../mockData/map/czGadm1WithStyles/geometries.json';
import points_50 from '../../../../../../mockData/map/points_50.json';

import largePointData from '../../../../../../mockData/map/largePointData/geometries.json';
import largeDataStyle from '../../../../../../mockData/map/largePointData/style.json';
import {HoverHandler} from '@gisatcz/ptr-core';

const czView = {
	center: {lat: 49.8, lon: 15},
	boxRange: 500000,
};

const pragueView = {
	center: {lat: 49.8, lon: 14.8},
	boxRange: 100000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

// Polygons - fill
const fillStyle = {
	rules: [
		{
			styles: [
				{
					fill: '#10421c',
					fillOpacity: 0.5,
				},
			],
		},
	],
};

const polygonLayers_fill = [
	{
		key: 'polygons_fill',
		type: 'vector',
		options: {
			features: cz_gadm.features,
			style: fillStyle,
		},
	},
];

// Polygons - outline
const outlineStyle = {
	rules: [
		{
			styles: [
				{
					outlineColor: '#10421c',
					outlineWidth: 5,
					outlineOpacity: 0.5,
				},
			],
		},
	],
};

const polygonLayers_outline = [
	{
		key: 'polygons_outline',
		type: 'vector',
		options: {
			features: cz_gadm.features,
			style: outlineStyle,
		},
	},
];

// Hovered and selected - default
const hoveredSelectedDefault = {
	key: 'polygons_hoveredSelectedDefault',
	type: 'vector',
	options: {
		features: cz_gadm.features,
		fidColumnName: 'GID_1',
		hoverable: true,
		hovered: {
			style: 'default',
		},
		selectable: true,
		selected: {
			testSelection: {
				keys: ['CZE.1_1'],
				style: 'default',
				hoveredStyle: 'default',
			},
		},
	},
};

const polygonLayers_hoveredSelectedDefault = [hoveredSelectedDefault];

// Hovered and selected - default
const hoveredSelectedDefined = {
	key: 'polygons_hoveredSelectedDefined',
	type: 'vector',
	options: {
		features: cz_gadm.features,
		fidColumnName: 'GID_1',
		hoverable: true,
		hovered: {
			style: {
				outlineColor: '#33c21e',
				outlineWidth: 5,
			},
		},
		selectable: true,
		selected: {
			testSelection: {
				keys: ['CZE.1_1'],
				style: {
					fill: '#ff0000',
				},
				hoveredStyle: {
					outlineColor: '#c21ebf',
					outlineWidth: 5,
					fill: '#ff0066',
				},
			},
		},
	},
};

const polygonLayers_hoveredSelectedDefined = [hoveredSelectedDefined];

// Polygons - attribute values
const attributeValuesStyle = {
	rules: [
		{
			styles: [
				{
					fill: '#cccccc',
					outlineColor: '#000000',
					outlineWidth: 2,
				},
				{
					attributeKey: 'attr-2',
					attributeValues: {
						red: {
							fill: '#ff0000',
							outlineColor: '#ffcccc',
						},
						green: {
							fill: '#00ff00',
						},
						blue: {
							fill: '#0000ff',
						},
					},
				},
			],
		},
	],
};

const polygonLayers_attributeValues = [
	{
		key: 'polygons',
		type: 'vector',
		options: {
			features: cz_gadm.features,
			style: attributeValuesStyle,
			fidColumnName: 'GID_1',
		},
	},
];

// Polygons - intervals
const intervalsStyle = {
	rules: [
		{
			styles: [
				{
					fill: '#cccccc',
					outlineColor: '#000000',
					outlineWidth: 2,
				},
				{
					attributeKey: 'e575b4d4-7c7a-4658-bb9a-a9b61fcc2587',
					attributeClasses: [
						{
							interval: [0, 5],
							intervalBounds: [true, false],
							fill: '#edf8fb',
						},
						{
							interval: [5, 10],
							intervalBounds: [true, false],
							fill: '#b3cde3',
						},
						{
							interval: [10, 20],
							intervalBounds: [true, false],
							fill: '#8c96c6',
						},
					],
				},
			],
		},
	],
};

const polygonLayers_intervals = [
	{
		key: 'polygons',
		type: 'vector',
		options: {
			features: cz_gadm.features,
			style: intervalsStyle,
			fidColumnName: 'GID_1',
		},
	},
];

// Polygons - scales
const scalesStyle = {
	rules: [
		{
			styles: [
				{
					fill: '#cccccc',
					outlineColor: '#000000',
					outlineWidth: 2,
				},
				{
					attributeKey: '22a43eb3-6552-476f-97a5-b47490519642',
					attributeScale: {
						fill: {
							inputInterval: [-10, 10],
							outputInterval: ['#ff0909', '#e6e281', '#05cc00'],
						},
					},
				},
				{
					attributeKey: 'e575b4d4-7c7a-4658-bb9a-a9b61fcc2587',
					attributeScale: {
						outlineWidth: {
							inputInterval: [0, 20],
							outputInterval: [0, 10],
						},
					},
				},
			],
		},
	],
};

const polygonLayers_scales = [
	{
		key: 'polygons',
		type: 'vector',
		options: {
			features: cz_gadm.features,
			style: scalesStyle,
		},
	},
];

// Points - scales (size & volume)
const scalesStyleSize = {
	rules: [
		{
			styles: [
				{
					outlineColor: '#000000',
					outlineWidth: 1,
					fill: '#ffffff',
				},
				{
					attributeKey: 'attr1',
					attributeScale: {
						size: {
							inputInterval: [0, 100],
							outputInterval: [5, 20],
						},
					},
				},
			],
		},
	],
};

const pointLayers_scales_size = [
	{
		key: 'points',
		type: 'vector',
		options: {
			features: points_50,
			style: scalesStyleSize,
			pointAsMarker: true,
		},
	},
];

// World wind large data layer
const largeDataLayers = [
	{
		key: 'large-data-layers',
		type: 'vector',
		options: {
			features: largePointData.features,
			style: largeDataStyle.data.definition,
			fidColumnName: 'gid',
		},
	},
];

const levelsRange = [10, 18];

const MapContainer = props => (
	<div className="ptr-docs-styles-maps-container">
		{props.hideWorldWind ? null : (
			<div>
				<PresentationMap
					mapKey="world-wind-map"
					mapComponent={WorldWindMap}
					backgroundLayer={backgroundLayer}
					layers={props.layers}
					view={props.view}
					onLayerClick={props.onSelect}
				>
					<MapControls />
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
					mapKey="leaflet-map"
				>
					<MapControls zoomOnly levelsBased />
				</PresentationMap>
			</div>
		)}
		{props.hideDeck ? null : (
			<div>
				<PresentationMap
					mapComponent={DeckGlMap}
					backgroundLayer={backgroundLayer}
					layers={props.layers}
					view={props.view}
					onLayerClick={props.onSelect}
					mapKey="deck-map"
				>
					<MapControls zoomOnly levelsBased />
				</PresentationMap>
			</div>
		)}
	</div>
);

class VectorStyleDoc extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			hoveredSelectedDefault: polygonLayers_hoveredSelectedDefault,
			hoveredSelectedDefined: polygonLayers_hoveredSelectedDefined,
		};

		this.onLayerClick = this.onLayerClick.bind(this);
	}

	onLayerClick(map, layer, features) {
		if (layer === 'polygons_hoveredSelectedDefault') {
			const updatedLayers = [
				{
					...hoveredSelectedDefault,
					options: {
						...hoveredSelectedDefault.options,
						selected: {
							...hoveredSelectedDefault.options.selected,
							testSelection: {
								...hoveredSelectedDefault.options.selected.testSelection,
								keys: features,
							},
						},
					},
				},
			];

			this.setState({
				hoveredSelectedDefault: updatedLayers,
			});
		} else if (layer === 'polygons_hoveredSelectedDefined') {
			let updatedLayers = [
				{
					...hoveredSelectedDefined,
					options: {
						...hoveredSelectedDefined.options,
						selected: {
							...hoveredSelectedDefined.options.selected,
							testSelection: {
								...hoveredSelectedDefined.options.selected.testSelection,
								keys: features,
							},
						},
					},
				},
			];

			this.setState({
				hoveredSelectedDefined: updatedLayers,
			});
		}
	}

	render() {
		return (
			<Page title="Vectors style">
				<DocsToDo>Add description</DocsToDo>

				<h2>Filter</h2>
				<ImplementationToDo>Not implemented yet</ImplementationToDo>

				<h2>Styles</h2>
				<h3 id="fill">Fill styling</h3>
				<p>
					For interior of shapes, it is possible to set color and opacity. If
					color is not defined, the interior will be fully transparent. If
					opacity is not defined, the interior will be opaque.
				</p>
				<SyntaxHighlighter language="js">
					{`{
\tstyles: [{
\t\tfill: "#10421c",
\t\tfillOpacity: 0.5
\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_fill} view={czView} />

				<h3 id="outline">Outline styling</h3>
				<p>
					Three properties of outline can be defined - color, width and opacity.
					To draw the outline, both color and width must be defined. If opacity
					is not defined, the outline will be opaque.
				</p>
				<SyntaxHighlighter language="js">
					{`{
\tstyles: [{
\t\toutlineColor: "#10421c",
\t\toutlineWidth: 5,
\t\toutlineOpacity: 0.5
\t}]
}`}
				</SyntaxHighlighter>
				<MapContainer layers={polygonLayers_outline} view={czView} />

				<h3 id="hovered-selected">Hovered and selected</h3>
				<p>
					Default styles for hover and selection. Move cursor over area to see
					hovered style. Click on the area to select it.
				</p>
				<SyntaxHighlighter language="js">
					{`{
\tkey: "polygons_hoveredSelectedDefined",
\ttype: "vector",
\toptions: {
\t\tfeatures: cz_gadm.features,
\t\tfidColumnName: "GID_1",
\t\thovered: {
\t\t\tstyle: "default"
\t\t},
\t\tselected: {
\t\t\ttestSelection: {
\t\t\t\tkeys: ["CZE.1_1"],
\t\t\t\tstyle: "default",
\t\t\t\thoveredStyle: "default"
\t\t\t}
\t\t}
\t}
}`}
				</SyntaxHighlighter>
				<HoverHandler
					popupContentComponent={props => <b>{props.data['NAME_1']}</b>}
				>
					<MapContainer
						layers={this.state.hoveredSelectedDefault}
						view={czView}
						onSelect={this.onLayerClick}
					/>
				</HoverHandler>

				<p>
					Hovered, selected or hovered selected styles could be defined in{' '}
					<Link to="/architecture/systemDataTypes/layers#vector">
						layer definition
					</Link>
					.
				</p>
				<SyntaxHighlighter language="js">
					{`{
\tkey: "polygons_hoveredSelectedDefined",
\ttype: "vector",
\toptions: {
\t\tfeatures: cz_gadm.features,
\t\tfidColumnName: "GID_1",
\t\thoverable: true,
\t\thovered: {
\t\t\tstyle: {
\t\t\t\toutlineColor: "#33c21e",
\t\t\t\toutlineWidth: 5
\t\t\t}
\t\t},
\t\tselectable: true,
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
					popupContentComponent={props => <b>{props.data['NAME_1']}</b>}
				>
					<MapContainer
						layers={this.state.hoveredSelectedDefined}
						view={czView}
						onSelect={this.onLayerClick}
					/>
				</HoverHandler>

				<h3 id="values">Attribute values</h3>
				<SyntaxHighlighter language="js">
					{`{
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
				<MapContainer layers={polygonLayers_attributeValues} view={czView} />

				<h3 id="intervals">Intervals</h3>
				<SyntaxHighlighter language="js">
					{`{
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
				<MapContainer layers={polygonLayers_intervals} view={czView} />

				<h3 id="scales">Scales</h3>
				<p>
					It is possible to set fill, outlines or opacity based on the scale.
				</p>
				<ImplementationToDo>
					This functionality is not implemented in DeckGlMap yet.
				</ImplementationToDo>
				<SyntaxHighlighter language="js">
					{`{
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
				<MapContainer layers={polygonLayers_scales} view={czView} hideDeck />

				<p>
					For point layers (only if using ReactLeafletMap), you can specify
					symbol size with scale.
				</p>
				<ImplementationToDo>
					This functionality is not fully implemented in WorldWind (just for
					LargeDataLayers, <Link to="#large-data-layer">see usage</Link>)
				</ImplementationToDo>
				<MapContainer
					layers={pointLayers_scales_size}
					view={pragueView}
					hideWorldWind
					hideDeck
				/>

				<h3 id="transformations">Transformations</h3>
				<ImplementationToDo>
					Currently implemented for arrows in WorldWind LargeDataLayer only.{' '}
					<Link to="#large-data-layer">See usage.</Link>
				</ImplementationToDo>

				<h3 id="symbols">Symbols</h3>
				<ImplementationToDo>
					Currently implemented for Markers only.{' '}
					<Link to="#large-data-layer">See WorldWind LargeDataLayer usage</Link>{' '}
					or{' '}
					<Link to="/components/maps/presentational/reactLeaflet/vectorLayer#points">
						ReactLeaflet Vector layer usage
					</Link>
					.
				</ImplementationToDo>

				<h3 id="large-data-layer">World Wind LargeDataLayer example</h3>

				<SyntaxHighlighter language="javascript">
					{`{
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
}`}
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
								lon: 15.75,
							},
						}}
						pointAsMarker
					>
						<MapControls levelsBased={levelsRange} />
					</PresentationMap>
				</div>
			</Page>
		);
	}
}

export default withNamespaces()(VectorStyleDoc);
