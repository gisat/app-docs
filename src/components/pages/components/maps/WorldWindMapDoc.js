import React from 'react';
import _ from "lodash";
import Page, {DocsToDo, DocsToDoInline, InlineCodeHighlighter, LightDarkBlock, SyntaxHighlighter} from "../../../Page";
import {WorldWindMap} from "@gisatcz/ptr-maps";
import cz_gadm from "../../../mockData/map/czGadm1WithStyles/geometries";
import style from "../../../mockData/map/czGadm1WithStyles/style";
import pointData from "../../../mockData/map/largePointData/geometries";
import largePointDataFeatures from "../../../mockData/map/largePointData/sample_points_10000_mini";
import pointStyle from "../../../mockData/map/largePointData/style-simple-point";

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 2000000
};

const viewLargeData = {
	center: {lat: 50, lon: 15},
	boxRange: 1000000
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

// WMS layer
const cuzk = {
	key: 'cuzk_ortofoto',
	name: 'CUZK Ortofoto',
	type: 'wms',
	options: {
		url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
		params: {
			layers: 'GR_ORTFOTORGB'
		}
	}
};

// Vector layer - polygons
const czGadm = {
	key: "gadm-1-cz",
	type: "vector",
	options: {
		features: cz_gadm.features,
		style: style.data.definition
	}
};

// Vector layer - hundreds of points - size independent of zoom
const pointsStyle = pointStyle.data.definition;
const points = {
	key: "point-data-layer",
	type: "vector",
	options: {
		features: pointData.features,
		style: pointsStyle
	}
};

// Vector layer - 10 000 points
const largeDataLayer = {
	key: "large-data-layer",
	type: "vector",
	options: {
		features: largePointDataFeatures,
		style: pointsStyle
	}
};

const map2Layers = [cuzk, czGadm];
const map3Layers = [points];
const map5Layers = [largeDataLayer];

// Large data

class WorldWindMapDoc extends React.PureComponent {
	render() {
		return (
			<Page title="WorldWindMap">
				<h2>Basic</h2>
				<p>Basic settings with defined view and background layer.</p>
				<div style={{height: 500, marginBottom: 10}}>
					<WorldWindMap
						view={view}
						backgroundLayer={backgroundLayer}
					/>
				</div>
				<SyntaxHighlighter language="jsx">{`<WorldWindMap
	view={
		center: {lat: 50, lon: 15},
		boxRange: 2000000
	}
	backgroundLayer={
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}
/>
`}
				</SyntaxHighlighter>

				<h2>With WMS and vector layer</h2>
				<div style={{height: 500, marginBottom: 10}}>
					<WorldWindMap
						view={view}
						backgroundLayer={backgroundLayer}
						layers={map2Layers}
					/>
				</div>
				<SyntaxHighlighter language="jsx">{`<WorldWindMap
	view={
		center: {lat: 50, lon: 15},
		boxRange: 2000000
	}
	backgroundLayer={
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}
	layers={[
		{
			key: 'cuzk_ortofoto',
			name: 'CUZK Ortofoto',
			type: 'wms',
			options: {
				url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
				params: {
					layers: 'GR_ORTFOTORGB'
				}
			}
		}, {
			key: "gadm-1-cz",
			type: "vector",
			options: {
				features: [...],
				style: {...} //see Style documentation
			}
		}
	]}
/>
`}
				</SyntaxHighlighter>

				<h2>Point data</h2>
				<div style={{height: 500, marginBottom: 10}}>
					<WorldWindMap
						view={viewHradec}
						backgroundLayer={backgroundLayer}
						layers={map3Layers}
					/>
				</div>

				<h2>Point data - 10 000 of points</h2>
				<div style={{height: 500, marginBottom: 10}}>
					<WorldWindMap
						view={viewLargeData}
						backgroundLayer={backgroundLayer}
						layers={map5Layers}
					/>
				</div>

			</Page>
		);
	}
}

export default WorldWindMapDoc;