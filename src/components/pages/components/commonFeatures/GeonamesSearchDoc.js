import React, {useState} from 'react';
import {ReactLeafletMap} from '@gisatcz/ptr-maps';
import {GeonamesSearch} from '@gisatcz/ptr-components';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import Page from '../../../Page';

const defaultView = {
	center: {lat: 50, lon: 15},
	boxRange: 400000,
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

const GeonamesSearchDoc = () => {
	const [view, setView] = useState(defaultView);

	const onPlaceSelect = place => {
		setView(place.pantherView);
	};

	return (
		<Page title="GeonamesSearch">
			<h2 id="props">Props</h2>
			<ComponentPropsTable
				content={[
					{
						name: 'onPlaceSelect',
						type: 'function',
						required: true,
						description:
							'Callback function which takes selected item as parameter.',
					},
					{
						name: 'apiKey',
						type: 'string',
						default: 'pavel.vlach',
						description: 'Geonames API key.',
					},
					{
						name: 'apiUrl',
						type: 'string',
						default: 'http://api.geonames.org/searchJSON',
						description: 'Service URL.',
					},
				]}
			/>

			<h2 id="usage">Usage</h2>
			<div style={{position: 'relative'}}>
				<div style={{position: 'absolute', top: 10, left: 10, zIndex: 99}}>
					<GeonamesSearch onPlaceSelect={onPlaceSelect} />
				</div>
				<div style={{height: 600}}>
					<ReactLeafletMap view={view} backgroundLayer={backgroundLayer} />
				</div>
			</div>
		</Page>
	);
};

export default GeonamesSearchDoc;
