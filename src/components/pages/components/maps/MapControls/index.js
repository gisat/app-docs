import React from 'react';
import Page, {DocsToDo} from '../../../../Page';
import {
	PresentationMap,
	MapControls,
	WorldWindMap,
	ReactLeafletMap,
} from '@gisatcz/ptr-maps';
import ComponentPropsTable, {
	Prop,
} from '../../../../ComponentPropsTable/ComponentPropsTable';

const view = {
	center: {lat: 50, lon: 14},
	boxRange: 64000,
};

const osm = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	},
};

class MapControlsDocs extends React.PureComponent {
	render() {
		return (
			<Page title="Map controls">
				<div
					className="ptr-light"
					style={{height: 300, width: 500, marginBottom: 10}}
				>
					<PresentationMap
						mapComponent={WorldWindMap}
						backgroundLayer={osm}
						view={view}
					>
						<MapControls />
					</PresentationMap>
				</div>
				<p>
					Click on, touch or hold particular button to control map zoom,
					rotation or tilt.
				</p>
				<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="levelsBased" defaultValue="false" type="boolean">
						Zoom in/out is not smooth but by levels.
					</Prop>
					<Prop name="zoomOnly" defaultValue="false" type="boolean">
						Display controls for zooming only.
					</Prop>
				</ComponentPropsTable>

				<h2>Examples</h2>
				<p>
					<b>First map</b> - full controls, try to click or hold buttons to see
					the map response. <b>Second map</b> - Lightweight controls for zoom
					control only. <b>Third map</b> - zooming by levels.
				</p>

				<div style={{display: 'flex', flexWrap: 'wrap'}}>
					<div
						className="ptr-light"
						style={{height: 300, width: 300, margin: 5}}
					>
						<PresentationMap
							mapComponent={WorldWindMap}
							backgroundLayer={osm}
							view={view}
						>
							<MapControls />
						</PresentationMap>
					</div>
					<div
						className="ptr-light"
						style={{height: 300, width: 300, margin: 5}}
					>
						<PresentationMap
							mapComponent={WorldWindMap}
							backgroundLayer={osm}
							view={view}
						>
							<MapControls zoomOnly />
						</PresentationMap>
					</div>
					<div
						className="ptr-light"
						style={{height: 300, width: 300, margin: 5}}
					>
						<PresentationMap
							mapComponent={ReactLeafletMap}
							backgroundLayer={osm}
							view={view}
							levelsBased={true}
						>
							<MapControls zoomOnly levelsBased />
						</PresentationMap>
					</div>
				</div>
			</Page>
		);
	}
}

export default MapControlsDocs;
