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
import {ReactLeafletMap} from "@gisatcz/ptr-maps";
import {HoverHandler} from "@gisatcz/ptr-core";
import {Link} from "@gisatcz/ptr-state";
import cz_gadm from "../../../../mockData/map/czGadm1WithStyles/geometries.json";
import pointData from "../../../../mockData/map/largePointData/geometries.json";
import pointStyle from "../../../../mockData/map/largePointData/style-simple-point.json";
import nuts_2 from "../../../../mockData/map/nuts_2.json";

// *** VIEWS ***
const view = {
    center: {lat: 50, lon: 15},
    boxRange: 2000000
};

const viewEurope = {
    center: {lat: 50, lon: 15},
    boxRange: 7000000
};

const viewLargeData = {
    center: {lat: 50.2, lon: 15.8},
    boxRange: 50000
};

const viewHradec = {
    center: {lat: 50.2, lon: 15.8},
    boxRange: 100000
};

const backgroundLayer = {
    key: 'background-osm',
    type: 'wmts',
    options: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
};




// *** POLYGONS ***
// Basic polygon layer
const polygons = {
    key: "gadm-1-cz",
    type: "vector",
    options: {
        features: cz_gadm.features,
        fidColumnName: "GID_1"
    }
};

// Basic polygon layer with selected features
const polygonsWithSelection = {
    key: "polygons-with-selection",
    type: "vector",
    options: {
        features: cz_gadm.features,
        selected: {
            "testSelection": {
                keys: ["CZE.12_1"]
            }
        },
        fidColumnName: "GID_1"
    }
};

// Choropleth
const choroplethStyle = {rules: [{
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
}]};

const choropleth = {
    key: "choropleth",
    type: "vector",
    options: {
        features: nuts_2.features,
        style: choroplethStyle,
        selected: {
            "testSelection": {
                keys: []
            }
        },
        fidColumnName: "id"
    }
};

const basicPolygonLayers = [polygons];
const basicPolygonLayersWithSelection = [polygonsWithSelection];
const choroplethLayers = [choropleth]




// *** POINTS ***
// Vector layer - hundreds of points - size independent of zoom
const pointsStyle = pointStyle.data.definition;
const pointsInPx = {
    key: "point-data-layer",
    type: "vector",
    options: {
        features: pointData.features,
        style: pointsStyle,
        pointAsMarker: true,
        fidColumnName: "gid"
    }
};

// Vector layer - hundreds of points - size in meters
let pointsInMetersStyle = _.cloneDeep(pointsStyle);
pointsInMetersStyle.rules[0].styles[2].attributeScale.size.outputInterval = [500, 2000];
const pointsInMeters = {
    key: "point-data-layer-2",
    type: "vector",
    options: {
        features: pointData.features,
        style: pointsInMetersStyle,
        fidColumnName: "gid"
    }
};


const pointsInPxLayers = [pointsInPx];
const pointsInMetersLayers = [pointsInMeters];

