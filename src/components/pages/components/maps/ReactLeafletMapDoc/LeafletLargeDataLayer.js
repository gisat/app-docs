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

import cz_10000 from '../../../../mockData/largeData/cz_10000.json';
import pointStyle from "../../../../mockData/map/largePointData/style-simple-point.json";
import pointData from "../../../../mockData/map/largePointData/geometries.json";
import {ReactLeafletMap, PresentationMap} from "@gisatcz/ptr-maps";
import {HoverHandler} from "@gisatcz/ptr-core";
import {Button, Buttons} from "@gisatcz/ptr-atoms";

const cz_10000_features = cz_10000.features;

// *** VIEWS ***
const view = {
    center: {lat: 50.05, lon: 15.15},
    boxRange: 100000
};

const backgroundLayer = {
    key: 'background-osm',
    type: 'wmts',
    options: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
};

// *** POINTS ***
const cz_10000_style = {
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
                }
            ]
        }
    ]
}

const cz_10000_layer = {
    key: "cz_10000_layer",
    type: "vector-large",
    options: {
        features: [],
        selected: {
          testSelection: {}
        },
        style: cz_10000_style,
        pointAsMarker: true,
        fidColumnName: "gid",
        maxBoxRange: 200000
    }
};

const cz_10000_layers = [cz_10000_layer];

class LeafletLargeDataLayer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {cz_10000_layers};

        this.onLayerClick = this.onLayerClick.bind(this);
        this.addAll = this.addAll.bind(this);
        this.removeAll = this.removeAll.bind(this);
    }

    onLayerClick(map, layer, features) {
        if (layer === 'cz_10000_layer') {
            let updatedLayers = [{
                ...this.state.cz_10000_layers[0],
                options: {
                    ...this.state.cz_10000_layers[0].options,
                    selected: {
                        ...this.state.cz_10000_layers[0].options.selected,
                        testSelection: {
                            ...this.state.cz_10000_layers[0].options.selected.testSelection,
                            keys: features
                        }
                    }
                }
            }];

            this.setState({
                cz_10000_layers: updatedLayers
            })
        }
    }

    addAll() {
        this.populateLayer('cz_10000_layer', cz_10000_features);
    }

    addAllPerPartes(amount, step, speed) {
        if (!step) {
            step = amount;
        }

        let features = cz_10000_features.slice(0, amount - 1);
        this.populateLayer('cz_10000_layer', features);

        if (amount <= cz_10000_features.length) {
            const self = this;
            setTimeout(() => {
                self.addAllPerPartes(amount + step, step, speed);
            }, speed);
        }
    }

    removeAll() {
        this.populateLayer('cz_10000_layer', []);
    }

    populateLayer(layer, features) {
        if (layer === 'cz_10000_layer') {
            let updatedLayers = [{
                ...cz_10000_layer,
                options: {
                    ...cz_10000_layer.options,
                    features
                }
            }];

            this.setState({
                cz_10000_layers: updatedLayers
            })
        }
    }

    render() {
        return (
            <Page title="Leaflet Large Data Layer">
                <div style={{height: 500, marginBottom: 10}}>
                    <HoverHandler
                        popupContentComponent={
                            (props) => <>
                                Value for color: <b>{props.data["a1"]}</b><br/>
                                Value for shape: <b>{props.data["a2"]}</b>
                            </>
                        }
                    >
                        <PresentationMap
                            mapComponent={ReactLeafletMap}
                            mapKey='large-data'
                            view={view}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.cz_10000_layers}
                            onLayerClick={this.onLayerClick}
                        />
                    </HoverHandler>
                </div>
                <Buttons>
                    <Button onClick={this.addAll}>Add all data at once</Button>
                    <Button onClick={this.addAllPerPartes.bind(this, 1000, 1000, 100)}>Add all data per partes</Button>
                    <Button onClick={this.removeAll}>Remove all data</Button>
                </Buttons>
            </Page>
        );
    }
}

export default LeafletLargeDataLayer;