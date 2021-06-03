import React from 'react';
import {find as _find} from 'lodash';
import Page, {SyntaxHighlighter} from '../../../../Page';
import {
	ReactLeafletMap,
	SimpleLayersControl,
	PresentationMap,
	MapControls,
} from '@gisatcz/ptr-maps';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';
import './style.scss';

// import images from '@gisatcz/ptr-maps/lib/controls/SimpleLayersControl/images';
import images from 'C:/Users/PavelVlach/WebstormProjects/ptr-maps/src/controls/SimpleLayersControl/images';

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 10000000,
};

const backgroundLayers = [
	{
		key: 'dark_key',
		type: 'wmts',
		options: {
			url:
				'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
		},
	},
	{
		key: 'esri_imagery_key',
		type: 'wmts',
		options: {
			url:
				'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		},
	},
	{
		key: 'osm_key',
		type: 'wmts',
		options: {
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		},
	},
];

const layerTemplates = [
	{
		key: 'dark_key',
		thumbnail: 'cartoDB_VoyagerNoLabels',
		data: {nameDisplay: 'Carto'},
	},
	{
		key: 'esri_imagery_key',
		thumbnail: 'esri_WorldImagery',
		data: {nameDisplay: 'Esri'},
	},
	{
		key: 'osm_key',
		thumbnail: 'openStreetMap_Mapnik',
		data: {nameDisplay: 'Open street'},
	},
];

class SimpleLayersControlDoc extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activeLayerTemplateKey: 'esri_imagery_key',
			activeBackgroundLayer: backgroundLayers[1],
		};
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(key) {
		const activeBackgroundLayer = _find(backgroundLayers, bl => bl.key === key);
		this.setState({activeLayerTemplateKey: key, activeBackgroundLayer});
	}

	render() {
		return (
			<Page title="Simple Layers Control">
				<p>
					Simple Layers Control is used to switch between background base layers
					that are used in the map component.
				</p>

				<h3>Props</h3>
				<ComponentPropsTable>
					<Prop name="layerTemplates" required defaultValue="" type="array">
						List containing available background layers.
					</Prop>
					<Prop name="layers" required defaultValue="" type="array">
						List containing available background layers.
					</Prop>
					<Prop
						name="activeLayerTemplateKey"
						required
						defaultValue=""
						type="string"
					>
						Active layer key.
					</Prop>
					<Prop name="opensRight" defaultValue="false" type="boolean">
						If true, content menu opens to the right of the layer control
						button.
					</Prop>
					<Prop name="left" defaultValue="undefined" type="number">
						Specifies the horizontal position of layer control button. *
					</Prop>
					<Prop name="top" defaultValue="undefined" type="number">
						Specifies the vertical position of layer control button. *
					</Prop>
					<Prop name="right" defaultValue="0.5" type="number">
						Specifies the horizontal position of layer control button. *
					</Prop>
					<Prop name="bottom" defaultValue="4.5" type="number">
						Specifies the vertical position of layer control button. *
					</Prop>
				</ComponentPropsTable>
				<p>
					* Position is specified in <i>rem</i> units.
				</p>

				<h3>Default layers control</h3>
				<SyntaxHighlighter language="jsx">
					{`<SimpleLayersControl/>`}
				</SyntaxHighlighter>

				{/*map preview*/}
				<div className="ptr-light" style={{height: 400, width: 500, margin: 5}}>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						backgroundLayer={this.state.activeBackgroundLayer}
						view={view}
						levelsBased={true}
					>
						<SimpleLayersControl
							onSelect={this.onSelect}
							layerTemplates={layerTemplates}
							layers={layerTemplates}
							activeLayerTemplateKey={this.state.activeLayerTemplateKey}
						/>
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>

				<h2>Layers Overview</h2>
				<table className="ptr-docs-props-table">
					<tr>
						<th>Preview</th>
						<th>Thubnail name</th>
					</tr>
					<tr>
						<td>
							<img src={images.bing_Aerial} alt={'bing_Aerial'} />
						</td>
						<td className="preview-table">bing_Aerial</td>
					</tr>
					<tr>
						<td>
							<img src={images.cartoDB_DarkMatter} alt={'cartoDB_DarkMatter'} />
						</td>
						<td className="preview-table">cartoDB_DarkMatter</td>
					</tr>
					<tr>
						<td>
							<img
								src={images.cartoDB_VoyagerNoLabels}
								alt={'cartoDB_VoyagerNoLabels'}
							/>
						</td>
						<td className="preview-table">cartoDB_VoyagerNoLabels</td>
					</tr>
					<tr>
						<td>
							<img
								src={images.esri_WorldGrayCanvas}
								alt={'esri_WorldGrayCanvas'}
							/>
						</td>
						<td className="preview-table">esri_WorldGrayCanvas</td>
					</tr>
					<tr>
						<td>
							<img src={images.esri_WorldImagery} alt={'esri_WorldImagery'} />
						</td>
						<td className="preview-table">esri_WorldImagery</td>
					</tr>
					<tr>
						<td>
							<img src={images.esri_WorldTopoMap} alt={'esri_WorldTopoMap'} />
						</td>
						<td className="preview-table">esri_WorldTopoMap</td>
					</tr>
					<tr>
						<td>
							<img
								src={images.openStreetMap_Mapnik}
								alt={'openStreetMap_Mapnik'}
							/>
						</td>
						<td className="preview-table">openStreetMap_Mapnik</td>
					</tr>
					<tr>
						<td>
							<img src={images.wikimedia} alt={'wikimedia'} />
						</td>
						<td className="preview-table">wikimedia</td>
					</tr>
					<tr>
						<td>
							<img src={images.noPreview} alt={'noPreview'} />
						</td>
						<td className="preview-table">noPreview</td>
					</tr>
				</table>
			</Page>
		);
	}
}

export default SimpleLayersControlDoc;
