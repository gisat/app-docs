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

import {ReactLeafletMap, PresentationMap} from "@gisatcz/ptr-maps";
import {HoverHandler} from "@gisatcz/ptr-core";
import {Button, Buttons, ButtonSwitchOption, ButtonGroup} from "@gisatcz/ptr-atoms";
import utils from "../../../../../utils";
import config from "../../../../../config";

// *** VIEWS ***
const view = {
    center: {lat: 50.05, lon: 15.15},
    boxRange: 30000
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

const defaultMaxBoxRange = 50000;

const cz_large_data_layer = {
    key: "cz_large_data_layer",
    type: "vector-large",
    options: {
        features: [],
        selected: {
          testSelection: {}
        },
        style: cz_large_data_style,
        pointAsMarker: true,
        fidColumnName: "gid",
        boxRangeRange: [null, defaultMaxBoxRange]
    }
};

const cz_large_data_layers = [cz_large_data_layer];

class LeafletLargeDataLayer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cz_large_data_layers,
            maxBoxRange: defaultMaxBoxRange,
            currentBoxRange: view.boxRange
        };

        this.onLayerClick = this.onLayerClick.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.onViewChange = this.onViewChange.bind(this);
    }

    onViewChange(view) {
        this.setState({
            currentBoxRange: view.boxRange
        });
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

    removeAll() {
        this.populateLayer('cz_large_data_layer', []);
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
                loading: features.length ? [...this.state.loading, "Add data to map"] : ["Remove data"]
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
            <Page title="Leaflet Large Data Layer">
                <div>
                    <div>Current boxRange: {Math.round(this.state.currentBoxRange/1000)} km</div>
                    <div>Maximum boxRange to draw features:</div>
                    <ButtonGroup>
                        <ButtonSwitchOption primary={this.state.maxBoxRange === 20000} onClick={this.onMaxRangeChange.bind(this, 20000)}>20 km</ButtonSwitchOption>
                        <ButtonSwitchOption primary={this.state.maxBoxRange === 50000} onClick={this.onMaxRangeChange.bind(this, 50000)}>50 km</ButtonSwitchOption>
                        <ButtonSwitchOption primary={this.state.maxBoxRange === 100000} onClick={this.onMaxRangeChange.bind(this, 100000)}>100 km</ButtonSwitchOption>
                    </ButtonGroup>
                </div>
                <div style={{height: 500, marginBottom: 10, marginTop: 10}}>
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
                            onViewChange={this.onViewChange}
                        />
                    </HoverHandler>
                </div>
                <Buttons>
                    <Button onClick={this.addData.bind(this,1)}>Add 20 000 points</Button>
                    <Button onClick={this.addData.bind(this,10)}>Add 200 000 points</Button>
                    <Button onClick={this.removeAll}>Remove all data</Button>
                </Buttons>
                {this.state.loading && this.state.loading.map((step, i) => <div key={i}>{step}</div>)}
            </Page>
        );
    }
}

export default LeafletLargeDataLayer;