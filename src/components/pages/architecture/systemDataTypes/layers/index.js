import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';

import Page, {
	DocsToDo,
	ImplementationToDo,
	SyntaxHighlighter,
} from '../../../../Page';
import {Link} from 'react-router-dom';

class LayersDoc extends React.PureComponent {
	render() {
		return (
			<Page title="Layers">
				<DocsToDo>
					Add description: Layers are for layering. Full format (End? Absolute?
					Complete? Explicit? Pink?) for presentational map components,
					state-dependent (Relative? Implicit? Magic? Fuchsia?) for connected.
				</DocsToDo>

				<SyntaxHighlighter language="javascript">
					{`{
	key: "example_layer",
	type: "wms",
	opacity: 0.7,
	
	options: {
		url: "http://panther.gisat.cz/geoserver/geonode/wms?"
		params: {
			layers: "",
			styles: ""
		}
	}
}`}
				</SyntaxHighlighter>

				<h2>Full format</h2>
				<p>
					End format supplied to presentational (map framework) map components.
					(Can also be supplied to connected.) Contains everything needed to
					display final layer on the map.
				</p>

				<h3 id="wms">WMS</h3>
				<SyntaxHighlighter language="javascript">
					{`{
	key: "example_wms_layer",
	type: "wms",
	opacity: 0.7,
	
	options: {
		url: "http://192.168.2.206/geoserver/geonode/wms?"
		params: {
			layers: "layer",
			styles: "", // optional
			format: "image/png", // optional
			tileSize: 512, // optional
			transparent: true, // optional
			version: '1.1.1' // optional
			crs: 'EPSG:4326' // optional for ReactLeafletMap
		}
	}
}`}
				</SyntaxHighlighter>

				<h3>WMTS</h3>
				<SyntaxHighlighter language="javascript">
					{`{
	key: "example_wmts_layer",
	type: "wmts",
	opacity: 0.7,
	
	options: {
		urls: ["http://192.168.2.206/geoserver/geonode/wms&\${x}&\${y}&\${z}"]
	}
}`}
				</SyntaxHighlighter>

				<h3 id="vector">Vector</h3>
				<p>
					See <Link to="./layers/vector">Vector layers (full format)</Link>{' '}
					section
				</p>

				<h3>Raster</h3>

				<h3>Colour</h3>

				<h3>Framework specific</h3>
				<SyntaxHighlighter language="javascript">
					{`{
	key: "snezka_example_layer",
	type: "worldwind",
	opacity: 0.7,
	
	options: {
		layer: "wikimedia|bluemarble|bing"
	}
}`}
				</SyntaxHighlighter>

				<h3>WFS</h3>

				<h2>State-dependent format</h2>
				<p>
					Supplied to connected component, or stored in map store. References
					layer template and modifiers (fixed or active). Gets transformed into
					end format.
				</p>

				<SyntaxHighlighter language="javascript">
					{`{
	key: "example_layer",
	opacity: 0.7,
	layerTemplateKey|areaTreeLevelKey: "366f98d0-10e1-4e6c-8be5-7754c45ef599",
	styleKey: "b9f1f8cd-fdff-43ca-9440-80d3dc6667d7"
	metadataModifiers: {
		caseKey: "c9f1f8cd-fdff-43ca-9440-80d3dc6667d6"
	},
	filterByActive: {
		period: true
	}
}`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default withNamespaces()(LayersDoc);
