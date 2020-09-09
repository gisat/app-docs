import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import mapUtils,{WorldWindMap, ReactLeafletMap} from "@gisatcz/ptr-maps";
import {grid, utils} from "@gisatcz/ptr-tile-grid";
import {HoverHandler} from "@gisatcz/ptr-core";
import Page, {SyntaxHighlighter} from "../../../../Page";

import './style.css';

const view = {
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

	getBoxRangeRelatedToZoom(width, height, boxRange) {
		const zoom = mapUtils.view.getZoomLevelFromBoxRange(boxRange, width, height);
		const newBoxRange = mapUtils.view.getBoxRangeFromZoomLevel(zoom, width, height);
		return newBoxRange;
	}

	componentDidMount() {
		const map1Bounds = this.map1Ref.current.getBoundingClientRect();
		const width = map1Bounds.width;
		const height = map1Bounds.height;
		const boxRange = this.getBoxRangeRelatedToZoom(width, height, view.boxRange);

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

		const viewportRange = this.getMapViewportRange(mapUpdate);
		const boxRange = this.getBoxRangeRelatedToZoom(mapUpdate.width, mapUpdate.height, mapUpdate.boxRange);
		const level = grid.getLevelByViewport(boxRange, viewportRange);
		const center = [mapUpdate.center.lon, mapUpdate.center.lat];
		const ratio =  mapUpdate.width / mapUpdate.height;
		const extent = utils.getExtentAroundCoordinates(center, mapUpdate.boxRange, ratio, 50);
		const tileGrid = grid.getGridForLevelAndExtent(level, extent);
		// todo 
		// add buffer for leveles bigger than 5
		const size = utils.getGridSizeForLevel(level);

		//consider caching levels
		const geojsonTileGrid = utils.getTileGridAsGeoJSON(tileGrid, size);
		mapUpdate.geojsonTileGrid[level] = geojsonTileGrid;
		const geoJSONextent = getGeoJSONFromExtent(extent);
        this.setState({map1: {...mapUpdate, level, tileGrid, extent: geoJSONextent}});
	}

    onViewChange(view) {
		this.updateMap({center: view.center, boxRange: view.boxRange});
    }

    onResize(width, height) {
		this.updateMap({width, height});
	}

	getMapViewportRange(map) {
		return Math.min(map.height, map.width)
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