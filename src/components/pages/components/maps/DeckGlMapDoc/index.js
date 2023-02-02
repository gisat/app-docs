import React from 'react';
import {Link} from 'react-router-dom';
import Page, {SyntaxHighlighter} from '../../../../Page';
import {DeckGlMap} from '@gisatcz/ptr-maps';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';

const wmtsView = {
	center: {lat: 50, lon: 15},
	boxRange: 400000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

class DeckGlMapDoc extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Page title="DeckGlMap">
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
					Layer component is always used inside DeckGlMap component. The data
					are passed via layers prop (see{' '}
					<Link to="/components/maps/map">Map</Link> documentation), where each
					layer is represented by specific layer data type. For general
					information about layer system data type, see{' '}
					<Link to="/architecture/systemDataTypes/layers">Layers</Link> in
					System data types section.
				</p>

				<p>
					It is possible to use following layer types inside DeckGlMap
					component:
				</p>
				<ul className="ptr-docs-basic-list">
					<li>
						<Link to="#wmts">WMTS layer</Link>
					</li>
					<li>
						<Link to="/components/maps/presentational/deckGl/wmsLayer">
							WMS layer
						</Link>
					</li>
					<li>
						<Link to="/components/maps/presentational/deckGl/vectorLayer">
							Vector layer
						</Link>
					</li>
					<li>
						<Link to="/components/maps/presentational/deckGl/3dview">
							Controll for switch to 3D view
						</Link>
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
			url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
/>
`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default DeckGlMapDoc;
