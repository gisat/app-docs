import React from 'react';
import Page, {
	DocsToDo,
	InlineCodeHighlighter,
	SyntaxHighlighter,
} from '../../../../Page';
import {
	PresentationMap,
	MapControls,
	MapScale,
	WorldWindMap,
	ReactLeafletMap,
	DeckGlMap,
	MapSet,
	MapSetPresentationMap,
} from '@gisatcz/ptr-maps';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';

const view = {
	center: {lat: 50, lon: 14},
	boxRange: 64000,
};

const osm = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	},
};

const cartoDark = {
	key: 'cartoDark',
	type: 'wmts',
	options: {
		url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
	},
};

class MapScaleDocs extends React.PureComponent {
	render() {
		return (
			<Page title="Map scale">
				<div
					className="ptr-light"
					style={{height: 300, width: 500, marginBottom: 10}}
				>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						backgroundLayer={osm}
						view={view}
					>
						<MapScale />
					</PresentationMap>
				</div>
				<p>Zoom in/out the map to see scale behaviour.</p>
				<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="maxWidth" defaultValue="false" type="numeric">
						Maximal width of scale bar
					</Prop>
					<Prop name="className" defaultValue="false" type="string">
						Custom class names
					</Prop>
				</ComponentPropsTable>

				<h2>Examples</h2>
				<h3>Default state</h3>

				<SyntaxHighlighter language="jsx">
					{`import {DeckGlMap, MapControls, MapScale, PresentationMap} from "@gisatcz/ptr-maps";
	<PresentationMap
		mapComponent={DeckGlMap}
		backgroundLayer={{
			key: 'background-osm',
			type: 'wmts',
			options: {
				url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			}
		}}
		view={{
			center: {lat: 50, lon: 14},
			boxRange: 64000
		}}
	>
		<MapScale />
		<MapControls zoomOnly levelsBased />
	</PresentationMap>`}
				</SyntaxHighlighter>
				<div style={{height: 300, margin: 5}}>
					<PresentationMap
						mapComponent={DeckGlMap}
						backgroundLayer={osm}
						view={view}
					>
						<MapScale />
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>

				<h3>Custom class name & maxWidth</h3>
				<p>
					You can pass custom{' '}
					<InlineCodeHighlighter>className</InlineCodeHighlighter> to style the
					scale bar. In the example below, there is shown the usage of scale's
					dark variant.
				</p>
				<p>
					Another option you have is to pass the{' '}
					<InlineCodeHighlighter>maxWidth</InlineCodeHighlighter> prop to
					restrict scale bar's width.
				</p>

				<SyntaxHighlighter language="jsx">
					{`import {DeckGlMap, MapControls, MapScale, PresentationMap} from "@gisatcz/ptr-maps";
	<PresentationMap
		mapComponent={DeckGlMap}
		backgroundLayer={{
			key: 'cartoDark',
			type: 'wmts',
			options: {
				url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
			}
		}}
		view={{
			center: {lat: 50, lon: 14},
			boxRange: 64000
		}}
	>
		<MapScale maxWidth={300} className="ptr-dark" />
		<MapControls zoomOnly levelsBased />
	</PresentationMap>`}
				</SyntaxHighlighter>
				<div style={{height: 300, margin: 5}}>
					<PresentationMap
						mapComponent={DeckGlMap}
						backgroundLayer={cartoDark}
						view={view}
					>
						<MapScale maxWidth={300} className="ptr-dark" />
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>

				<h3>Map set usage</h3>

				<SyntaxHighlighter language="jsx">
					{`import {DeckGlMap, MapControls, MapScale, MapSet, MapSetPresentationMap} from "@gisatcz/ptr-maps";
<MapSet
	activeMapKey="mapDeck-2"
	mapComponent={DeckGlMap}
	view={view}
	sync={{
		boxRange: true,
		center: true,
	}}
	backgroundLayer={osm}
>
	<MapSetPresentationMap mapKey="mapDeck-1" />
	<MapSetPresentationMap mapKey="mapDeck-2" />
	<MapSetPresentationMap mapKey="mapDeck-3" />
	<MapControls levelsBased zoomOnly />
	<MapScale />
</MapSet>`}
				</SyntaxHighlighter>

				<div style={{height: 300}}>
					<MapSet
						activeMapKey="mapDeck-2"
						mapComponent={DeckGlMap}
						view={view}
						sync={{
							boxRange: true,
							center: true,
						}}
						backgroundLayer={osm}
					>
						<MapSetPresentationMap mapKey="mapDeck-1" />
						<MapSetPresentationMap mapKey="mapDeck-2" />
						<MapSetPresentationMap mapKey="mapDeck-3" />
						<MapControls levelsBased zoomOnly />
						<MapScale />
					</MapSet>
				</div>
			</Page>
		);
	}
}

export default MapScaleDocs;
