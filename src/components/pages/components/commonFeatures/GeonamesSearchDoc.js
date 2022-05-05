import React from 'react';
import {GeonamesSearch} from '@gisatcz/ptr-components';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import Page from '../../../Page';

const GeonamesSearchDoc = () => {
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
			<div>
				<GeonamesSearch />
			</div>
		</Page>
	);
};

export default GeonamesSearchDoc;
