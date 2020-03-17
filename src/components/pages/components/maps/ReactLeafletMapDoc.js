import React from 'react';
import _ from "lodash";
import Page, {DocsToDo, DocsToDoInline, InlineCodeHighlighter, LightDarkBlock, SyntaxHighlighter} from "../../../Page";
import {LeafletMap, ReactLeafletMap} from "@gisatcz/ptr-maps";
import ComponentPropsTable, {Prop} from "../../../ComponentPropsTable/ComponentPropsTable";
import {Link} from "@gisatcz/ptr-state";
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

// Vector layer - hundreds of points - size in meters
let pointsInMetersStyle = _.cloneDeep(pointsStyle);
pointsInMetersStyle.rules[0].styles[2].attributeScale.size.outputInterval = [500, 2000];
const pointsFixedSize = {
	key: "point-data-layer-2",
	type: "vector",
	options: {
		features: pointData.features,
		style: pointsInMetersStyle,
		pointSizeInMeters: true
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
const map4Layers = [pointsFixedSize];
const map5Layers = [largeDataLayer];

// Large data

class ReactLeafletMapDoc extends React.PureComponent {
	render() {
		return (
			<Page title="ReactLeafletMap">
				<h2>Props</h2>
				<p>Bellow are listed specific props for ReactLeafletMap. Other props are common to all maps (<Link to="/components/maps/map">see Map documentation</Link>).</p>
				<ComponentPropsTable>
					<Prop name="mapKey" required type="string">Key required by leaflet to setup a map</Prop>
				</ComponentPropsTable>

				<h2>Basic</h2>
				<p>Basic settings with defined view and background layer.</p>
				<div style={{height: 500, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey='react-leaflet-map'
						view={view}
						backgroundLayer={backgroundLayer}
					/>
				</div>
				<SyntaxHighlighter language="jsx">{`<ReactLeafletMap
	mapKey='react-leaflet-map'
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
					<ReactLeafletMap
						mapKey='react-leaflet-map-2'
						view={view}
						backgroundLayer={backgroundLayer}
						layers={map2Layers}
					/>
				</div>
				<SyntaxHighlighter language="jsx">{`<ReactLeafletMap
	mapKey='react-leaflet-map-2'
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
				<p>Try to zoom in and out. The size of circle is the same for each zoom level (independent of zoom) and varies between 5 and 20 px.</p>
				<div style={{height: 500, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey='react-leaflet-map-3'
						view={viewHradec}
						backgroundLayer={backgroundLayer}
						layers={map3Layers}
					/>
				</div>

				<h2>Point data - size in meters</h2>
				<p>Try to zoom in and out. The size of circle is in meters and varies between 500 and 2000 meters.</p>
				<div style={{height: 500, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey='react-leaflet-map-4'
						view={viewHradec}
						backgroundLayer={backgroundLayer}
						layers={map4Layers}
					/>
				</div>
				<SyntaxHighlighter language="jsx">{`<ReactLeafletMap
	...
	layers={[
		{...},
		{
			key: "gadm-1-cz",
			type: "vector",
			options: {
				pointSizeInMeters: true,
				features: [...],
				style: {...} //see Style documentation
			}
		}
	]}
/>
`}
				</SyntaxHighlighter>

				<h2>Point data - 10 000 of points</h2>
				<div style={{height: 500, marginBottom: 10}}>
					<ReactLeafletMap
						mapKey='react-leaflet-map-5'
						view={viewLargeData}
						backgroundLayer={backgroundLayer}
						layers={map5Layers}
					/>
				</div>

			</Page>
		);
	}
}

export default ReactLeafletMapDoc;