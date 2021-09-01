import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from '@gisatcz/ptr-state';
import {
	connectRouter,
	routerMiddleware,
	ConnectedRouter,
} from 'connected-react-router';
import Helmet from 'react-helmet';
import createStore, {history} from './state/Store';
import {Action} from '@gisatcz/ptr-state';
import {localesUtils, i18n} from '@gisatcz/ptr-locales';

import config from './config';

import '@gisatcz/ptr-core/lib/styles/reset.css';
import '@gisatcz/ptr-core/lib/styles/base.scss';
import './styles/index.scss';

import Docs, {Directory, Page, Anchor} from './components/Docs';

import Index from './components/pages/index';
import Design from './components/pages/design';
import Typography from './components/pages/design/Typography';
import Buttons from './components/pages/components/atoms/ButtonsDoc';
import CartesianCharts from './components/pages/components/visualizations/cartesianCharts/CartesianCharts';
import ColumnChartDoc from './components/pages/components/visualizations/cartesianCharts/ColumnChartDoc';
import LineChartDoc from './components/pages/components/visualizations/cartesianCharts/LineChartDoc';
import ScatterChartDoc from './components/pages/components/visualizations/cartesianCharts/ScatterChartDoc';
import AsterChartDoc from './components/pages/components/visualizations/AsterChartDoc';
import SankesChartDoc from './components/pages/components/visualizations/SankeyChartDoc';
import FormsDoc from './components/pages/components/atoms/FormsDoc';
import ItemSelectDoc from './components/pages/components/atoms/ItemSelectDoc';
import MapDoc from './components/pages/components/maps/MapDoc';
import MapSetDoc from './components/pages/components/maps/MapSetDoc';
import TileGridDoc from './components/pages/code/packages/TileGrid';
import HoverHandlerDoc from './components/pages/components/commonFeatures/HoverHandlerDoc';
import LayersDoc from './components/pages/architecture/systemDataTypes/layers';
import MapViewDoc from './components/pages/architecture/systemDataTypes/MapViewDoc';
import StyleDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/StyleDoc';
import ReactLeafletMapDoc from './components/pages/components/maps/ReactLeafletMapDoc';
import WorldWindMapDoc from './components/pages/components/maps/WorldWindMapDoc';
import LeafletVectorLayer from './components/pages/components/maps/ReactLeafletMapDoc/LeafletVectorLayer';
import LeafletDiagramLayer from './components/pages/components/maps/ReactLeafletMapDoc/LeafletDiagramLayer';
import WorldWindVectorLayer from './components/pages/components/maps/WorldWindMapDoc/WorldWindVectorLayer';
import LeafletIndexedVectorLayer from './components/pages/components/maps/ReactLeafletMapDoc/LeafletIndexedVectorLayer';
import LeafletWMSLayer from './components/pages/components/maps/ReactLeafletMapDoc/LeafletWMSLayer';
import MapPresentational from './components/pages/components/maps/MapPresentational';
import MapControls from './components/pages/components/maps/MapControls';
import SimpleLayersControl from './components/pages/components/maps/SimpleLayersControl';
import Architecture from './components/pages/architecture';
import Applications from './components/pages/architecture/Applications';
import Packages from './components/pages/architecture/Packages';
import StoreDataTypes from './components/pages/architecture/storeDataTypes';
import SpecificDataTypes from './components/pages/architecture/storeDataTypes/specificDataTypes';
import CommonDataTypes from './components/pages/architecture/storeDataTypes/commonDataTypes';
import SystemDataTypes from './components/pages/architecture/systemDataTypes';
import Components from './components/pages/components';
import Maps from './components/pages/components/maps';
import Visualizations from './components/pages/components/visualizations';
import Code from './components/pages/code';
import UsingData from './components/pages/code/UsingData';
import Api from './components/pages/code/api';
import CodeComponents from './components/pages/code/CodeComponents';
import AttributeDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/AttributeDoc';
import AttributeSetDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/AttributeSetDoc';
import AreaTreeDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/AreaTreeDoc';
import AreaTreeLevelDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/AreaTreeLevelDoc';
import CaseDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/CaseDoc';
import LayerTemplateDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/LayerTemplateDoc';
import LayerTreeDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/LayerTreeDoc';
import PeriodDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/PeriodDoc';
import PlaceDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/PlaceDoc';
import ScenarioDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/ScenarioDoc';
import ScopeDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/ScopeDoc';
import SelectionDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/SelectionDoc';
import TagDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/TagDoc';
import UserDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/UserDoc';
import UserGroupDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/UserGroupDoc';
import ViewDoc from './components/pages/architecture/storeDataTypes/commonDataTypes/ViewDoc';
import MapViewLimitsDoc from './components/pages/architecture/systemDataTypes/MapViewLimits';
import MapWrapperDoc from './components/pages/components/maps/MapWrapperDoc';
import DataEndpoint from './components/pages/code/api/DataEndpoint';
import VectorLayers from './components/pages/architecture/systemDataTypes/layers/VectorLayers';
import AttributeDataEndpoint from './components/pages/code/api/AttributeDataEndpoint';
import Data from './components/pages/code/state/Data';
import TimelineDoc from './components/pages/components/controls/timeline/Timeline';
import MapTimelineDoc from './components/pages/components/controls/timeline/MapTimeline';

