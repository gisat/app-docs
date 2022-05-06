import React, {useState} from 'react';
import {ReactLeafletMap} from '@gisatcz/ptr-maps';
import {GeonamesSearch} from '@gisatcz/ptr-components';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import Page, {SyntaxHighlighter} from '../../../Page';

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
					{
						name: 'className',
						type: 'string',
					},
					{
						name: 'hideSearchIcon',
						type: 'boolean',
						default: false,
						description: 'True if search icon should be hidden.',
					},
					{
						name: 'maxPlaces',
						type: 'number',
						default: 5,
						description:
							'Maximum number of returning places which match search string.',
					},
					{
						name: 'onPlaceSelect',
						type: 'function',
						required: true,
						description:
							'Callback function which takes selected item as parameter.',
					},
					{
						name: 'placeholder',
						type: 'string',
						default: 'Search place...',
						description: 'Placeholder to be shown in search box',
					},
				]}
			/>

			<h2 id="usage">Usage</h2>
			<div style={{position: 'relative'}}>
				<div style={{position: 'absolute', top: 10, left: 10, zIndex: 99}}>
					<GeonamesSearch
						maxPlaces={7}
						onPlaceSelect={onPlaceSelect}
						placeholder="Type location name..."
					/>
				</div>
				<div style={{height: 600}}>
					<ReactLeafletMap view={view} backgroundLayer={backgroundLayer} />
				</div>
			</div>
			<SyntaxHighlighter language="jsx">
				{`import {ReactLeafletMap} from '@gisatcz/ptr-maps';
import {GeonamesSearch} from '@gisatcz/ptr-components';

const defaultView = {
	center: {lat: 50, lon: 15},
	boxRange: 400000
};

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
	}
};

const App = () => {
	const [view, setView] = useState(defaultView);

	const onPlaceSelect = place => {
		setView(place.pantherView);
	};
	
	return (
		<div style={{position: 'relative'}}>
			<div style={{position: 'absolute', top: 10, left: 10, zIndex: 99}}>
				<GeonamesSearch
					maxPlaces={7}
					onPlaceSelect={onPlaceSelect}
					placeholder="Type location name..."
				/>
			</div>
			<div style={{height: 600}}>
				<ReactLeafletMap view={view} backgroundLayer={backgroundLayer} />
			</div>
		</div>
	);
}
				`}
			</SyntaxHighlighter>
		</Page>
	);
};

export default GeonamesSearchDoc;
