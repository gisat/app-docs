import React from 'react';
import _ from 'lodash';
import Page, {
	DocsToDo,
	DocsToDoInline,
	ImplementationToDo,
	InlineCodeHighlighter,
	LightDarkBlock,
	SyntaxHighlighter,
} from '../../../../Page';
import {ReactLeafletMap} from '@gisatcz/ptr-maps';
import {Icon} from '@gisatcz/ptr-atoms';
import {HoverHandler} from '@gisatcz/ptr-core';
import {Link} from 'react-router-dom';
import cz_gadm from '../../../../mockData/map/czGadm1WithStyles/geometries.json';
import mixed_features from '../../../../mockData/map/mixedVectorFeaturesLayer/geometries.json';
import pointData from '../../../../mockData/map/largePointData/geometries.json';
import pointStyle from '../../../../mockData/map/largePointData/style-simple-point.json';
import nuts_2 from '../../../../mockData/map/nuts_2.json';
import cz_lines from '../../../../mockData/map/lines/cz.json';

// *** DATA ***
const letnaPoints = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [14.4042, 50.09722],
			},
			properties: {
				id: 'point-1',
				type: 'metro',
				line: 'A',
				name: 'Hradčanská',
				description: '',
			},
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [14.438525, 50.09965],
			},
			properties: {
				id: 'point-2',
				type: 'metro',
				line: 'C',
				name: 'Vltavská',
				description: '',
			},
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [14.42328, 50.1],
			},
			properties: {
				id: 'point-3',
				type: 'tram',
				name: 'Letenské náměstí',
				description: '',
			},
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [14.4174, 50.09904],
			},
			properties: {
				id: 'point-parking-letna',
				type: 'parking',
				name: 'Parking Letná',
				description: '',
			},
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [14.4259981, 50.0995436],
			},
			properties: {
				id: 'point-gisat',
				type: 'gisat',
				name: 'Gisat',
				description: 'Budova ve dvoře :)',
			},
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [14.42145, 50.10087],
			},
			properties: {
				id: 'point-vegtral',
				type: 'vegtral',
				name: 'Vegtral',
			},
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [14.426811, 50.09774],
			},
			properties: {
				id: 'point-ntm',
				type: 'ntm',
				name: 'NTM',
			},
		},
	],
};

// *** VIEWS ***
const view = {
	center: {lat: 50, lon: 15},
	boxRange: 300000,
};

const viewEurope = {
	center: {lat: 50, lon: 15},
	boxRange: 1000000,
};

const viewHradec = {
	center: {lat: 50.2, lon: 15.8},
	boxRange: 20000,
};

