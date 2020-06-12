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

import {ReactLeafletMap, PresentationMap, MapControls} from "@gisatcz/ptr-maps";
import {HoverHandler} from "@gisatcz/ptr-core";
import {Button, Buttons, ButtonSwitchOption, ButtonGroup} from "@gisatcz/ptr-atoms";
import {Link} from "react-router-dom";
import utils from "../../../../../utils";
import config from "../../../../../config";

const default_points_boxRangeRange = [null, 50000];
const default_polygons_boxRangeRange = [500000, 3000000];

// *** VIEWS ***
const view = {
    center: {lat: 50.05, lon: 15.15},
    boxRange: 30000
};

const viewEurope = {
    center: {lat: 50.05, lon: 15.15},
    boxRange: 1000000
};

const backgroundLayer = {
    key: 'background-osm',
    type: 'wmts',
    options: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
};

// *** POINTS ***
const cz_large_data_style = {
    "rules":[
        {
            "styles": [
                {
                    "fillOpacity": 0.85,
                    "outlineWidth": 1,
                    "outlineColor": "#333333",
                    "size": 10
                },
                {
                    "attributeKey": "a1",
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
                            "fill": "#6d99d0"
                        },{
                            "interval": [75,101],
                            "fill": "#264d7b"
                        }
                    ]
                }, {
                    "attributeKey": "a2",
                    "attributeClasses": [
                        {
                            "interval": [-10, -3],
                            "shape": "square",
                        },
                        {
                            "interval": [-3,3],
                            "shape": "circle"
                        },{
                            "interval": [3,10],
                            "shape": "diamond"
                        }
                    ]
                }, {
                    "attributeKey": "a3",
                    "attributeScale": {
                        "size": {
                            "inputInterval": [10,10000],
                            "outputInterval": [5,15]
                        }
                    }
                }
            ]
        }
    ]
}


const cz_large_data_layer = {
    key: "cz_large_data_layer",
    type: "vector",
    options: {
        features: [],
        selected: {
          testSelection: {}
        },
        style: cz_large_data_style,
        pointAsMarker: true,
        fidColumnName: "gid",
        boxRangeRange: default_points_boxRangeRange
    }
};

const cz_large_data_layers = [cz_large_data_layer];

// *** POLYGONS ***
const polygons_style = {
    "rules":[
        {
            "styles": [
                {
                    "fillOpacity": 0.85,
                    "outlineWidth": 1,
                    "outlineColor": "#333333"
                },
                {
                    "attributeKey": "attr_3",
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
                            "fill": "#6d99d0"
                        },{
                            "interval": [75,101],
                            "fill": "#264d7b"
                        }
                    ]
                }
            ]
        }
    ]
}

const polygon_layer = {
    key: "polygon_layer",
    type: "vector",
    options: {
        features: [],
        style: polygons_style,
        fidColumnName: "id",
        boxRangeRange: default_polygons_boxRangeRange
    }
};

const polygon_layers = [polygon_layer];

