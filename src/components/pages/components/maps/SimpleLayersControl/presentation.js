import React from 'react';
import {find as _find} from 'lodash';
import {Link} from 'react-router-dom';
import {
	ReactLeafletMap,
	SimpleLayersControl,
	PresentationMap,
	MapControls,
} from '@gisatcz/ptr-maps';
import images from '@gisatcz/ptr-maps/lib/controls/SimpleLayersControl/images';
import Page, {SyntaxHighlighter} from '../../../../Page';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';
import './style.scss';

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 1000000,
};

const layerTemplates = [
	{
		key: 'cartoDB_DarkMatter_key',
		data: {nameDisplay: 'cartoDB Dark', thumbnail: 'cartoDB_DarkMatter'},
		type: 'wmts',
		options: {
			url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
		},
	},
	{
		key: 'cartoDB_VoyagerNoLabels_key',
		data: {
			nameDisplay: 'cartoDB NoLabels',
			thumbnail: 'cartoDB_VoyagerNoLabels',
		},
		type: 'wmts',
		options: {
			url:
				'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
		},
	},
	{
		key: 'esri_WorldGrayCanvas_key',
		data: {nameDisplay: 'esri WorldGray', thumbnail: 'esri_WorldGrayCanvas'},
		type: 'wmts',
		options: {
			url:
				'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
		},
	},
	{
		key: 'esri_WorldImagery_key',
		data: {nameDisplay: 'esri WorldImagery', thumbnail: 'esri_WorldImagery'},
		type: 'wmts',
		options: {
			url:
				'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		},
	},
	{
		key: 'esri_WorldTopoMap_key',
		data: {nameDisplay: 'esri TopoMap', thumbnail: 'esri_WorldTopoMap'},
		type: 'wmts',
		options: {
			url:
				'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
		},
	},
	{
		key: 'openStreetMap_Mapnik_key',
		data: {nameDisplay: 'openStreetMap', thumbnail: 'openStreetMap_Mapnik'},
		type: 'wmts',
		options: {url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'},
	},
	{
		key: 'wikimedia_key',
		data: {nameDisplay: 'wikimedia', thumbnail: 'wikimedia'},
		type: 'wmts',
		options: {url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png'},
	},
	{
		key: 'OSM HOT_key',
		data: {nameDisplay: 'OSM HOT', thumbnail: 'OSM_HOT'},
		type: 'wmts',
		options: {url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'},
	},
];

class SimpleLayersControlDoc extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			activeLayerTemplateKeyMap1: 'esri_WorldImagery_key',
			activeBackgroundLayerMap1: layerTemplates[3],
			activeLayerTemplateKeyMap2: 'openStreetMap_Mapnik_key',
			activeBackgroundLayerMap2: layerTemplates[5],
		};
	}

	onSelectLayer(mapKey, layerKey) {
		const activeBackgroundLayer = _find(
			layerTemplates,
			bl => bl.key === layerKey
		);

		if (mapKey === 'map1') {
			this.setState({
				activeLayerTemplateKeyMap1: layerKey,
				activeBackgroundLayerMap1: activeBackgroundLayer,
			});
		} else if (mapKey === 'map2') {
			this.setState({
				activeLayerTemplateKeyMap2: layerKey,
				activeBackgroundLayerMap2: activeBackgroundLayer,
			});
		}
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
						A function called after the layer was selected.
					</Prop>
					<Prop name="layerTemplates" required defaultValue="" type="array">
						A collection of available{' '}
						<Link to="../../../architecture/storeDataTypes/common/layerTemplate">
							layer templates
						</Link>
						.
					</Prop>
					<Prop
						name="activeLayerTemplateKey"
						required
						defaultValue=""
						type="string"
					>
						Active/selected layer template key.
					</Prop>
					<Prop name="onMount" defaultValue="" type="func">
						A function called after the component was mounted.
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
				<h3>Default control settings</h3>
				<p>
					Required props are usually passed from{' '}
					<Link to="#container">container component</Link>.
				</p>
				<SyntaxHighlighter language="jsx">
					{`<SimpleLayersControl
	onSelect={this.props.onSelect}
	layerTemplates={this.props.layerTemplates} 
	activeLayerTemplateKey={this.props.activeLayerTemplateKey} 
/>`}
				</SyntaxHighlighter>
				{/*Map 1: default control preview*/}
				<div className="ptr-light" style={{height: 600, margin: 5}}>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						backgroundLayer={this.state.activeBackgroundLayerMap1}
						view={view}
						levelsBased={true}
					>
						<SimpleLayersControl
							onSelect={this.onSelectLayer.bind(this, 'map1')}
							layerTemplates={layerTemplates}
							activeLayerTemplateKey={this.state.activeLayerTemplateKeyMap1}
						/>
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>
				<h3>Customized control settings</h3>
				<SyntaxHighlighter language="jsx">
					{`<SimpleLayersControl
	opensRight
	left={0.5}
	bottom={0.5}
	onSelect={this.props.onSelect}
	layerTemplates={this.props.layerTemplates}
	activeLayerTemplateKey={this.props.activeLayerTemplateKey}
/>`}
				</SyntaxHighlighter>
				{/*Map 2: customized control preview*/}
				<div className="ptr-light" style={{height: 600, margin: 5}}>
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
							onSelect={this.onSelectLayer.bind(this, 'map2')}
							layerTemplates={layerTemplates.slice(4, 7)}
							activeLayerTemplateKey={this.state.activeLayerTemplateKeyMap2}
						/>
						<MapControls zoomOnly levelsBased />
					</PresentationMap>
				</div>
				<h2 id="container">Example of usage in application</h2>
				This component consists only of the presentation part. The container
				part has to be defined within the application.
				<br />
				Below is an example of container part definition. In this way, the
				component could be used for map background layer handling.
				<SyntaxHighlighter language="javascript">
					{`import {connect} from '@gisatcz/ptr-state';
import {SimpleLayersControl} from '@gisatcz/ptr-maps';
import Select from '../../../state/Select';
import Action from '../../../state/Action';

const mapStateToProps = (state, ownProps) => {
\treturn {
\t\tactiveLayerTemplateKey: Select.layerTemplates.getActiveLayerTemplateKey(state, null, null, null, 1, 100),
\t\tlayerTemplates: Select.layerTemplates.getIndexed(state),
\t};
};

const mapDispatchToProps = (dispatch, ownProps) => {
\treturn () => {
\t\tconst componentId = 'app_BackgroundLayersControl';
\t\treturn {
\t\t\tonMount: () => {
\t\t\t\tdispatch(
\t\t\t\t\tAction.layerTemplates.useIndexed(
\t\t\t\t\t\tnull,
\t\t\t\t\t\tnull,
\t\t\t\t\t\tnull,
\t\t\t\t\t\t1,
\t\t\t\t\t\t100,
\t\t\t\t\t\tcomponentId
\t\t\t\t\t)
\t\t\t\t);
\t\t\t},
\t\t\tonUnMount: () => {
\t\t\t\tdispatch(Action.layerTemplates.useKeysClear(componentId));
\t\t\t},
\t\t\tonSelect: layerTemplateKey => {
\t\t\t\tdispatch(Action.maps.setMapBackgroundLayer(ownProps.mapKey, {layerTemplateKey}));
\t\t\t},
\t\t};
\t};
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleLayersControl);
`}
				</SyntaxHighlighter>
				<h2>Layers overview</h2>
				<div className="ptr-docs-props-table-container">
					<table className="ptr-docs-props-table">
						<tr>
							<th>Preview</th>
							<th>Thubnail name</th>
							<th>Possible Source URL</th>
						</tr>
						<tr>
							<td>
								<img src={images.bing_Aerial} alt={'bing_Aerial'} />
							</td>
							<td className="preview-table">bing_Aerial</td>
							<td></td>
						</tr>
						<tr>
							<td>
								<img
									src={images.cartoDB_DarkMatter}
									alt={'cartoDB_DarkMatter'}
								/>
							</td>
							<td className="preview-table">cartoDB_DarkMatter</td>
							<td className="preview-table">
								{
									'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
								}
							</td>
						</tr>
						<tr>
							<td>
								<img
									src={images.cartoDB_VoyagerNoLabels}
									alt={'cartoDB_VoyagerNoLabels'}
								/>
							</td>
							<td className="preview-table">cartoDB_VoyagerNoLabels</td>
							<td className="preview-table">
								{
									'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
								}
							</td>
						</tr>
						<tr>
							<td>
								<img
									src={images.esri_WorldGrayCanvas}
									alt={'esri_WorldGrayCanvas'}
								/>
							</td>
							<td className="preview-table">esri_WorldGrayCanvas</td>
							<td className="preview-table">
								{
									'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
								}
							</td>
						</tr>
						<tr>
							<td>
								<img src={images.esri_WorldImagery} alt={'esri_WorldImagery'} />
							</td>
							<td className="preview-table">esri_WorldImagery</td>
							<td className="preview-table">
								{
									'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
								}
							</td>
						</tr>
						<tr>
							<td>
								<img src={images.esri_WorldTopoMap} alt={'esri_WorldTopoMap'} />
							</td>
							<td className="preview-table">esri_WorldTopoMap</td>
							<td className="preview-table">
								{
									'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
								}
							</td>
						</tr>
						<tr>
							<td>
								<img
									src={images.openStreetMap_Mapnik}
									alt={'openStreetMap_Mapnik'}
								/>
							</td>
							<td className="preview-table">openStreetMap_Mapnik</td>
							<td className="preview-table">
								{'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
							</td>
						</tr>
						<tr>
							<td>
								<img src={images.wikimedia} alt={'wikimedia'} />
							</td>
							<td className="preview-table">wikimedia</td>
							<td className="preview-table">
								{'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png'}
							</td>
						</tr>
						<tr>
							<td>
								<img src={images.noPreview} alt={'noPreview'} />
							</td>
							<td className="preview-table">noPreview</td>
						</tr>
					</table>
				</div>
				<h2>More basemaps</h2>
				There exists various other basemaps. For instance,{' '}
				<a href={'https://leaflet-extras.github.io/leaflet-providers/preview/'}>
					{' '}
					this page
				</a>{' '}
				contains nice presentation of available Leaflet basemaps providers.
				<br />
				If creating new thumbnail image, you can use and modify the below code
				to get same parameters as for the existing thumbnails.
				<br />
				Compression tool like <a href={'https://tinypng.com/'}>
					tinypng.com{' '}
				</a>{' '}
				should be then used to compress the images.
				<SyntaxHighlighter language="javascript">
					{`<!doctype html>
<html lang='en'>
<head>
    <meta charset='utf-8'>
    <title>Leaflet Map with a Basemap</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'/>
    <script src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
            integrity='sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=='
            crossorigin=''></script>
    <script src='https://unpkg.com/leaflet-image@0.4.0/leaflet-image.js'></script>
    <style>
        html, body, #map {height: 166px; width: 200px; margin: auto;}
    </style>
</head>
<body>
<p>Interactive map</p>
<div id='map'></div>
<p style='padding-top: 10rem'>Right click for download image</p>
<div id='images'></div>
<script>
    const map = L.map('map', {center: [43.971492543039126, 7.273551406051902], zoom: 6});

    // Change the tile layer url source here
    const basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');

    basemap.addTo(map)

    leafletImage(map, function (err, canvas) {
        let img = document.createElement('img');
        let dimensions = map.getSize();
        img.width = dimensions.x;
        img.height = dimensions.y;
        img.src = canvas.toDataURL();
        document.getElementById('images').innerHTML = '';
        document.getElementById('images').appendChild(img);
    })
</script>
</body>
</html>
`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default SimpleLayersControlDoc;
