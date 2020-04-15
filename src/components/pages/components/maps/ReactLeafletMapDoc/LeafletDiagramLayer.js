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
import {MapControls, PresentationMap, ReactLeafletMap} from "@gisatcz/ptr-maps";
import ComponentPropsTable, {Prop} from "../../../../ComponentPropsTable/ComponentPropsTable";
import cz_gadm from "../../../../mockData/map/czGadm1WithStyles/geometries.json";
import style from "../../../../mockData/map/czGadm1WithStyles/style.json";
import pointData from "../../../../mockData/map/largePointData/geometries.json";
import largePointDataFeatures from "../../../../mockData/map/largePointData/sample_points_10000_mini.json";
import pointStyle from "../../../../mockData/map/largePointData/style-simple-point.json";
import {utils} from "@gisatcz/ptr-utils";
import nuts_2 from "../../../../mockData/map/nuts_2.json";

const europeView = {
    center: {lat: 49.8, lon: 12},
    boxRange: 5000000
};

const czView = {
    center: {lat: 49.8, lon: 15},
    boxRange: 2000000
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

// Choropleth and diagrams
const diagramChoroplethStyle = {rules: [{
        styles: [{
            outlineWidth: 1,
            outlineColor: "#666",
            diagramShape: "circle",
            diagramFillOpacity: 1
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

// Large data

class LeafletDiagramLayer extends React.PureComponent {
    render() {
        return (
            <Page title="Leaflet diagram layer">
                <ImplementationToDo>Refactoring, interactivity</ImplementationToDo>

                <h2>Basic diagrams</h2>
                <div style={{height: 500, marginBottom: 10}}>
                    <PresentationMap
                        mapComponent={ReactLeafletMap}
                        backgroundLayer={backgroundLayer}
                        layers={polygonLayers_diagrams}
                        view={czView}
                        mapKey={utils.uuid()}
                    >
                        <MapControls zoomOnly levelsBased/>
                    </PresentationMap>
                </div>


                <h2>Basic diagrams with choropleth</h2>
                <div style={{height: 500, marginBottom: 10}}>
                    <PresentationMap
                        mapComponent={ReactLeafletMap}
                        backgroundLayer={backgroundLayer}
                        layers={polygonLayers_countries}
                        view={europeView}
                        mapKey={utils.uuid()}
                    >
                        <MapControls zoomOnly levelsBased/>
                    </PresentationMap>
                </div>
            </Page>
        );
    }
}

export default LeafletDiagramLayer;