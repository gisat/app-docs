import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';

import Page, {
	ImplementationToDo,
	InlineCodeHighlighter,
	PropertyDescription,
	SyntaxHighlighter,
} from '../../../../Page';
import {Link} from 'react-router-dom';

class VectorLayers extends React.PureComponent {
	render() {
		return (
			<Page title="Vector layers (full format)">
				<p>
					Final format supplied to framework map components as an item of the{' '}
					<Link to="../../../components/maps/map">
						<InlineCodeHighlighter>layers</InlineCodeHighlighter>
					</Link>{' '}
					prop array.
				</p>

				<ImplementationToDo>
					All params should be implemented for Leaflet. In WorldWind, only the
					basics are implemented.
				</ImplementationToDo>

				<SyntaxHighlighter language="javascript">
					{`{
	key: "snezka_example_layer_1", // unique identifier
	layerKey: "snezka_example_layer", // see description below
	type: "vector", // see description below
	opacity: 0.7, // a number from 0 (transparent) to 1 (fully opaque)
	options: {} // see description below
}`}
				</SyntaxHighlighter>

				<h2>layerKey</h2>
				<p>
					Sometimes the layer is combined from multiple data sources and thus it
					is rendered in the map as the multiple layers, while in the map state
					it is represented by a single layer. Because of this, we use layerKey,
					which connects the rendered layer with the map state.
				</p>

				<h2>type</h2>
				<p>
					A type of the layer. For vector layers, it could be either "vector" or
					"tiled-vector" and it depends on source data.
				</p>
				<ul className="ptr-docs-basic-list">
					<li>
						<b>vector</b> - Basic type for vector layer. It must have a list of{' '}
						<Link to="#features">features</Link> on the input.
					</li>
					<li>
						<b>tiled-vector</b> - Vector layer composed from different tiles. It
						must have a list of <Link to="#tiles">tiles</Link> on the input.
					</li>
				</ul>
				<ImplementationToDo>Implemented for Leaflet only</ImplementationToDo>

				<h2>options</h2>
				<PropertyDescription id="features" name="features" dataType="array">
					For <InlineCodeHighlighter>type="vector"</InlineCodeHighlighter> only.
					A list of{' '}
					<a
						target="_blank"
						href="https://tools.ietf.org/html/rfc7946#section-3.2" rel="noreferrer"
					>
						GeoJSON feature
					</a>{' '}
					objects.
				</PropertyDescription>

				<PropertyDescription id="tiles" name="tiles" dataType="array">
					For <InlineCodeHighlighter>type="tiled-vector"</InlineCodeHighlighter>{' '}
					only. A collection of tile objects (
					<Link to="../../../code/packages/tilegrid">more about tiles</Link>):
					<SyntaxHighlighter language="javascript">
						{`{
	tile: "3.515625,46.40625", // the bottom-left tile's corner coordinates (lon,lat)
	level: 8 // zoom level
	features: [] // a list of geojson features
}`}
					</SyntaxHighlighter>
				</PropertyDescription>

				<PropertyDescription name="fidColumnName" dataType="string">
					A feature property which should be used as an identifier.
					<ImplementationToDo>
						According to the GeoJSON specification,{' '}
						<a
							target="_blank"
							href="https://tools.ietf.org/html/rfc7946#section-3.2" rel="noreferrer"
						>
							the id should be used as an identifier
						</a>
						.
					</ImplementationToDo>
				</PropertyDescription>

				<PropertyDescription name="hoverable" dataType="boolean">
					True, if a feature could be highlighted (or do something else) on
					hover.
				</PropertyDescription>

				<PropertyDescription name="hovered" dataType="object">
					<SyntaxHighlighter language="javascript">
						{`{
	style: "default" | {fill: "#ddeeff", fillOpacity: 0.5}, // single style object
}`}
					</SyntaxHighlighter>
				</PropertyDescription>

				<PropertyDescription name="pointAsMarker" dataType="boolean">
					Only for layers with point geometries. If true, the points will have
					the same size in pixels for each boxRange/zoom level. Otherwise, the
					points will have the same geographical size.
					<ImplementationToDo>Implemented for Leaflet only</ImplementationToDo>
				</PropertyDescription>

				<PropertyDescription name="renderAs" dataType="array">
					A collection of rules. Each rule must have a boxRangeRange specified
					saying for which range of boxRange the settings will apply. Currently,
					it is possible to change renderingTechnique, style and the way how
					points are displayed based on box range.
					<SyntaxHighlighter language="javascript">
						{`[
	{
		options: {
			renderingTechnique: 'canvas',
			pointAsMarker: false,
			style: {}, // see style option doc
		},
		boxRangeRange: [2000, null],
	}, {
		boxRangeRange: [null, 2000],
	}
]`}
					</SyntaxHighlighter>
					<ImplementationToDo>Implemented for Leaflet only</ImplementationToDo>
				</PropertyDescription>

				<PropertyDescription name="renderingTechnique" dataType="string">
					Using which technique should be the layer rendered. Use "canvas" for
					large datasets or "svg" for better interactivity. Default is "svg".
					<ImplementationToDo>Implemented for Leaflet only</ImplementationToDo>
				</PropertyDescription>

				<PropertyDescription name="selectable" dataType="boolean">
					True, if a feature could be selected.
				</PropertyDescription>

				<PropertyDescription name="selected" dataType="object">
					<SyntaxHighlighter language="javascript">
						{`{
	'selectionKey1': {
		style: "default" | {fill: "#ddeeff", fillOpacity: 0.5}, // single style object
		hoveredStyle: "default" | {fill: "#ddeeff", fillOpacity: 0.5}, // single style object
		keys: [] // A list of selected feature keys
	}, 
	'selectionKey2': {
		...
	} 
}`}
					</SyntaxHighlighter>
				</PropertyDescription>

				<PropertyDescription name="style" dataType="object">
					<Link to="../../storeDataTypes/common/style">Style</Link> definition
					object.
				</PropertyDescription>
			</Page>
		);
	}
}

export default withNamespaces()(VectorLayers);