const {store} = createStore();

store.dispatch(Action.app.updateLocalConfiguration(config));
store.dispatch(Action.app.setKey('docs'));
// Store.dispatch(Action.app.setBaseUrl(baseUrl)); //TODO get base URL

// Load Current User
store.dispatch(Action.users.apiLoadCurrentUser());

// Set local configuration
store.dispatch(Action.app.updateLocalConfiguration(config));

i18n.changeLanguage('en');

ReactDOM.render(
	<Provider store={store}>
		<Helmet titleTemplate="%s | Panther docs" defaultTitle="Panther docs" />
		<ConnectedRouter history={history}>
			<Docs component={Index}>
				<Directory
					label="Architecture"
					path="architecture"
					component={Architecture}
				>
					<Page
						label="Applications"
						path="applications"
						component={Applications}
					/>
					<Page label="Packages" path="packages" component={Packages} />
					<Directory
						label="Store data types"
						path="storeDataTypes"
						component={StoreDataTypes}
					>
						<Directory
							label="Common data types"
							path="common"
							component={CommonDataTypes}
						>
							<Page label="Area tree" path="areaTree" component={AreaTreeDoc} />
							<Page
								label="Area tree level"
								path="areaTreeLevel"
								component={AreaTreeLevelDoc}
							/>
							<Page
								label="Attribute"
								path="attribute"
								component={AttributeDoc}
							/>
							<Page
								label="Attribute set"
								path="attributeSet"
								component={AttributeSetDoc}
							/>
							<Page label="Case" path="case" component={CaseDoc} />
							<Page
								label="Layer template"
								path="layerTemplate"
								component={LayerTemplateDoc}
							/>
							<Page
								label="Layer tree"
								path="layerTree"
								component={LayerTreeDoc}
							/>
							<Page label="Period" path="period" component={PeriodDoc} />
							<Page label="Place" path="place" component={PlaceDoc} />
							<Page label="Scenario" path="scenario" component={ScenarioDoc} />
							<Page label="Scope" path="scope" component={ScopeDoc} />
							<Page
								label="Selection"
								path="selection"
								component={SelectionDoc}
							/>
							<Page label="Style" path="style" component={StyleDoc}>
								<Anchor label="Without style" path="without-style" />
								<Anchor label="Fill styling" path="fill" />
								<Anchor label="Outline styling" path="outline" />
								<Anchor label="Hovered & selected" path="hovered-selected" />
								<Anchor label="Attribute values" path="values" />
								<Anchor label="Intervals" path="intervals" />
								<Anchor label="Scales" path="scales" />
								<Anchor label="Transformations" path="transformations" />
								<Anchor label="Symbols" path="symbols" />
								<Anchor label="Diagrams" path="diagrams" />
							</Page>
							<Page label="Tag" path="tag" component={TagDoc} />
							<Page label="User" path="user" component={UserDoc} />
							<Page
								label="User group"
								path="userGroup"
								component={UserGroupDoc}
							/>
							<Page label="View" path="view" component={ViewDoc} />
						</Directory>
						<Page
							label="Specific data types"
							path="specific"
							component={SpecificDataTypes}
						/>
					</Directory>
					<Directory
						label="System data types"
						path="systemDataTypes"
						component={SystemDataTypes}
					>
						<Directory label="Layers" path="layers" component={LayersDoc}>
							<Page
								label="Vector (full format)"
								path="vector"
								component={VectorLayers}
							/>
						</Directory>
						<Page label="Map view" path="mapView" component={MapViewDoc} />
						<Page
							label="Map view limits"
							path="mapViewLimits"
							component={MapViewLimitsDoc}
						/>
					</Directory>
				</Directory>
				<Directory label="Design" path="design" component={Design}>
					<Page label="Typography" path="typography" component={Typography} />
					<Page label="Colours" path="colours" />
				</Directory>
				<Directory label="Components" path="components" component={Components}>
					<Directory label="Maps" path="maps" component={Maps}>
						<Page label="Map" path="map" component={MapDoc} />
						<Page label="Map set" path="mapSet" component={MapSetDoc} />
						<Page
							label="Map wrapper"
							path="mapWrapper"
							component={MapWrapperDoc}
						/>
						<Directory
							label="Presentational"
							path="presentational"
							component={MapPresentational}
						>
							<Directory
								label="WebWorldWind"
								path="webWorldWind"
								component={WorldWindMapDoc}
							>
								<Page
									label="Vector layer"
									path="vectorLayer"
									component={WorldWindVectorLayer}
								/>
							</Directory>
							<Directory
								label="ReactLeafletMap"
								path="reactLeaflet"
								component={ReactLeafletMapDoc}
							>
								<Page
									label="Vector layer"
									path="vectorLayer"
									component={LeafletVectorLayer}
								>
									<Anchor label="Props" path="props" />
									<Anchor label="Polygons" path="polygons" />
									<Anchor label="Points" path="points" />
									<Anchor label="Lines" path="lines" />
									<Anchor label="Mixed" path="mixed" />
								</Page>
								{/*<Page*/}
								{/*	label="Diagram layer"*/}
								{/*	path="diagramLayer"*/}
								{/*	component={LeafletDiagramLayer}*/}
								{/*/>*/}
								{/*<Page*/}
								{/*	label="Indexed Vector layer"*/}
								{/*	path="indexedVectorLayer"*/}
								{/*	component={LeafletIndexedVectorLayer}*/}
								{/*/>*/}
								<Page
									label="WMS layer"
									path="WMSLayer"
									component={LeafletWMSLayer}
								/>
							</Directory>
						</Directory>
						<Directory label="Controls" path="controls">
							<Page
								label="Map controls"
								path="mapControls"
								component={MapControls}
							/>
							<Page
								label="Simple Layers Control"
								path="simpleLayersControl"
								component={SimpleLayersControl}
							/>
						</Directory>
					</Directory>
					<Directory
						label="Visualizations"
						path="visualizations"
						component={Visualizations}
					>
						<Directory
							label="Cartesian charts"
							path="cartesianCharts"
							component={CartesianCharts}
						>
							<Page
								label="Line chart"
								path="lineChart"
								component={LineChartDoc}
							>
								<Anchor label="Props" path="props" />
								<Anchor label="Data structure" path="dataStructure" />
								<Anchor label="Basic settings" path="basicSettings" />
								<Anchor label="Lines without points" path="withoutPoints" />
								<Anchor label="Graying and aggregation" path="graying" />
							</Page>
							<Page
								label="Column chart"
								path="columnChart"
								component={ColumnChartDoc}
							>
								<Anchor label="Props" path="props" />
								<Anchor label="Data structure" path="dataStructure" />
								<Anchor label="Basic settings" path="basicSettings" />
								<Anchor label="Serial data handling" path="serialData" />
								<Anchor label="Custom bar colors" path="barColors" />
								<Anchor label="Aggregation" path="aggregation" />
								<Anchor label="Diverging" path="diverging" />
								<Anchor label="Stacked" path="stacked" />
							</Page>
							<Page
								label="Scatter chart"
								path="scatterChart"
								component={ScatterChartDoc}
							>
								<Anchor label="Props" path="props" />
								<Anchor label="Data structure" path="dataStructure" />
								<Anchor label="Basic settings" path="basicSettings" />
								<Anchor label="Point radius" path="pointRadius" />
								<Anchor label="Serial data handling" path="serialData" />
								<Anchor label="Custom symbols" path="symbols" />
							</Page>
						</Directory>
						<Page
							label="Aster chart"
							path="asterChart"
							component={AsterChartDoc}
						>
							<Anchor label="Props" path="props" />
							<Anchor label="Data structure" path="dataStructure" />
							<Anchor label="Basic settings" path="basicSettings" />
							<Anchor label="Relative values" path="relativeValues" />
							<Anchor label="Dimensions" path="dimensions" />
							<Anchor label="Forced min & max" path="forceMinMax" />
							<Anchor label="Grid" path="grid" />
							<Anchor label="Radials & legend" path="radials" />
							<Anchor label="Custom hover value" path="customHover" />
						</Page>
						<Page
							label="Sankey chart"
							path="sankesChart"
							component={SankesChartDoc}
						>
							{/* <Anchor label="Props" path="props"/>
								<Anchor label="Data structure" path="dataStructure"/>
								<Anchor label="Basic settings" path="basicSettings"/>
								<Anchor label="Relative values" path="relativeValues"/>
								<Anchor label="Dimensions" path="dimensions"/>
								<Anchor label="Forced min & max" path="forceMinMax"/>
								<Anchor label="Grid" path="grid"/>
								<Anchor label="Radials & legend" path="radials"/>
								<Anchor label="Custom hover value" path="customHover"/> */}
						</Page>
					</Directory>
					<Directory label="Atoms" path="atoms">
						<Page label="Buttons" path="buttons" component={Buttons}>
							<Anchor label="Props" path="props" />
							<Anchor label="Levels" path="levels" />
							<Anchor label="Sizes" path="sizes" />
						</Page>
						<Page label="Forms" path="forms" component={FormsDoc} />
						<Page
							label="ItemSelect"
							path="itemSelect"
							component={ItemSelectDoc}
						/>
						<Page label="Icon" path="icon" />
						<Page label="Loader" path="loader" />
						<Page label="EditableText" path="editableText" />
						<Page label="Utilities ???" path="utilities" />
						{/* center, fadeIn, expandRowButton, etc. */}
					</Directory>
					<Directory label="Interface elements" path="interfaceElements">
						<Page label="Panther select" path="pantherSelect">
							<Anchor label="Usage" path="usage" />
							<Anchor label="Extending" path="extending" />
						</Page>
						<Page label="Adjustable columns" path="adjustableColumns" />
						<Page label="ScreenAnimator" path="screenAnimator" />
					</Directory>
					<Directory label="Controls" path="controls">
						<Directory label="Timeline" path="timeline" component={TimelineDoc}>
							<Page
								label="Map Timeline"
								path="mapTimeline"
								component={MapTimelineDoc}
							/>
						</Directory>
						<Page label="Areas" path="areas" />
						<Page label="Layers" path="layers" />
						<Page label="User & login overlay" path="user" />
						<Page label="Share ???" path="share" />
					</Directory>
					<Directory label="Common features" path="commonFeatures">
						<Page label="AppContainer" path="appContainer" />
						<Page
							label="HoverHandler"
							path="hoverHandler"
							component={HoverHandlerDoc}
						/>
						<Page label="WindowsContainer" path="windowsContainer" />
					</Directory>
				</Directory>
				<Directory label="Code" path="code" component={Code}>
					<Page
						label="Components"
						path="components"
						component={CodeComponents}
					/>
					<Page
						label="Using data in applications ??"
						path="usingData"
						component={UsingData}
					/>
					<Directory label="API" path="api" component={Api}>
						<Page
							label="Data endpoint"
							path="dataEndpoint"
							component={DataEndpoint}
						/>
						<Page
							label="Attribute data endpoint"
							path="attributeDataEndpoint"
							component={AttributeDataEndpoint}
						/>
					</Directory>
					<Page label="Configuration" path="configuration" />
					<Page label="SSR" path="ssr" />
					<Page label="Styles" path="styles" />
					<Directory label="State" path="state">
						<Page label="Data" path="data" component={Data} />
					</Directory>
					<Page label="Internationalization" path="internationalization" />
					<Directory label="Packages" path="packages">
						<Page label="TileGrid" path="tilegrid" component={TileGridDoc} />
					</Directory>
				</Directory>
				<Page label="Panther 2" path="panther2" />
			</Docs>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('ptr')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