class LeafletIndexedVectorLayer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cz_large_data_layers,
            polygon_layers,
            maxBoxRange: default_points_boxRangeRange[1],
            currentPointsBoxRange: view.boxRange,
            currentPolygonsBoxRange: viewEurope.boxRange
        };

        this.onLayerClick = this.onLayerClick.bind(this);
        this.removeAllPoints = this.removeAllPoints.bind(this);
        this.onViewChange = this.onViewChange.bind(this);
    }

    onViewChange(mapKey, view) {
        if (mapKey === 'large-data') {
            this.setState({
                currentPointsBoxRange: view.boxRange
            });
        } else if (mapKey === 'large-data-polygons') {
            this.setState({
                currentPolygonsBoxRange: view.boxRange
            });
        }
    }

    onLayerClick(map, layer, features) {
        if (layer === 'cz_large_data_layer') {
            let updatedLayers = [{
                ...this.state.cz_large_data_layers[0],
                options: {
                    ...this.state.cz_large_data_layers[0].options,
                    selected: {
                        ...this.state.cz_large_data_layers[0].options.selected,
                        testSelection: {
                            ...this.state.cz_large_data_layers[0].options.selected.testSelection,
                            keys: features
                        }
                    }
                }
            }];

            this.setState({
                cz_large_data_layers: updatedLayers
            })
        }
    }

    addData(limit) {
        let promises = [];
        for (let i=1; i<=limit; i++) {
            let url = `${config.mockDataRepositoryUrl}pvlach/largeData/cz_200000/${i}.json`;
            promises.push(utils.request(url, "GET"));
        }

        if (promises.length) {
            this.setState({loading: ["Loading started..."]});
            Promise.all(promises).then(data => {
               if (data.length) {
                   this.setState({loading: [...this.state.loading, "Data loaded"]});
                   const features = _.flatten(data.map(item => item.features));
                   this.populateLayer('cz_large_data_layer', features);
               }
            }).catch(err => new Error(err));
        }
    }

    addPolygonData() {
        let url = `${config.mockDataRepositoryUrl}pvlach/largeData/nutsrg_3.json`;
        utils.request(url, "GET").then(data => {
           if (data) {
               this.populateLayer('polygon_layer', data.features);
           }
        }).catch(err => new Error(err));
    }

    removeAllPoints() {
        this.populateLayer('cz_large_data_layer', []);
    }

    removePolygonData() {
        this.populateLayer('polygon_layer', []);
    }

    populateLayer(layer, features) {
        if (layer === 'cz_large_data_layer') {
            let updatedLayers = [{
                ...this.state.cz_large_data_layers[0],
                options: {
                    ...this.state.cz_large_data_layers[0].options,
                    features
                }
            }];

            this.setState({
                cz_large_data_layers: updatedLayers,
                loading: features.length ? [...this.state.loading, "Add data to map"] : ["Remove data from map"]
            });
        } else if (layer === 'polygon_layer') {
            let updatedLayers = [{
                ...this.state.polygon_layers[0],
                options: {
                    ...this.state.polygon_layers[0].options,
                    features
                }
            }];

            this.setState({
                polygon_layers: updatedLayers,
            });
        }
    }

    onMaxRangeChange(maxBoxRange) {
        let updatedLayers = [{
            ...this.state.cz_large_data_layers[0],
            options: {
                ...this.state.cz_large_data_layers[0].options,
                boxRangeRange: [null, maxBoxRange]
            }
        }];

        this.setState({
            maxBoxRange,
            cz_large_data_layers: updatedLayers
        })
    }

    render() {
        return (
            <Page title="Indexed Vector layer">
                <p>Indexed Vector layer wraps both <Link to="vectorLayer">Vector layer</Link> and <Link to="diagramLayer">Diagram layer</Link>. All features are indexed using <a target="_blank" href="https://www.npmjs.com/package/geojson-rbush">B-tree</a>. Only features in visible area (bounding box) are rendered. Consider using <Link to="/architecture/systemDataTypes/layers#vector"><InlineCodeHighlighter>boxRangeRange</InlineCodeHighlighter></Link> property to limit range where layer is rendered - useful for layers with big amount of features.</p>

                <h2>Playground</h2>
                <h3>Point</h3>
                <div>First, load desired amount of point features (and then optionally remove them again):</div>
                <Buttons>
                    <Button onClick={this.addData.bind(this,1)}>Add 20 000 points</Button>
                    <Button onClick={this.addData.bind(this,10)}>Add 200 000 points</Button>
                    <Button onClick={this.removeAllPoints}>Remove all point data</Button>
                </Buttons>

                <div className="ptr-docs-process-info-box">
                {this.state.loading && this.state.loading.map((step, i) => <div key={i}>{step}</div>)}
                </div>

                <div>Next, you can optionaly switch the maximum range to draw the features: </div>
                <ButtonGroup>
                    <ButtonSwitchOption primary={this.state.maxBoxRange === 20000} onClick={this.onMaxRangeChange.bind(this, 20000)}>20 km</ButtonSwitchOption>
                    <ButtonSwitchOption primary={this.state.maxBoxRange === 50000} onClick={this.onMaxRangeChange.bind(this, 50000)}>50 km</ButtonSwitchOption>
                    <ButtonSwitchOption primary={this.state.maxBoxRange === 100000} onClick={this.onMaxRangeChange.bind(this, 100000)}>100 km</ButtonSwitchOption>
                </ButtonGroup>

                <div style={{marginTop: '1rem'}}>Zoom in/out to see current range change: <b>{Math.round(this.state.currentPointsBoxRange/1000)}</b> km</div>

                <div style={{height: 500, marginBottom: 10}}>
                    <HoverHandler
                        popupContentComponent={
                            (props) => <>
                                Value for color: <b>{props.data["a1"]}</b><br/>
                                Value for size: <b>{props.data["a3"]}</b><br/>
                                Value for shape: <b>{props.data["a2"]}</b>
                            </>
                        }
                    >
                        <PresentationMap
                            mapComponent={ReactLeafletMap}
                            mapKey='large-data'
                            view={view}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.cz_large_data_layers}
                            onLayerClick={this.onLayerClick}
                            onViewChange={this.onViewChange.bind(this, 'large-data')}
                        >
                            <MapControls levelsBased zoomOnly/>
                        </PresentationMap>
                    </HoverHandler>
                </div>

                <h3>Polygons</h3>
                <div>First, load point features (and then optionally remove them again):</div>
                <Buttons>
                    <Button onClick={this.addPolygonData.bind(this)}>Add 1500 polygons</Button>
                    <Button onClick={this.removePolygonData.bind(this)}>Remove polygon data</Button>
                </Buttons>
                <div style={{marginTop: '1rem'}}>Min box range to draw features: {default_polygons_boxRangeRange[0]/1000} km</div>
                <div>Max box range to draw features: {default_polygons_boxRangeRange[1]/1000} km</div>
                <div>Zoom in/out to see current range change: <b>{Math.round(this.state.currentPolygonsBoxRange/1000)}</b> km</div>
                <div style={{height: 500, marginBottom: 10, marginTop: 10}}>
                    <HoverHandler
                        popupContentComponent={
                            (props) => <>
                                Name: <b>{props.data["na"]}</b>
                            </>
                        }
                    >
                        <PresentationMap
                            mapComponent={ReactLeafletMap}
                            mapKey='large-data-polygons'
                            view={viewEurope}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.polygon_layers}
                            onViewChange={this.onViewChange.bind(this, 'large-data-polygons')}
                        >
                            <MapControls levelsBased zoomOnly/>
                        </PresentationMap>
                    </HoverHandler>
                </div>
            </Page>
        );
    }
}

export default LeafletIndexedVectorLayer;