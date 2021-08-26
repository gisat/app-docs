import React from 'react';
import {cloneDeep as _cloneDeep} from 'lodash';
import Page, {
	ImplementationToDo,
	InlineCodeHighlighter,
	SyntaxHighlighter,
} from '../../../../Page';
import {DeckGlMap} from '@gisatcz/ptr-maps';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';
import {Link} from 'react-router-dom';

import largePointDataFeatures from '../../../../mockData/map/largePointData/sample_points_5000_mini.json';

const wmtsView = {
	center: {lat: 50, lon: 15},
	boxRange: 400000,
};

const pointsView = {
	center: {lat: 50.35, lon: 15.8},
	boxRange: 10000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

const pointStyle = {
	rules: [
		{
			styles: [
				{
					fill: '#cccccc',
					fillOpacity: 0.85,
					outlineColor: '#555555',
					outlineWidth: 1,
					outlineOpacity: 1,
					size: 1000,
				},
				{
					attributeKey: 'attr1',
					attributeClasses: [
						{
							fill: '#b1001d',
							interval: [0, 30],
							intervalBounds: [true, false],
						},
						{
							fill: '#ffff00',
							interval: [30, 70],
							intervalBounds: [true, false],
						},
						{
							fill: '#50d48e',
							interval: [70, 100],
							intervalBounds: [true, false],
						},
					],
				},
			],
		},
	],
};

const pointAsMarkerStyle = _cloneDeep(pointStyle);
pointAsMarkerStyle.rules[0].styles[0].size = 40;

const pointLayer = {
	key: 'points',
	type: 'vector',
	options: {
		features: largePointDataFeatures,
		style: pointStyle,
		fidColumnName: 'gid',
	},
};

const pointAsMarkerLayer = {
	key: 'points',
	type: 'vector',
	options: {
		features: largePointDataFeatures,
		style: pointAsMarkerStyle,
		pointAsMarker: true,
		fidColumnName: 'gid',
	},
};

class DeckGlMapDoc extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Page title="DeckGlMap">
				<p></p>

				<h2 id="props">Props</h2>
				<p>
					Bellow are listed specific props for DeckGlMap. Other props are common
					to all maps (
					<Link to="/components/maps/map">see Map documentation</Link>).
				</p>
				<ComponentPropsTable>
					<Prop name="Tooltip" type="React.Component">
						Component to render as a map tooltip.
					</Prop>
				</ComponentPropsTable>

				<h2>Layers</h2>
				<p>
					Layer component is always used inside ReactLeafletMap component. The
					data are passed via layers prop (see{' '}
					<Link to="/components/maps/map">Map</Link> documentation), where each
					layer is represented by specific layer data type. For general
					information about layer system data type, see{' '}
					<Link to="/architecture/systemDataTypes/layers">Layers</Link> in
					System data types section.
				</p>

				<p>
					It is possible to use following layer types inside ReactLeafletMap
					component:
				</p>
				<ul className="ptr-docs-basic-list">
					<li>
						<Link to="#wmts">WMTS layer</Link>
					</li>
					<li>
						<Link to="#vector">Vector layer</Link>
					</li>
				</ul>

				<h3 id="wmts">WMTS layer</h3>
				<p>Typical usage of WMTS layer as background.</p>
				<div style={{height: 400, marginBottom: 10}}>
					<DeckGlMap view={wmtsView} backgroundLayer={backgroundLayer} />
				</div>
				<SyntaxHighlighter language="jsx">
					{`<DeckGlMap
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 400000
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
/>
`}
				</SyntaxHighlighter>

				<h3 id="vector">Vector layer</h3>
				<ImplementationToDo>
					Currently, only points are implemented
				</ImplementationToDo>

				<h4>Points</h4>
				<p>The points retain their geographical dimension (in meters).</p>
				<div style={{height: 400, marginBottom: 10}}>
					<DeckGlMap
						view={pointsView}
						backgroundLayer={backgroundLayer}
						layers={[pointLayer]}
					/>
				</div>
				<SyntaxHighlighter language="jsx">
					{`<DeckGlMap
	view={{
		center: {lat: 50.35, lon: 15.8},
		boxRange: 10000
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
	layers={[
		key: 'points',
		type: 'vector',
		options: {
			features: largePointDataFeatures,
			style: pointStyle,
			fidColumnName: 'gid'
		},
	]}
/>
`}
				</SyntaxHighlighter>

				<h4>Points as markers</h4>
				<p>The points retain their dimension on screen (in pixels).</p>
				<div style={{height: 400, marginBottom: 10}}>
					<DeckGlMap
						view={pointsView}
						backgroundLayer={backgroundLayer}
						layers={[pointAsMarkerLayer]}
					/>
				</div>
				<SyntaxHighlighter language="jsx">
					{`<DeckGlMap
	view={{
		center: {lat: 50.35, lon: 15.8},
		boxRange: 10000
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
	layers={[
		key: 'points',
		type: 'vector',
		options: {
			features: largePointDataFeatures,
			style: pointStyleAsMarkers,
			fidColumnName: 'gid',
			pointAsMarker: true
		},
	]}
/>
`}
				</SyntaxHighlighter>

				<h3 id="tooltip">Tooltip</h3>
			</Page>
		);
	}
}

export default DeckGlMapDoc;
