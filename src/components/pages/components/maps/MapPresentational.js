import React from 'react';
import Page, {SyntaxHighlighter} from "../../../Page";
import {ReactLeafletMap, WorldWindMap} from "@gisatcz/ptr-maps";
import {Link} from "@gisatcz/ptr-state";

const view = {
    center: {lat: 50, lon: 15},
    boxRange: 10000000
};

const backgroundLayer = {
    key: 'background-osm',
    type: 'wmts',
    options: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
};

class MapPresentational extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        // TODO intended to use directly or used by Map component

        return (
            <Page title="Presentational map">
                <p>Presentational map components don't take care of data loading. They are not connected to the store and only display data.</p>
                <p>The API should be the same for all presentational map components in it's core, although some props may be specific for particular framework.</p>

                <p>Presentational map components could be used directly to display map data (see examples below) or as mapComponent prop of the <Link to="./Map">Map component</Link>.</p>

                <h2>WorldWindMap</h2>
                Go to <Link to="./presentational/webWorldWind">WorldWindMap</Link> section for details.
                <SyntaxHighlighter language="jsx">{`<WorldWindMap
    mapKey="world-wind-map"
    view={{
        center: {lat: 50, lon: 15},
        boxRange: 10000000
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
                <div style={{height: 300, marginBottom: 10}}>
                    <WorldWindMap
                        mapKey="world-wind-map"
                        view={view}
                        backgroundLayer={backgroundLayer}
                    />
                </div>

                <h2>ReactLeafletMap</h2>
                Go to <Link to="./presentational/reactLeaflet">ReactLeafletMap</Link> section for details.
                <SyntaxHighlighter language="jsx">{`<ReactLeafletMap
    mapKey="leaflet-map"
    view={{
        center: {lat: 50, lon: 15},
        boxRange: 10000000
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
                <div style={{height: 300, marginBottom: 10}}>
                    <ReactLeafletMap
                        mapKey="leaflet-map"
                        view={view}
                        backgroundLayer={backgroundLayer}
                    />
                </div>
            </Page>
        );
    }
}

export default MapPresentational;