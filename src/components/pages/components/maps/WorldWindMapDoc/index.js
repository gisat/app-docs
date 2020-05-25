import React from 'react';
import Page, {SyntaxHighlighter} from "../../../../Page";
import {WorldWindMap} from "@gisatcz/ptr-maps";
import {HoverHandler} from "@gisatcz/ptr-core";
import {Link} from "@gisatcz/ptr-state";
import ComponentPropsTable, {Prop} from "../../../../ComponentPropsTable/ComponentPropsTable";

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

const wmsLayers = [cuzk];

class WorldWindMapDoc extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Page title="WorldWindMap">
				<p>This component is based on <a href="https://worldwind.arc.nasa.gov/web/" target="_blank">NASA Web World Wind</a> map library.</p>
				<h2>Props</h2>
				<p>Bellow are listed specific props for ReactLeafletMap. Other props are common to all maps (<Link to="/components/maps/map">see Map documentation</Link>).</p>
				<ComponentPropsTable>
					<Prop name="elevationModel" defaultValue="default" type="string|null">If null, the map will be rendered without elevation model.</Prop>
				</ComponentPropsTable>

				<h2>Layers</h2>
				<p>The data for layers are passed via layers prop (see <Link to="/components/maps/map">Map</Link> documentation), where each layer is represented by specific layer data type. For general information about layer system data type, see <Link to="/architecture/systemDataTypes/layers">Layers</Link> in System data types section.</p>

				<p>It is possible to use following layer types currently:</p>
				<ul className="ptr-docs-basic-list">
					<li><Link to="#wmts">WMTS layer</Link></li>
					<li><Link to="#wms">WMS layer</Link></li>
					<li><Link to="./webWorldWind/vectorLayer">Vector layer</Link></li>
				</ul>

				<h3 id="wmts">WMTS layer</h3>
				<p>Typical usage of WMTS layer as background.</p>
				<div style={{height: 300, marginBottom: 10}}>
					<WorldWindMap
						view={view}
						backgroundLayer={backgroundLayer}
					/>
				</div>
				<SyntaxHighlighter language="jsx">{`<WorldWindMap
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 2000000
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

				<h3 id="wms">WMS layer</h3>
				<div style={{height: 300, marginBottom: 10}}>
					<HoverHandler>
						<WorldWindMap
							mapKey="wms-layers"
							view={view}
							backgroundLayer={backgroundLayer}
							layers={wmsLayers}
						/>
					</HoverHandler>
				</div>
				<SyntaxHighlighter language="jsx">{`<WorldWindMap
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 2000000
	}}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
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
		}
	]}
/>
`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default WorldWindMapDoc;