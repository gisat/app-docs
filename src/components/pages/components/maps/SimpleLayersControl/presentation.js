import React from 'react';
import {find as _find} from 'lodash';
import Page, {
	DocsToDo,
	InlineCodeHighlighter,
	SyntaxHighlighter,
} from '../../../../Page';
import {
	ReactLeafletMap,
	SimpleLayersControl,
	PresentationMap,
	MapControls,
	MapSet,
} from '@gisatcz/ptr-maps';
import {connects} from '@gisatcz/ptr-state';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';

// import images from '@gisatcz/ptr-maps/lib/controls/SimpleLayersControl/images';
import images from 'D:/Panther/ptr-maps/src/controls/SimpleLayersControl/images';

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
					<Prop name="mainMapKey" defaultValue="" type="string">
						main map key
					</Prop>
				</ComponentPropsTable>

				<h2>Default wrapper</h2>
				<h3>With map framework component</h3>
				<SyntaxHighlighter language="jsx">
					{`<div className="ptr-map-controls">
	<SimpleLayersControl mainMapKey={mainMapKey} />
</div>
`}
				</SyntaxHighlighter>

				{/*map preview*/}
				<div className="ptr-light" style={{height: 400, width: 500, margin: 5}}>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						backgroundLayer={this.state.activeBackgroundLayer}
						view={view}
						levelsBased={true}
					>
						<div className="ptr-map-controls">
							<SimpleLayersControl
								onSelect={this.onSelect}
								layerTemplates={layerTemplates}
								right={false}
								layers={layerTemplates}
								activeLayerTemplateKey={this.state.activeLayerTemplateKey}
							/>
						</div>
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>

				<h2>Background Layer Overview</h2>
				<table style={{border: '1px solid black', borderCollapse: 'collapse'}}>
					<tr>
						<th>Preview</th>
						<th>Thubnail name</th>
						<th>...</th>
					</tr>
					<tr>
						<td>
							<img src={images.bing_Aerial} alt={'bing_Aerial'} />
						</td>
						<td>bing_Aerial</td>
						<td>a</td>
					</tr>
					<tr>
						<td>
							<img src={images.cartoDB_DarkMatter} alt={'cartoDB_DarkMatter'} />
						</td>
						<td>cartoDB_DarkMatter</td>
						<td>a</td>
					</tr>
					<tr>
						<td>
							<img
								src={images.cartoDB_VoyagerNoLabels}
								alt={'cartoDB_VoyagerNoLabels'}
							/>
						</td>
						<td>cartoDB_VoyagerNoLabels</td>
						<td>a</td>
					</tr>
					<tr>
						<td>
							<img
								src={images.esri_WorldGrayCanvas}
								alt={'esri_WorldGrayCanvas'}
							/>
						</td>
						<td>esri_WorldGrayCanvas</td>
						<td>a</td>
					</tr>
					<tr>
						<td>
							<img src={images.esri_WorldImagery} alt={'esri_WorldImagery'} />
						</td>
						<td>esri_WorldImagery</td>
						<td>a</td>
					</tr>
					<tr>
						<td>
							<img src={images.esri_WorldTopoMap} alt={'esri_WorldTopoMap'} />
						</td>
						<td>esri_WorldTopoMap</td>
						<td>a</td>
					</tr>
					<tr>
						<td>
							<img
								src={images.openStreetMap_Mapnik}
								alt={'openStreetMap_Mapnik'}
							/>
						</td>
						<td>openStreetMap_Mapnik</td>
						<td>a</td>
					</tr>
					<tr>
						<td>
							<img src={images.wikimedia} alt={'wikimedia'} />
						</td>
						<td>wikimedia</td>
						<td>a</td>
					</tr>
					<tr>
						<td>
							<img src={images.noPreview} alt={'noPreview'} />
						</td>
						<td>noPreview</td>
						<td>a</td>
					</tr>
				</table>
			</Page>
		);
	}
}

export default SimpleLayersControlDoc;
