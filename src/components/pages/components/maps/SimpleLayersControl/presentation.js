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

import images from '@gisatcz/ptr-maps/lib/controls/SimpleLayersControl/images';
// import images from 'C:/Users/PavelVlach/WebstormProjects/ptr-maps/src/controls/SimpleLayersControl/images';

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 1000000,
};

const backgroundLayers = [
	{
		key: 'cartoDB_key',
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
		key: 'cartoDB_key',
		data: {nameDisplay: 'Carto', thumbnail: 'cartoDB_VoyagerNoLabels'},
	},
	{
		key: 'esri_imagery_key',
		data: {nameDisplay: 'Esri', thumbnail: 'esri_WorldImagery'},
	},
	{
		key: 'osm_key',
		data: {nameDisplay: 'Open street', thumbnail: 'openStreetMap_Mapnik'},
	},
];

class SimpleLayersControlDoc extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activeLayerTemplateKeyMap1: 'esri_imagery_key',
			activeBackgroundLayerMap1: backgroundLayers[1],
			activeLayerTemplateKeyMap2: 'carto_noLabels_key',
			activeBackgroundLayerMap2: backgroundLayers[0],
		};
	}

	onSelectMap1(key) {
		const activeBackgroundLayerMap1 = _find(
			backgroundLayers,
			bl => bl.key === key
		);
		this.setState({activeLayerTemplateKeyMap1: key, activeBackgroundLayerMap1});
	}

	onSelectMap2(key) {
		const activeBackgroundLayerMap2 = _find(
			backgroundLayers,
			bl => bl.key === key
		);
		this.setState({activeLayerTemplateKeyMap2: key, activeBackgroundLayerMap2});
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
					<Prop name="onSelect" required defaultValue="" type="func">
						Assign selected layer's key as map's new active background key.
					</Prop>
					<Prop name="onMount" required defaultValue="" type="func">
						tbd
					</Prop>
					<Prop name="layerTemplates" required defaultValue="" type="array">
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

				<h3>Default Control</h3>
				<SyntaxHighlighter language="jsx">
					{`<SimpleLayersControl
	onSelect={this.onSelect}
	layerTemplates={layerTemplates}
	activeLayerTemplateKey={this.state.activeLayerTemplateKey}
/>`}
				</SyntaxHighlighter>

				{/*Map 1: default control preview*/}
				<div className="ptr-light" style={{height: 400, width: 500, margin: 5}}>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						backgroundLayer={this.state.activeBackgroundLayerMap1}
						view={view}
						levelsBased={true}
					>
						<SimpleLayersControl
							onSelect={this.onSelectMap1.bind(this)}
							layerTemplates={layerTemplates}
							activeLayerTemplateKey={this.state.activeLayerTemplateKeyMap1}
						/>
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>

				<h3>Customized Control</h3>
				<SyntaxHighlighter language="jsx">
					{`<SimpleLayersControl
	opensRight
	left={0.5}
	bottom={0.5}
	onSelect={this.onSelect}
	layerTemplates={layerTemplates}
	activeLayerTemplateKey={this.state.activeLayerTemplateKey}
/>`}
				</SyntaxHighlighter>

				{/*Map 2: customized control preview*/}
				<div className="ptr-light" style={{height: 400, width: 500, margin: 5}}>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						backgroundLayer={this.state.activeBackgroundLayerMap2}
						view={view}
						levelsBased={true}
					>
						<SimpleLayersControl
							opensRight
							left={0.5}
							bottom={0.5}
							onSelect={this.onSelectMap2.bind(this)}
							layerTemplates={layerTemplates}
							activeLayerTemplateKey={this.state.activeLayerTemplateKeyMap2}
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
