import React from 'react';
import _ from "lodash";
import Page, {
    InlineCodeHighlighter,
    SyntaxHighlighter
} from "../../../../Page";
import {MapControls, PresentationMap, ReactLeafletMap} from "@gisatcz/ptr-maps";
import cz_gadm from "../../../../mockData/map/czGadm1WithStyles/geometries.json";
import nuts_2 from "../../../../mockData/map/nuts_2.json";
import {HoverHandler} from "@gisatcz/ptr-core";
import {Link} from "@gisatcz/ptr-state";

const europeView = {
    center: {lat: 49.8, lon: 12},
    boxRange: 2000000
};

const czView = {
    center: {lat: 49.8, lon: 15},
    boxRange: 1000000
};

const backgroundLayer = {
    key: 'background-osm',
    type: 'wmts',
    options: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
};

// Polygons & diagrams
const diagramStyle = {rules: [{
        styles: [{
            fill: "#cccccc",
            outlineWidth: 1,
            outlineColor: "#000000",
            diagramShape: "circle",
            diagramFillOpacity: 0.5,
            diagramFill: "#ffffff",
            diagramOutlineWidth: 1,
            diagramOutlineColor: "#364049"
        }, {
            attributeKey: "e575b4d4-7c7a-4658-bb9a-a9b61fcc2587",
            attributeScale: {
                diagramSize: {
                    "inputInterval": [0,10],
                    "outputInterval": [10000, 30000]
                }
            }
        }, {
            attributeKey: "attr-2",
            attributeValues: {
                red: {
                    diagramFill: "#ff0000",
                },
                blue: {
                    diagramFill: "#0000ff",
                },
                green: {
                    diagramFill: "#00ff00",
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
        fidColumnName: "GID_1",
        selected: {
            "testSelection": {
                keys: ["CZE.12_1"]
            }
        }
    }
}];

// Choropleth and diagrams
const diagramChoroplethStyle = {rules: [{
        styles: [{
            outlineWidth: 1,
            outlineColor: "#666",
            diagramShape: "circle",
            diagramFill: "#14a8b4",
            diagramFillOpacity: 0.7,
            diagramOutlineWidth: 1,
            diagramOutlineColor: "#0d393d"
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
        fidColumnName: "id",
        selected: {
            "testSelection": {
                keys: ["PL41"]
            }
        }
    }
}];

class LeafletDiagramLayer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            polygonLayers_diagrams,
            polygonLayers_countries
        }

        this.onLayerClick = this.onLayerClick.bind(this);
    }

    onLayerClick(map, layer, features) {
        if (map === 'czechia') {
            let updatedLayers = _.cloneDeep(this.state.polygonLayers_diagrams);
            updatedLayers[0].options.selected.testSelection.keys = features;

            this.setState({
                polygonLayers_diagrams: updatedLayers
            })
        } else if (map === 'europe') {
            let updatedLayers = _.cloneDeep(this.state.polygonLayers_countries);
            updatedLayers[0].options.selected.testSelection.keys = features;

            this.setState({
                polygonLayers_countries: updatedLayers
            })
        }
    }

    render() {
        return (
            <Page title="Leaflet diagram layer">
                <p>Use diagram to visualize absolute value for area. See the examples bellow how diagrams can be drawn on the top of choropleth map.</p>

                <p>DiagramLayer component extends <Link to="./vectorLayer">VectorLayer</Link> component and it is always used inside ReactLeafletMap component. The data are passed via layers prop (see <Link to="/components/maps/map">Map</Link> documentation), where each layer is represented by Vector layer data type. For general information about Vector layer system data type, see <Link to="/architecture/systemDataTypes/layers#vector">Layers</Link> section.</p>

                <p>In case of Diagram layer, following options are different from Vector layer data type definition:</p>
                <SyntaxHighlighter language="javascript">
                    {
                        `{
    // ...
	type: "diagram"
}`
                    }
                </SyntaxHighlighter>
                <h2>Basic diagrams</h2>
                <SyntaxHighlighter language="jsx">{`<PresentationMap
    mapKey="czechia"
    mapComponent={ReactLeafletMap}
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
        key: "polygons",
        type: "diagram",
        options: {
            features: cz_gadm.features,
            style: {rules: [{
                styles: [{
                    fill: "#cccccc",
                    outlineWidth: 1,
                    outlineColor: "#000000",
                    diagramShape: "circle",
                    diagramFillOpacity: 0.5,
                    diagramFill: "#ffffff",
                    diagramOutlineWidth: 1,
                    diagramOutlineColor: "#256293"
                }, {
                    attributeKey: "e575b4d4-7c7a-4658-bb9a-a9b61fcc2587",
                    attributeScale: {
                        diagramSize: {
                            "inputInterval": [0,10],
                            "outputInterval": [10000, 30000]
                        }
                    }
                }, {
                    attributeKey: "attr-2",
                    attributeValues: {
                        red: {
                            diagramFill: "#ff0000",
                        },
                        blue: {
                            diagramFill: "#0000ff",
                        },
                        green: {
                            diagramFill: "#00ff00",
                        }
                    }
                }]
            }]},
            fidColumnName: "GID_1",
            selected: {
                "testSelection": {
                    keys: ["CZE.12_1"]
                }
            }
        }
    }]}
    onLayerClick={this.onLayerClick}
>
    <MapControls zoomOnly levelsBased/>
</PresentationMap>`}
                </SyntaxHighlighter>
                <div style={{height: 500, marginBottom: 10}}>
                    <HoverHandler
                        popupContentComponent={
                            (props) => {
                                return (<><b>{props.data["GID_1"]}</b>: {props.data["e575b4d4-7c7a-4658-bb9a-a9b61fcc2587"] ? props.data["e575b4d4-7c7a-4658-bb9a-a9b61fcc2587"].toFixed(2): null}</>);
                            }
                        }
                    >
                        <PresentationMap
                            mapComponent={ReactLeafletMap}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.polygonLayers_diagrams}
                            view={czView}
                            mapKey="czechia"
                            onLayerClick={this.onLayerClick}
                        >
                            <MapControls zoomOnly levelsBased/>
                        </PresentationMap>
                    </HoverHandler>
                </div>


                <h2>Basic diagrams with choropleth</h2>
                <SyntaxHighlighter language="jsx">{`<PresentationMap
    //...
    layers={[{
        key: "countries",
        type: "diagram",
        options: {
            features: nuts_2.features,
            fidColumnName: "id",
            selected: {
                "testSelection": {
                    keys: ["PL41"]
                }
            },
            style: {rules: [{
                styles: [{
                    outlineWidth: 1,
                    outlineColor: "#666",
                    diagramShape: "circle",
                    diagramFill: "#14a8b4",
                    diagramFillOpacity: 0.7,
                    diagramOutlineWidth: 1,
                    diagramOutlineColor: "#0d393d"
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
            }]} 
        }
    }]}
>
    <MapControls zoomOnly levelsBased/>
</PresentationMap>`}
                </SyntaxHighlighter>
                <div style={{height: 500, marginBottom: 10}}>
                    <HoverHandler
                        popupContentComponent={
                            (props) => {
                                return (<><b>{props.data["id"]}</b>:<br/>
                                    Diagram: {props.data["positive_attr"].toFixed(2)}<br/>
                                    Choropleth: {props.data["diverging_attr"].toFixed(2)}<br/>
                                </>);
                            }
                        }
                    >
                        <PresentationMap
                            mapComponent={ReactLeafletMap}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.polygonLayers_countries}
                            view={europeView}
                            mapKey={"europe"}
                            onLayerClick={this.onLayerClick}
                        >
                            <MapControls zoomOnly levelsBased/>
                        </PresentationMap>
                    </HoverHandler>
                </div>
            </Page>
        );
    }
}

export default LeafletDiagramLayer;