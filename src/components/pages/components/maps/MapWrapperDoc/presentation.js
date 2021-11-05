import React from 'react';
import Page, {
	InlineCodeHighlighter,
	SyntaxHighlighter,
} from '../../../../Page';
import {
	ReactLeafletMap,
	WorldWindMap,
	MapWrapper,
	PresentationMap,
	MapControls,
	MapSet,
} from '@gisatcz/ptr-maps';
import {connects} from '@gisatcz/ptr-state';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 10000000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

const ConnectedMap = connects.Map(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

class MapCenterWrapper extends React.PureComponent {
	render() {
		const view = this.props.view;

		return (
			<div className="ptr-map-wrapper">
				<div
					style={{
						background: 'white',
						position: 'absolute',
						bottom: 0,
						left: 0,
						zIndex: 2,
					}}
				>
					{view?.center ? (
						<span>
							lat: {view.center.lat}, lon: {view.center.lon}
						</span>
					) : null}
				</div>
				{this.props.children}
			</div>
		);
	}
}

class MapWrapperDoc extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const props = this.props;
		props.addSet({
			key: 'map-wrapper-map-set',
			data: {
				backgroundLayer: backgroundLayer,
				view: {
					center: {
						lat: 50,
						lon: 15,
					},
					boxRange: 5000000,
				},
			},
		});

		props.setSetSync('map-wrapper-map-set', {
			center: true,
			boxRange: true,
			heading: true,
		});
		props.addMap({key: 'map-wrapper-map-1'});
		props.addMap({key: 'map-wrapper-map-2'});
		props.addMap({key: 'map-wrapper-map-3'});
		props.addMap({key: 'map-wrapper-map-4'});
		props.addMap({key: 'map-wrapper-map-5'});
		props.addMapToSet('map-wrapper-map-1', 'map-wrapper-map-set');
		props.addMapToSet('map-wrapper-map-2', 'map-wrapper-map-set');
		props.addMapToSet('map-wrapper-map-3', 'map-wrapper-map-set');
		props.addMapToSet('map-wrapper-map-4', 'map-wrapper-map-set');
		props.addMapToSet('map-wrapper-map-5', 'map-wrapper-map-set');
	}

	render() {
		return (
			<Page title="Map wrapper">
				<p>
					Map wrapper is used to add additional functionality to the map
					component (e.g. display name or enable removing the map from map set).
				</p>

				<h3>Props</h3>
				<ComponentPropsTable>
					<Prop name="active" defaultValue="false" type="boolean">
						If true, a border is rendered around the map.
					</Prop>
					<Prop name="onMapRemove" type="function">
						If defined, a button for map removal is rendered in the top left
						corner. The function is then called by clicking on the button.
					</Prop>
					<Prop name="title" type="string | boolean">
						Title of the map displayed in the top left corner by default. If
						string, the value is used for title. If true, map{' '}
						<InlineCodeHighlighter>name</InlineCodeHighlighter> prop is used for
						title (if exists).
					</Prop>
				</ComponentPropsTable>

				<h2>Default wrapper</h2>
				<h3>With map framework component</h3>
				<SyntaxHighlighter language="jsx">
					{`<MapWrapper 
    title="Title of the map" 
    onMapRemove={()=>{window.alert("Remove")}}
 >
    <ReactLeafletMap
        mapKey="map1"
        backgroundLayer={}
        view={}
    />
</MapWrapper>
`}
				</SyntaxHighlighter>
				<div style={{height: 400, width: 500}}>
					<MapWrapper
						title="Title of the map"
						onMapRemove={() => {
							window.alert('Remove');
						}}
					>
						<ReactLeafletMap
							mapKey="map1"
							backgroundLayer={backgroundLayer}
							view={view}
						/>
					</MapWrapper>
				</div>

				<h3>With presentational component</h3>
				<p>
					Use <InlineCodeHighlighter>wrapper</InlineCodeHighlighter> as prop of
					PresentationMap component to enable wrapper and{' '}
					<InlineCodeHighlighter>wrapperProps</InlineCodeHighlighter> to specify
					wrapper properties.
				</p>
				<SyntaxHighlighter language="jsx">
					{`<PresentationMap
    mapComponent={WorldWindMap}
    name="The World"
    mapKey="map2"
    wrapper
    wrapperProps={{
        title: true,
        onMapRemove: (mapKey)=>{window.alert(mapKey)},
        active: true
    }}
    backgroundLayer={}
    view={}
>
    <MapControls/>
</PresentationMap>
`}
				</SyntaxHighlighter>
				<div style={{height: 260, width: 500}}>
					<PresentationMap
						mapComponent={WorldWindMap}
						name="The World"
						mapKey="map2"
						wrapper
						wrapperProps={{
							title: true,
							onMapRemove: mapKey => {
								window.alert(mapKey);
							},
							active: true,
						}}
						backgroundLayer={backgroundLayer}
						view={view}
					>
						<MapControls />
					</PresentationMap>
				</div>

				<h3>Connected map set</h3>
				<SyntaxHighlighter language="jsx">
					{`<ConnectedMapSet
    stateMapSetKey="map-wrapper-map-set"
    mapComponent={ReactLeafletMap}
    connectedMapComponent={ConnectedMap}
    wrapper
    wrapperProps={{
        title: true
    }}
>
    <MapControls levelsBased zoomOnly/>
</ConnectedMapSet>
`}
				</SyntaxHighlighter>
				<div style={{height: 500}}>
					<ConnectedMapSet
						stateMapSetKey="map-wrapper-map-set"
						mapComponent={ReactLeafletMap}
						connectedMapComponent={ConnectedMap}
						wrapper
						wrapperProps={{
							title: true,
						}}
					>
						<MapControls levelsBased zoomOnly />
					</ConnectedMapSet>
				</div>

				<h2>Custom wrapper</h2>
				<p>
					Use your own component as wrapper. All map props are passed to wrapper
					component.
				</p>

				<SyntaxHighlighter language="js">
					{`class MapCenterWrapper extends React.PureComponent {
    render() {
        const view = this.props.view;

        return (
            <div className="ptr-map-wrapper">
                <div style={{background: 'white', position: 'absolute', bottom: 0, left: 0, zIndex: 2}}>
                    {view?.center ? <span>lat: {view.center.lat}, lon: {view.center.lon}</span>: null}
                </div>
                {this.props.children}
            </div>
        );
    }
}

const map = (
    <PresentationMap
        mapComponent={ReactLeafletMap}
        mapKey="map3"
        wrapper={MapCenterWrapper}
        backgroundLayer={{
            key: 'background-osm',
            type: 'wmts',
            options: {
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            }
        }}
        view={{
            boxRange: 100000
        }}
    >
        <MapControls/>
    </PresentationMap>
)
`}
				</SyntaxHighlighter>
				<div style={{height: 260, width: 500}}>
					<PresentationMap
						mapComponent={ReactLeafletMap}
						mapKey="map3"
						wrapper={MapCenterWrapper}
						backgroundLayer={backgroundLayer}
						view={{
							boxRange: 100000,
						}}
					>
						<MapControls />
					</PresentationMap>
				</div>
			</Page>
		);
	}
}

export default MapWrapperDoc;
