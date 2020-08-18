import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import {WorldWindMap, ReactLeafletMap} from "@gisatcz/ptr-maps";
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

class TileGridDoc extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.onResize = this.onResize.bind(this);
		this.onViewChange = this.onViewChange.bind(this);
		this.updateMap = this.updateMap.bind(this);
        
        this.state = {
            map1: {
                width: null,
				height: null,
				activeLevel: 0,
				geojsonTileGrid: {},
				...view
            }
        }
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
		const level = grid.getLevelByViewport(mapUpdate.boxRange, viewportRange);
		const center = [mapUpdate.center.lon, mapUpdate.center.lat];
		const bufferCoefficient = Math.max((mapUpdate.width / mapUpdate.height) * 2, 1);
		const extent = utils.getExtentAroundCoortinates(viewportRange, level, center, undefined, bufferCoefficient);
		const tileGrid = grid.getGridForLevelAndExtent(level, extent);
		const size = utils.getGridSizeForLevel(level);

		//consider caching levels
		const geojsonTileGrid = utils.getTileGridAsGeoJSON(tileGrid, size);
		mapUpdate.geojsonTileGrid[level] = geojsonTileGrid;
		
        this.setState({map1: {...mapUpdate, level, tileGrid}});
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
		

		return (
			<Page title="WorldWindMap">
				<p>@gisatcz/ptr-tile-grid is utility for work with wgs tileset. <a href={'https://github.com/gisat-panther/ptr-tile-grid'} target={'_blank'} rel="noopener noreferrer">https://github.com/gisat-panther/ptr-tile-grid</a></p>
				<div className={"ptr-maps-wrapper"}>
					<div className={"ptr-maps-wrapper-map"}>
						<h3 id="wms">WorldWindMap with tile grid</h3>
						<div style={{height: 600, marginBottom: 10}}>
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
										layers={[gridLayer]}
										/>
								</HoverHandler>
							</ReactResizeDetector>
						</div>
					{/* </div>
					<div className={"ptr-maps-wrapper-map"}> */}
						<h3 id="wms">Leaflet with tile grid</h3>
						<div style={{height: 600, marginBottom: 10}}>
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
										layers={[gridLayer]}
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