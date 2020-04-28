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

const view = {
    center: {lat: 50, lon: 15},
    boxRange: 1000000
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
                    "fillOpacity": 0.5
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
        selected: {
            "testSelection": {
                keys: ["CZE.12_1"]
            }
        }
    }
};

// Hundreds of polygons
// TODO

/* Points */
// TODO

/* Lines */
// TODO

const polygonsWithoutStyleLayers = [polygonsWithoutStyle];
const polygonsWithStyleLayers = [polygonsWithStyle];
const hundredsOfPolygonsLayers = [];

class WorldWindVectorLayer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            polygonsWithStyleLayers
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
        }
    }

    render() {
        return (
            <Page title="World Wind Vector layer">
                <h2 id="polygons">Polygons</h2>

                <h3>Basic usage</h3>
                <p>If style is not defined, fallback style is used.</p>
                <HoverHandler>
                <div style={{height: 500, marginBottom: 10}}>
                    <WorldWindMap
                        view={view}
                        backgroundLayer={backgroundLayer}
                    />
                </div>
                </HoverHandler>

                <h3>With defined style & interactive</h3>
                <p>Move cursor over area to see the popup. Click on the area to select it.</p>
                <HoverHandler>
                    <div style={{height: 500, marginBottom: 10}}>
                        <WorldWindMap
                            view={view}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.polygonsWithStyleLayers}
                            onLayerClick={this.onLayerClick}
                        />
                    </div>
                </HoverHandler>

                <h3>Hundreds of polygons</h3>
                <DocsToDo>Missing docs</DocsToDo>

                <h2 id="points">Points</h2>
                <h3>Markers - size in px</h3>
                <DocsToDo>Missing docs</DocsToDo>
                <h3>Size in meters</h3>
                <ImplementationToDo>Not implemented currently.</ImplementationToDo>

                <h2 id="lines">Lines</h2>
                <ImplementationToDo>Lines are not implemented currently.</ImplementationToDo>
            </Page>
        );
    }
}

export default WorldWindVectorLayer;