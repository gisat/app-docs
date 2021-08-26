import React from 'react';
import Page, {InlineCodeHighlighter, SyntaxHighlighter} from '../../../../Page';
import {MapControls, PresentationMap, DeckGlMap} from '@gisatcz/ptr-maps';
import {Button} from '@gisatcz/ptr-atoms';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';
import {Link} from 'react-router-dom';

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 400000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
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
				<div style={{height: 400, marginBottom: 10, position: 'relative'}}>
					<DeckGlMap view={view} backgroundLayer={backgroundLayer} />
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
			</Page>
		);
	}
}

export default DeckGlMapDoc;
