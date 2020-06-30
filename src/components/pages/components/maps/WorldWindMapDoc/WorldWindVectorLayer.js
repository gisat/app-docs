import React from 'react';
import _ from "lodash";
import Page, {
    DocsToDo,
    DocsToDoInline,
    ImplementationToDo,
    InlineCodeHighlighter,
    LightDarkBlock,
    SyntaxHighlighter
} from "../../../../Page";
import {WorldWindMap} from "@gisatcz/ptr-maps";
import cz_gadm from "../../../../mockData/map/czGadm1WithStyles/geometries.json";
import style from "../../../../mockData/map/czGadm1WithStyles/style.json";
import pointData from "../../../../mockData/map/largePointData/geometries.json";
import largePointDataFeatures from "../../../../mockData/map/largePointData/sample_points_5000_mini.json";
import pointStyle from "../../../../mockData/map/largePointData/style-simple-point.json";
import {HoverHandler} from "@gisatcz/ptr-core";
import nuts_2 from "../../../../mockData/map/nuts_2.json";
import {Link} from "react-router-dom";

const view = {
    center: {lat: 50, lon: 15},
    boxRange: 500000
};

const viewEurope = {
    center: {lat: 50, lon: 15},
    boxRange: 2000000
};

const backgroundLayer = {
    key: 'background-osm',
    type: 'wmts',
    options: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
};

/* Polygons */
// Without style
const polygonsWithoutStyle = {
    key: "gadm-1-cz",
    type: "vector",
    options: {
        features: cz_gadm.features
    }
};

// With style
const polygonsStyle = {
    "rules":[
        {
            "styles":[
                {
                    "fillOpacity": 0.8,
                    "outlineColor": "#262626",
                    "fill": "#d2d2d2"
                },
                {
                    "attributeKey":"e575b4d4-7c7a-4658-bb9a-a9b61fcc2587",
                    "attributeClasses":[
                        {
                            "interval": [0,5],
                            "intervalBounds": [true, false],
                            "fill": "#e41a1c"
                        },{
                            "interval": [5,10],
                            "intervalBounds": [true, false],
                            "fill": "#377eb8"
                        },{
                            "interval": [10,20],
                            "intervalBounds": [true, false],
                            "fill": "#984ea3"
                        }
                    ]
                }, {
                    "attributeKey": "22a43eb3-6552-476f-97a5-b47490519642",
                    "attributeScale": {
                        "outlineWidth": {
                            "inputInterval": [-10,10],
                            "outputInterval": [0,7]
                        }
                    }
                }
            ]
        }
    ]
}

const polygonsWithStyle = {
    key: "gadm-1-cz",
    type: "vector",
    options: {
        style: polygonsStyle,
        features: cz_gadm.features,
        fidColumnName: "GID_1",
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
        }
    }
};