// Shapes
const shapesStyle = {
    "rules":[
        {
            "styles": [
                {
                    "fillOpacity": 0.85,
                    "outlineWidth": 1
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
                }, {
                    "attributeKey": "attr3",
                    "attributeScale": {
                        "size": {
                            "inputInterval": [0,1],
                            "outputInterval": [5,20]
                        }
                    }
                },{
                    "attributeKey": "attr2",
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

const shapes = {
    key: "shapes",
    type: "vector",
    options: {
        features: pointData.features,
        style: shapesStyle,
        pointAsMarker: true,
        fidColumnName: "gid"
    }
};

const shapeLayers = [shapes];



class LeafletVectorLayer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            basicPolygonLayersWithSelection,
            choroplethLayers
        }

        this.onLayerClick = this.onLayerClick.bind(this);
    }

    onLayerClick(map, layer, features) {
        if (map === 'basic-polygon-selection') {
            let updatedLayers = [{
               ...polygonsWithSelection,
               options: {
                   ...polygonsWithSelection.options,
                   selected: {
                       ...polygonsWithSelection.options.selected,
                       testSelection: {
                           ...polygonsWithSelection.options.selected.testSelection,
                           keys: features
                       }
                   }
               }
            }];

            this.setState({
                basicPolygonLayersWithSelection: updatedLayers
            })
        } else if (map === 'choropleth-map') {
            let updatedLayers = [{
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
                choroplethLayers: updatedLayers
            })
        }
    }

    render() {
        return (
            <Page title="Leaflet Vector layer">
                <p>Use this type of layer to display analytical units, for interactive layers or choropleths. It works well for layers with hundreds of polygon features or thousands of point features.</p>

                <p>VectorLayer component is always used inside ReactLeafletMap component. The data are passed via layers prop (see <Link to="/components/maps/map">Map</Link> documentation), where each layer is represented by Vector layer data type. For general information about Vector layer system data type, see <Link to="/architecture/systemDataTypes/layers#vector">Layers</Link> section.</p>

                <p>In case of Leaflet Vector layer, following options can be added to Vector layer data type definition:</p>
                <SyntaxHighlighter language="javascript">
                    {
                        `{
    // ...
	options: {
		// ...
		pointAsMarker: true //point features will be displayed as markers (with fixed size i pixels)
	}
}`
                    }
                </SyntaxHighlighter>

                <h2 id="polygons">Polygon layer</h2>
                <h3>Basic</h3>
                <p>Basic usage with default style.</p>
                <SyntaxHighlighter language="jsx">{`<ReactLeafletMap
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
                        mapKey='basic-usage'
                        view={view}
                        backgroundLayer={backgroundLayer}
                        layers={basicPolygonLayers}
                    />
                </div>

                <h3>With popups and selection</h3>
                <p>Move cursor over area to see the popup. Click on the area to select it.</p>
                <SyntaxHighlighter language="jsx">{`<HoverHandler
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
                selected: {
                    "testSelection": {
                        keys: ["CZE.12_1"]
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
                        popupContentComponent={
                            (props) => <b>{props.data["NAME_1"]}</b>
                        }
                    >
                        <ReactLeafletMap
                            mapKey='basic-polygon-selection'
                            view={view}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.basicPolygonLayersWithSelection}
                            onLayerClick={this.onLayerClick}
                        />
                    </HoverHandler>
                </div>

                <h3>Choropleth with hundreds of polygons</h3>
                <p>Move cursor over area to see the popup. Click on the area to select it.</p>
                <SyntaxHighlighter language="jsx">{`<HoverHandler
    popupContentComponent={
        (props) => {
            return (<><b>{props.data["id"]}</b>: {props.data["diverging_attr"].toFixed(2)}</>);
        }
    }
>
    <ReactLeafletMap
        //...
        style: {
            {rules: [{
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
            }]}
        }
    />
</HoverHandler>`}
                </SyntaxHighlighter>
                <div style={{height: 500, marginBottom: 10}}>
                    <HoverHandler
                        popupContentComponent={
                            (props) => {
                                return (<><b>{props.data["id"]}</b>: {props.data["diverging_attr"].toFixed(2)}</>);
                            }
                        }
                    >
                        <ReactLeafletMap
                            mapKey='choropleth-map'
                            view={viewEurope}
                            backgroundLayer={backgroundLayer}
                            layers={this.state.choroplethLayers}
                            onLayerClick={this.onLayerClick}
                        />
                    </HoverHandler>
                </div>

                <h2 id="points">Points</h2>
                <h3>Render as markers - size in pixels</h3>
                <p>Try to zoom in and out. The size of circle is the same for each zoom level (independent of zoom) and varies between 5 and 20 px.</p>
                <div style={{height: 500, marginBottom: 10}}>
                    <HoverHandler
                        popupContentComponent={
                            (props) => {
                                return (<p>Value: {props.data["attr1"]}</p>);
                            }
                        }
                    >
                        <ReactLeafletMap
                            mapKey='react-leaflet-map-3'
                            view={viewHradec}
                            backgroundLayer={backgroundLayer}
                            layers={pointsInPxLayers}
                        />
                    </HoverHandler>
                </div>

                <p>Markers can have different shapes. Currently, circle, square and diamond is implemented.</p>
                <div style={{height: 500, marginBottom: 10}}>
                    <HoverHandler
                        popupContentComponent={
                            (props) => {
                                return (<p>
                                    Color: {props.data["attr1"]}<br/>
                                    Shape: {props.data["attr2"]}<br/>
                                    Size: {props.data["attr3"]}
                                </p>);
                            }
                        }
                    >
                        <ReactLeafletMap
                            mapKey='react-leaflet-map-3'
                            view={viewHradec}
                            backgroundLayer={backgroundLayer}
                            layers={shapeLayers}
                        />
                    </HoverHandler>
                </div>

                <h3>Size in meters</h3>
                <p>Try to zoom in and out. The size of circle is in meters and varies between 500 and 2000 meters.</p>
                <div style={{height: 500, marginBottom: 10}}>
                    <HoverHandler
                        popupContentComponent={
                            (props) => {
                                return (<p>Value: {props.data["attr1"]}</p>);
                            }
                        }
                    >
                        <ReactLeafletMap
                            mapKey='react-leaflet-map-4'
                            view={viewHradec}
                            backgroundLayer={backgroundLayer}
                            layers={pointsInMetersLayers}
                        />
                    </HoverHandler>
                </div>

            </Page>
        );
    }
}

export default LeafletVectorLayer;