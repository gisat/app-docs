import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import {view as viewUtils, WorldWindMap, ReactLeafletMap} from "@gisatcz/ptr-maps";
import {utils as tileGridUtils, grid} from "@gisatcz/ptr-tile-grid";
import {map as mapUtils} from '@gisatcz/ptr-utils';
import {HoverHandler} from "@gisatcz/ptr-core";
import Page, {SyntaxHighlighter} from "../../../../Page";

import './style.css';

const view = {
	center: {lat: 51, lon: 13},
	boxRange: 200000000000
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
	}
};


// With style
const polygonsStyle = {
    "rules":[
        {
            "styles":[
                {
                    "fill": "#d2d2d2",
                    "fillOpacity": 0.5,
					"outlineColor": "#262626",
					"outlineWidth": 1,
                }
            ]
        }
    ]
}

const extentStyle = {
    "rules":[
        {
            "styles":[
                {
					"outlineColor": "#ff0000",
					"outlineWidth": 2,
                }
            ]
        }
    ]
}

const getGeoJSONFromExtent = (extent) => {
	const nodes = 5;
	const coordsInner = new Array(nodes).fill(null);
	const coordsInnerFill = coordsInner.map((v, i) => {
		switch (i) {
			case 0:
				return [extent[0][0], extent[0][1]];
			case 1:
				return [extent[0][0], extent[1][1]];
			case 2:
				return [extent[1][0], extent[1][1]];
			case 3:
				return [extent[1][0], extent[0][1]];
			case 4:
				return [extent[0][0], extent[0][1]];
		}
	})
	const feature = {
		"type": "FeatureCollection",
		"features": [{
			"type": "Feature",
			"properties": {},
			"geometry": {
			"type": "Polygon",
			"coordinates": [coordsInnerFill]
			}
		  }]
	};
	return feature;
}

class TileGridDoc extends React.PureComponent {
	constructor(props) {
		super(props);
		this.map1Ref = React.createRef();
		this.map2Ref = React.createRef();

		this.onResize = this.onResize.bind(this);
		this.onViewChange = this.onViewChange.bind(this);
		this.updateMap = this.updateMap.bind(this);
        
        this.state = {
            map1: {
                width: null,
				height: null,
				activeLevel: 0,
				geojsonTileGrid: {},
				extent: {features:[]},
				...view
            }
        }
	}

	componentDidMount() {
		const map1Bounds = this.map1Ref.current.getBoundingClientRect();
		const width = map1Bounds.width;
		const height = map1Bounds.height;
		const boxRange = mapUtils.view.getNearestZoomLevelBoxRange(view.boxRange, width, height);

		this.updateMap({
			width,
			height,
			boxRange,
		})
	}

	updateMap(map) {
		const mapUpdate = {
			...this.state.map1,
			width: map.width || this.state.map1.width,
			height: map.height || this.state.map1.height,
			boxRange: map.boxRange || this.state.map1.boxRange,
			center: {
				...this.state.map1.center,
				...map.center,
			}
		};

		const viewportRange = mapUtils.view.getMapViewportRange(mapUpdate.width, mapUpdate.height);
		const boxRange = mapUtils.view.getNearestZoomLevelBoxRange(mapUpdate.width, mapUpdate.height, mapUpdate.boxRange);
		const level = grid.getLevelByViewport(boxRange, viewportRange);
		const center = [mapUpdate.center.lon, mapUpdate.center.lat];
		const ratio =  mapUpdate.width / mapUpdate.height;
		const extent = tileGridUtils.getExtentAroundCoordinates(center, boxRange, ratio, 50, true);
		const tileGrid = grid.getTileGrid(mapUpdate.width, mapUpdate.height, boxRange, [mapUpdate.center.lon, mapUpdate.center.lat], true);
		// // todo 
		// // add buffer for leveles bigger than 5
		const size = tileGridUtils.getGridSizeForLevel(level);

		// //consider caching levels
		const geojsonTileGrid = tileGridUtils.getTileGridAsGeoJSON(tileGrid, size);
		mapUpdate.geojsonTileGrid[level] = geojsonTileGrid;
		const geoJSONextent = getGeoJSONFromExtent(extent);
        this.setState({map1: {...mapUpdate, level, tileGrid, extent: geoJSONextent}});
	}

    onViewChange(view) {
		let update = {center: view.center, boxRange: view.boxRange};
		this.updateMap(update);
    }

    onResize(width, height) {
		this.updateMap({width, height});
	}

	render() {
		const mergedView = {...view, center: {...view.center, ...this.state.map1.center}, boxRange: this.state.map1.boxRange || view.boxRange};

		const gridLayer = {
			key: "tileGrid",
			type: "vector",
			options: {
				features: this.state.map1.geojsonTileGrid && this.state.map1.geojsonTileGrid[this.state.map1.level] ? this.state.map1.geojsonTileGrid[this.state.map1.level].features : [],
				style: polygonsStyle,
				selected: {
					"testSelection": {
						keys: []
					}
				},
				fidColumnName: "id"
			}
		};
		
		const extentLayer = {
			key: "polygons-with-selection",
			type: "vector",
			options: {
				features: this.state.map1.extent.features,
				style: extentStyle,
			}
		}

		return (
			<Page title="WorldWindMap">
				<p>@gisatcz/ptr-tile-grid is utility for work with wgs tileset. <a href={'https://github.com/gisat-panther/ptr-tile-grid'} target={'_blank'} rel="noopener noreferrer">https://github.com/gisat-panther/ptr-tile-grid</a></p>
				<div className={"ptr-maps-wrapper"}>
					<div className={"ptr-maps-wrapper-map"}>
						<h3 id="wms">WorldWindMap with tile grid</h3>
						<div style={{height: 600, marginBottom: 10}} ref={this.map1Ref}>
							<ReactResizeDetector
									onResize = {this.onResize}
									handleWidth
									handleHeight>                
								<HoverHandler>
									<WorldWindMap
										onViewChange={this.onViewChange}
										mapKey="www-tilegrid"
										view={mergedView}
										backgroundLayer={backgroundLayer}
										layers={[gridLayer, extentLayer]}
										/>
								</HoverHandler>
							</ReactResizeDetector>
						</div>
					{/* </div>
					<div className={"ptr-maps-wrapper-map"}> */}
						<h3 id="wms">Leaflet with tile grid</h3>
						<div style={{height: 600, marginBottom: 10}} ref={this.map2Ref}>
							<ReactResizeDetector
									onResize = {this.onResize}
									handleWidth
									handleHeight>                
								<HoverHandler>
									<ReactLeafletMap
										onViewChange={this.onViewChange}
										mapKey="leaflet-tilegrid"
										view={mergedView}
										backgroundLayer={backgroundLayer}
										layers={[gridLayer, extentLayer]}
									/>
								</HoverHandler>
							</ReactResizeDetector>
						</div>
					</div>
				</div>
			</Page>
		);
	}
}

export default TileGridDoc;