// Hundreds of polygons
const choroplethStyle = {rules: [{
        styles: [{
            outlineWidth: 1,
            outlineColor: "#666666"
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
    }]};

const choropleth = {
    key: "choropleth",
    type: "vector",
    options: {
        features: nuts_2.features,
        style: choroplethStyle,
        hoverable: true,
        hovered: {
          style: "default"
        },
        selectable: true,
        selected: {
            "testSelection": {
                keys: ["PL41"],
                style: "default",
                hoveredStyle: "default"
            }
        },
        fidColumnName: "id"
    }
};

/* Points */
// TODO

/* Lines */
// TODO

const polygonsWithoutStyleLayers = [polygonsWithoutStyle];
const polygonsWithStyleLayers = [polygonsWithStyle];
const hundredsOfPolygonsLayers = [choropleth];

class WorldWindVectorLayer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            polygonsWithStyleLayers,
            hundredsOfPolygonsLayers
        }

        this.onLayerClick = this.onLayerClick.bind(this);
    }

    onLayerClick(map, layer, features) {
        if (map === "polygons-with-style-map") {
            let updatedLayers = [{
                ...polygonsWithStyle,
                options: {
                    ...polygonsWithStyle.options,
                    selected: {
                        ...polygonsWithStyle.options.selected,
                        testSelection: {
                            ...polygonsWithStyle.options.selected.testSelection,
                            keys: features
                        }
                    }
                }
            }];

            this.setState({
                polygonsWithStyleLayers: updatedLayers
            })
        } else if (map === "choropleth") {
            let updatedLayers2 = [{
                ...choropleth,
                options: {
                    ...choropleth.options,
                    selected: {
                        ...choropleth.options.selected,
                        testSelection: {
                            ...choropleth.options.selected.testSelection,
                            keys: features
                        }
                    }
                }
            }];

            this.setState({
                hundredsOfPolygonsLayers: updatedLayers2
            })
        }
    }

    render() {
        return (
            <Page title="World Wind Vector layer">
                <p>Use this type of layer to display analytical units, for interactive layers or choropleths (see examples below).</p>

                <p>The data are passed via layers prop (see <Link to="/components/maps/map">Map</Link> documentation), where each layer is represented by Vector layer data type. For general information about Vector layer system data type, see <Link to="/architecture/systemDataTypes/layers#vector">Layers</Link> section.</p>


                <h2 id="polygons">Polygons</h2>

                <h3>Basic usage</h3>
                <p>If style is not defined, fallback style is used.</p>
                <SyntaxHighlighter language="jsx">{`<WorldWindMap
    mapKey='basic-usage'
    view={{
        center: {lat: 50, lon: 15},
        boxRange: 1000000
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
            features: [] //list of features
        }
    }]}
/>`}
                </SyntaxHighlighter>
                <div style={{height: 400, marginBottom: 10}}>
                    <WorldWindMap
                        view={view}
                        backgroundLayer={backgroundLayer}
                        layers={polygonsWithoutStyleLayers}
                    />
                </div>

                <h3>With defined style & interactive</h3>
                <SyntaxHighlighter language="jsx">{`<WorldWindMap
    mapKey='basic-usage'
    view={{
        center: {lat: 50, lon: 15},
        boxRange: 1000000
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
            style: {
                "rules":[
                    {
                        "styles":[
                            {
                                "fillOpacity": 0.8,
                                "outlineColor": "#262626",
                                "fill": "#d2d2d2"
                            },
                            {
                                "attributeKey":"e575b4d4-7c7a-4658-bb9a-a9b61fcc2587",
                                "attributeClasses":[
                                    {
                                        "interval": [0,5],
                                        "intervalBounds": [true, false],
                                        "fill": "#e41a1c"
                                    },{
                                        "interval": [5,10],
                                        "intervalBounds": [true, false],
                                        "fill": "#377eb8"
                                    },{
                                        "interval": [10,20],
                                        "intervalBounds": [true, false],
                                        "fill": "#984ea3"
                                    }
                                ]
                            }, {
                                "attributeKey": "22a43eb3-6552-476f-97a5-b47490519642",
                                "attributeScale": {
                                    "outlineWidth": {
                                        "inputInterval": [-10,10],
                                        "outputInterval": [0,7]
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            features: cz_gadm.features,
            fidColumnName: "GID_1",
            selected: {
                "testSelection": {
                    keys: ["CZE.12_1"]
                }
            }
        }
    }]}
/>`}
                </SyntaxHighlighter>
                <p>Move cursor over area to see the popup. Click on the area to select it.</p>
                <HoverHandler>
                    <div style={{height: 400, marginBottom: 10}}>
                        <WorldWindMap
                            mapKey="polygons-with-style-map"
                            view={view}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.polygonsWithStyleLayers}
                            onLayerClick={this.onLayerClick}
                        />
                    </div>
                </HoverHandler>

                <h3>Hundreds of polygons</h3>
                <HoverHandler>
                    <div style={{height: 500, marginBottom: 10}}>
                        <WorldWindMap
                            mapKey="choropleth"
                            view={viewEurope}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.hundredsOfPolygonsLayers}
                            onLayerClick={this.onLayerClick}
                        />
                    </div>
                </HoverHandler>

                <h2 id="points">Points</h2>
                <h3>Markers - size in px</h3>
                <SyntaxHighlighter language="jsx">{`<WorldWindMap
    //...
    layers={[{
        key: "large-data",
        type: "vector",
        options: {
            //...
            pointAsMarker: true
        }
    }]}
/>`}
                </SyntaxHighlighter>
                See example in <Link to="/architecture/storeDataTypes/common/style#large-data-layer">Styles section</Link>.

                <h3>Size in meters</h3>
                <ImplementationToDo>Not implemented currently.</ImplementationToDo>

                <h2 id="lines">Lines</h2>
                <ImplementationToDo>Lines are not implemented currently.</ImplementationToDo>
            </Page>
        );
    }
}

export default WorldWindVectorLayer;