const viewLetna = {
	center: {lat: 50.0995436, lon: 14.4225},
	boxRange: 500,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

const backgroundCartoLayer = {
	key: 'background-cdb',
	type: 'wmts',
	options: {
		url:
			'https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}@2x.png',
	},
};

// *** POLYGONS ***
// Basic polygon layer
const polygons = {
	key: 'gadm-1-cz',
	type: 'vector',
	options: {
		features: cz_gadm.features,
		fidColumnName: 'GID_1',
	},
};

// Basic polygon layer with selected features
const polygonsWithSelection = {
	key: 'polygons-with-selection',
	type: 'vector',
	options: {
		features: cz_gadm.features,
		hoverable: true,
		hovered: {
			style: 'default',
		},
		selectable: true,
		selected: {
			testSelection: {
				keys: ['CZE.12_1'],
				style: 'default',
				hoveredStyle: 'default',
			},
		},
		fidColumnName: 'GID_1',
	},
};

// Choropleth
const choroplethStyle = {
	rules: [
		{
			styles: [
				{
					outlineWidth: 1,
					outlineColor: '#666666',
				},
				{
					attributeKey: 'diverging_attr',
					attributeClasses: [
						{
							interval: [-5, -3],
							intervalBounds: [true, false],
							fill: '#d7191c',
						},
						{
							interval: [-3, -1],
							intervalBounds: [true, false],
							fill: '#fdae61',
						},
						{
							interval: [-1, 1],
							intervalBounds: [true, false],
							fill: '#ffffbf',
						},
						{
							interval: [1, 3],
							intervalBounds: [true, false],
							fill: '#a6d96a',
						},
						{
							interval: [3, 5],
							intervalBounds: [true, false],
							fill: '#1a9641',
						},
					],
				},
			],
		},
	],
};

const choropleth = {
	key: 'choropleth',
	type: 'vector',
	options: {
		features: nuts_2.features,
		hoverable: true,
		hovered: {
			style: 'default',
		},
		style: choroplethStyle,
		selectable: true,
		selected: {
			testSelection: {
				keys: [],
				style: 'default',
			},
		},
		fidColumnName: 'id',
	},
};

const choroplethCanvas = {
	...choropleth,
	key: 'choropleth-canvas',
	options: {
		...choropleth.options,
		renderingTechnique: 'canvas',
	},
};

const basicPolygonLayers = [polygons];
const basicPolygonLayersWithSelection = [polygonsWithSelection];
const choroplethLayers = [choropleth];
const choroplethLayersCanvas = [choroplethCanvas];

// *** POINTS ***
// Vector layer - hundreds of points - size independent of zoom
const pointsStyle = pointStyle.data.definition;
const pointsInPx = {
	key: 'point-data-layer',
	type: 'vector',
	options: {
		features: pointData.features,
		hoverable: true,
		hovered: {
			style: 'default',
		},
		style: pointsStyle,
		pointAsMarker: true,
		fidColumnName: 'gid',
	},
};

// Vector layer - hundreds of points - size in meters
let pointsInMetersStyle = _.cloneDeep(pointsStyle);
pointsInMetersStyle.rules[0].styles[2].attributeScale.size.outputInterval = [
	500,
	2000,
];
const pointsInMeters = {
	key: 'point-data-layer-2',
	type: 'vector',
	options: {
		features: pointData.features,
		hovered: {
			style: 'default',
		},
		hoverable: true,
		style: pointsInMetersStyle,
		fidColumnName: 'gid',
	},
};

const pointsInPxLayers = [pointsInPx];
const pointsInMetersLayers = [pointsInMeters];

// Shapes & icons
const iconResources = {
	icons: {
		gisat: {
			component: Icon,
			componentProps: {icon: 'gisat'},
			anchorPoint: [0.5, 0.5],
		},
		monitoring: {
			component: Icon,
			componentProps: {icon: 'monitoring'},
			anchorPoint: [0.5, 1],
		},
		crop: {
			component: Icon,
			componentProps: {icon: 'crop'},
			anchorPoint: [0, 1],
		},
		cross: {
			component: Icon,
			componentProps: {icon: 'cross'},
			anchorPoint: [0.5, 0.5],
		},
	},
};

const shapeStyle = {
	rules: [
		{
			styles: [
				{
					attributeKey: 'type',
					attributeValues: {
						metro: {
							fill: '#efefef',
							shape: 'pin',
							size: 16,
							outlineWidth: 2,
						},
						tram: {
							fill: '#992f2f',
							icon: 'monitoring',
							size: 16,
						},
						vegtral: {
							fill: '#724e25',
							icon: 'crop',
							size: 16,
						},
						parking: {
							shape: 'cross',
							size: 16,
							outlineWidth: 4,
							outlineColor: '#27b0c4',
						},
						ntm: {
							shape: 'square',
							size: 16,
							outlineWidth: 2,
							outlineColor: '#4d8c6e',
							fill: '#89d6ae',
						},
						gisat: {
							size: 48,
							shape: 'pin',
							outlineWidth: 3,
							outlineColor: '#395fab',
							fill: '#efefef',
							iconFill: '#122f64',
							icon: 'gisat',
						},
					},
				},
				{
					attributeKey: 'line',
					attributeValues: {
						A: {
							outlineColor: '#2d9b2d',
						},
						C: {
							outlineColor: '#ff0000',
						},
					},
				},
			],
		},
	],
};

const shapes = {
	key: 'shapes',
	type: 'vector',
	options: {
		features: letnaPoints.features,
		style: shapeStyle,
		hoverable: true,
		pointAsMarker: true,
		fidColumnName: 'id',
	},
};

const shapeLayers = [shapes];

/* LINES */
const lineFeaturesStyle = {
	rules: [
		{
			styles: [
				{
					outlineColor: '#000000',
					outlineWidth: 2,
				},
				{
					attributeKey: 'TRIDA',
					attributeValues: {
						1: {
							outlineColor: '#b43300',
							outlineWidth: 6,
						},
						2: {
							outlineColor: '#f89b7a',
							outlineWidth: 6,
						},
						3: {
							outlineColor: '#6c92d0',
							outlineWidth: 3,
						},
					},
				},
			],
		},
	],
};

const lineFeaturesLayer = {
	key: 'mixed-features-layer',
	type: 'vector',
	options: {
		features: cz_lines.features,
		hoverable: true,
		hovered: {
			style: 'default',
		},
		style: lineFeaturesStyle,
		fidColumnName: 'OBJECTID',
	},
};

const lineFeaturesLayers = [lineFeaturesLayer];

/* MIXED */
const mixedFeaturesStyle = {
	rules: [
		{
			styles: [
				{
					fill: '#cccccc',
					outlineColor: '#000000',
					outlineWidth: 2,
					size: 20,
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

const mixedFeaturesLayer = {
	key: 'mixed-features-layer',
	type: 'vector',
	options: {
		features: mixed_features.features,
		hoverable: true,
		hovered: {
			style: 'default',
		},
		selected: {
			testSelection: {
				keys: ['CZE.12_1'],
			},
		},
		fidColumnName: 'GID_1',
		pointAsMarker: true,
		style: mixedFeaturesStyle,
	},
};

const mixedFeaturesLayers = [mixedFeaturesLayer];

class LeafletVectorLayer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			basicPolygonLayersWithSelection,
			choroplethLayers,
			choroplethLayersCanvas,
			lineFeaturesLayers,
			mixedFeaturesLayers,
		};

		this.onLayerClick = this.onLayerClick.bind(this);
	}

	onLayerClick(map, layer, features) {
		if (map === 'basic-polygon-selection') {
			let updatedLayers = [
				{
					...polygonsWithSelection,
					options: {
						...polygonsWithSelection.options,
						selected: {
							...polygonsWithSelection.options.selected,
							testSelection: {
								...polygonsWithSelection.options.selected.testSelection,
								keys: features,
							},
						},
					},
				},
			];

			this.setState({
				basicPolygonLayersWithSelection: updatedLayers,
			});
		} else if (map === 'choropleth-map') {
			let updatedLayers = [
				{
					...choropleth,
					options: {
						...choropleth.options,
						selected: {
							...choropleth.options.selected,
							testSelection: {
								...choropleth.options.selected.testSelection,
								keys: features,
							},
						},
					},
				},
			];

			this.setState({
				choroplethLayers: updatedLayers,
			});
		} else if (map === 'choropleth-map-canvas') {
			let updatedLayers = [
				{
					...choroplethCanvas,
					options: {
						...choroplethCanvas.options,
						selected: {
							...choroplethCanvas.options.selected,
							testSelection: {
								...choroplethCanvas.options.selected.testSelection,
								keys: features,
							},
						},
					},
				},
			];

			this.setState({
				choroplethLayersCanvas: updatedLayers,
			});
		} else if (map === 'mixed-features-map') {
			let updatedLayers = [
				{
					...mixedFeaturesLayer,
					options: {
						...mixedFeaturesLayer.options,
						selected: {
							...mixedFeaturesLayer.options.selected,
							testSelection: {
								...mixedFeaturesLayer.options.selected.testSelection,
								keys: features,
							},
						},
					},
				},
			];

			this.setState({
				mixedFeaturesLayers: updatedLayers,
			});
		}
	}

	render() {
		return (
			<Page title="Leaflet Vector layer">
				<p>
					Use this type of layer to display analytical units, for interactive
					layers or choropleths (see examples below).
				</p>

				<p>
					VectorLayer component is always used inside ReactLeafletMap component.
					The data are passed via layers prop (see{' '}
					<Link to="/components/maps/map">Map</Link> documentation), where each
					layer is represented by Vector layer data type. For general
					information about Vector layer system data type, see{' '}
					<Link to="/architecture/systemDataTypes/layers#vector">Layers</Link>{' '}
					section.
				</p>

				<p>
					VectorLayer could be rendered either as SVG, or canvas. For details
					see the examples below.
				</p>

				<ImplementationToDo>
					<b>
						The rendering of features has to be unified together with popups
						refactoring. Currently:
					</b>
					<ul>
						<li>
							Vector layer redered as <b>canvas</b> has limited interactivity
							(no hover effects due to performance). In canvas could be
							polygons, lines, as well as points rendered (both pixel-fixed or
							geographically-fixed). However, the shapes which could be rendered
							are not unified with the SVG technique.
						</li>
						<li>
							Vector layer could be rendered as <b>SVG</b> using two ways. The
							first way is fully interactive (including tooltips), it could draw
							custom shapes as markers and circles as points with geographically
							fixed size, but it's quite slow. It is used for rendering of
							layers with 100 features or less. The second way is faster, but
							without the tooltip option.
						</li>
					</ul>
				</ImplementationToDo>

				<h2 id="polygons">Polygons</h2>
				<h3>Basic</h3>
				<p>Basic usage with default style.</p>
				<SyntaxHighlighter language="jsx">
					{`<ReactLeafletMap
    mapKey='basic-usage'
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
    layers={[{
        key: "gadm-1-cz",
        type: "vector",
        options: {
            features: [], //list of features
            fidColumnName: "GID_1"
        }
    }]}
/>`}
				</SyntaxHighlighter>
				<div style={{height: 500, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="basic-usage"
						view={view}
						backgroundLayer={backgroundLayer}
						layers={basicPolygonLayers}
					/>
				</div>

				<h3>With popups and selection</h3>
				<p>
					Move cursor over area to see the popup. Click on the area to select
					it.
				</p>
				<SyntaxHighlighter language="jsx">
					{`<HoverHandler
    popupContentComponent={
        (props) => <b>{props.data["NAME_1"]}</b>
    }
>
    <ReactLeafletMap
        //...
        onLayerClick={this.onLayerClick}
        layers={[{
            key: "polygons-with-selection",
            type: "vector",
            options: {
                features: cz_gadm.features,
                hoverable: true,
                hovered: {
                    style: "default"    
                },
                selectable: true,
                selected: {
                    "testSelection": {
                        keys: ["CZE.12_1"],
                        style: "default",
                        hoveredStyle: "default"
                    }
                },
                fidColumnName: "GID_1"
            }
        }]}
    />
</HoverHandler>`}
				</SyntaxHighlighter>
				<div style={{height: 500, marginBottom: 10}}>
					<HoverHandler
						popupContentComponent={props => <b>{props.data['NAME_1']}</b>}
					>
						<ReactLeafletMap
							mapKey="basic-polygon-selection"
							view={view}
							backgroundLayer={backgroundLayer}
							layers={this.state.basicPolygonLayersWithSelection}
							onLayerClick={this.onLayerClick}
						/>
					</HoverHandler>
				</div>

				<h3>Choropleth with hundreds of polygons</h3>
				<p>
					Move cursor over area to see hover effect. Click on the area to select
					it.
				</p>
				<SyntaxHighlighter language="jsx">
					{`
    <ReactLeafletMap
        //...
        layers={[{
            //...
            options: {
                //...
                style: {
                    rules: [{
                        styles: [{
                            outlineWidth: 1,
                            outlineColor: "#666"
                        },{
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
                    }
                ]}
            }
        }]}
    />`}
				</SyntaxHighlighter>
				<div style={{height: 500, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="choropleth-map"
						view={viewEurope}
						backgroundLayer={backgroundLayer}
						layers={this.state.choroplethLayers}
						onLayerClick={this.onLayerClick}
					/>
				</div>

				<p>The same layer as above is now rendered using canvas technique.</p>
				<SyntaxHighlighter language="jsx">
					{`
    <ReactLeafletMap
        //...
        layers={[{
            //...
            options: {
                //...
                renderingTechnique: "canvas"
            }
        }]}
    />`}
				</SyntaxHighlighter>
				<div style={{height: 500, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey="choropleth-map-canvas"
						view={viewEurope}
						backgroundLayer={backgroundLayer}
						layers={this.state.choroplethLayersCanvas}
						onLayerClick={this.onLayerClick}
					/>
				</div>

				<h2 id="points">Points</h2>
				<h3>Size in meters</h3>
				<p>
					Try to zoom in and out. The size of circle is in meters and varies
					between 500 and 2000 meters.
				</p>
				<div style={{height: 500, marginBottom: 10}}>
					<HoverHandler
						popupContentComponent={props => {
							return <p>Value: {props.data['attr1']}</p>;
						}}
					>
						<ReactLeafletMap
							mapKey="react-leaflet-map-4"
							view={viewHradec}
							backgroundLayer={backgroundLayer}
							layers={pointsInMetersLayers}
						/>
					</HoverHandler>
				</div>

				<h3>Render as markers - size in pixels</h3>
				<p>
					Try to zoom in and out. The size of circle is the same for each zoom
					level (independent of zoom) and varies between 5 and 20 px.
				</p>
				<div style={{height: 500, marginBottom: 10}}>
					<HoverHandler
						popupContentComponent={props => {
							return <p>Value: {props.data['attr1']}</p>;
						}}
					>
						<ReactLeafletMap
							mapKey="react-leaflet-map-3"
							view={viewHradec}
							backgroundLayer={backgroundLayer}
							layers={pointsInPxLayers}
						/>
					</HoverHandler>
				</div>

				<h3 id="shapesIcons">Render as markers - shapes & icons</h3>
				<p>
					Markers can be represented by various shapes, icons or their
					combination.
				</p>
				<p>
					Shapes are defined within the map component. Currently, "pin",
					"cross", "square", "diamond" and "circle" (default) shape are
					supported. You can define which shape to use in style rule.
				</p>
				<p>
					Whereas shapes are built-in, icons have to be passed to the map in the
					resources prop (see how in{' '}
					<Link to="../../map#resources">Resources section</Link>). If the icon
					is defined, but the shape is not, the icon is used as the shape.
					Again, define which shape to use in style rule.
				</p>
				<p>
					It is possible to combine shape with icon. Currently, only "pin" shape
					allows this combination.
				</p>
				<p>
					See the examples below with different uses of shapes, icons or their
					combination.
				</p>
				<DocsToDo>
					List of available shapes. Currently "pin", "cross", "square",
					"diamond" and "circle" are supported.
				</DocsToDo>
				<div style={{height: 300, marginBottom: 10}}>
					<HoverHandler
						popupContentComponent={props => {
							return <b>{props.data.name}</b>;
						}}
					>
						<ReactLeafletMap
							mapKey="react-leaflet-map-icons"
							view={viewLetna}
							backgroundLayer={backgroundCartoLayer}
							layers={shapeLayers}
							resources={iconResources}
						/>
					</HoverHandler>
				</div>
				<SyntaxHighlighter language="jsx">
					{`<ReactLeafletMap
	mapKey="react-leaflet-map-icons"
	view={{
		center: {lat: 50.0995436, lon: 14.4225},
		boxRange: 500
	}}
	backgroundLayer={{
		key: 'background-cdb',
		type: 'wmts',
		options: {
		url: 'https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}@2x.png'}
	}}
	layers={[{
		key: 'shapes',
		type: 'vector',
		options: {
			features: [], //features
			style: {
					rules: [
						{
							styles: [
								{
									attributeKey: 'type',
									attributeValues: {
										metro: {
											fill: '#efefef',
											shape: 'pin',
											size: 16,
											outlineWidth: 2
										},
										tram: {
											fill: '#992f2f',
											icon: 'monitoring',
											size: 16
										},
										vegtral: {
											fill: '#724e25',
											icon: 'crop',
											size: 16
										},
										parking: {
											shape: 'cross',
											size: 16,
											outlineWidth: 4,
											outlineColor: '#27b0c4'
										},
										ntm: {
											shape: 'square',
											size: 16,
											outlineWidth: 2,
											outlineColor: '#4d8c6e',
											fill: '#89d6ae'
										},
										gisat: {
											size: 48,
											shape: 'pin',
											outlineWidth: 3,
											outlineColor: '#395fab',
											fill: '#efefef',
											iconFill: '#122f64',
											icon: 'gisat'
										}
									}
								},
								{
									attributeKey: 'line',
									attributeValues: {
										A: {
											outlineColor: '#2d9b2d'
										},
										C: {
											outlineColor: '#ff0000'
										}
									}
								}
							]
						}
					]
				},
			hoverable: true,
			pointAsMarker: true,
			fidColumnName: 'id'
		}
	}]}
	resources={{
		icons: {
			gisat: {
				component: Icon,
				componentProps: {icon: 'gisat'},
				anchorPoint: [0.5, 0.5]
			},
			monitoring: {
				component: Icon,
				componentProps: {icon: 'monitoring'},
				anchorPoint: [0.5, 1]
			},
			crop: {
				component: Icon,
				componentProps: {icon: 'crop'},
				anchorPoint: [0, 1]
			},
			cross: {
				component: Icon,
				componentProps: {icon: 'cross'},
				anchorPoint: [0.5, 0.5]
			}
		}
	}}
/>`}
				</SyntaxHighlighter>

				<h2 id="lines">Lines</h2>
				<SyntaxHighlighter language="jsx">
					{`<HoverHandler
//...
>
    <ReactLeafletMap
        //...
        layers={[{
            //...
            options: {
                //...
                style: {
                    rules: [{
                        styles: [{
                            outlineColor: "#000000",
                            outlineWidth: 2,
                        },{
                            attributeKey: "TRIDA",
                            attributeValues: {
                                1: {
                                    outlineColor: "#b43300",
                                    outlineWidth: 6
                                },
                                2: {
                                    outlineColor: "#f89b7a",
                                    outlineWidth: 6
                                },
                                3: {
                                    outlineColor: "#6c92d0",
                                    outlineWidth: 3
                                }
                            }
                        }]
                    }]
                }
            }
        }]}
    />
</HoverHandler>`}
				</SyntaxHighlighter>
				<div style={{height: 500, marginBottom: 10}}>
					<HoverHandler
						popupContentComponent={props => {
							return (
								<>
									<b>{props.data['CISLO_SILNICE']}</b>
								</>
							);
						}}
					>
						<ReactLeafletMap
							mapKey="lines-map"
							view={view}
							backgroundLayer={backgroundLayer}
							layers={this.state.lineFeaturesLayers}
						/>
					</HoverHandler>
				</div>

				<h2 id="mixed">Mixed</h2>
				<p>
					The source GeoJSON contains features of different types. Points are
					always rendered on the top of lines, lines are always rendered on the
					top of polygons.
				</p>
				<div style={{height: 500, marginBottom: 10}}>
					<HoverHandler
						popupContentComponent={props => {
							return (
								<>
									<b>{props.data['NAME_1']}</b>
								</>
							);
						}}
					>
						<ReactLeafletMap
							mapKey="mixed-features-map"
							view={view}
							backgroundLayer={backgroundLayer}
							layers={this.state.mixedFeaturesLayers}
							onLayerClick={this.onLayerClick}
						/>
					</HoverHandler>
				</div>
			</Page>
		);
	}
}

export default LeafletVectorLayer;
