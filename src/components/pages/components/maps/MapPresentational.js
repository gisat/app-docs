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
        // TODO what is
        // TODO syntax example
        // TODO disambiguation
        return (
            <Page title="Presentational map">
                <div style={{display: "flex", height: 300, marginBottom: 10}}>
                    <WorldWindMap
                        view={view}
                        backgroundLayer={backgroundLayer}
                    />
                    <ReactLeafletMap
                        mapKey="map"
                        view={view}
                        backgroundLayer={backgroundLayer}
                    />
                </div>
            </Page>
        );
    }
}

export default MapPresentational;