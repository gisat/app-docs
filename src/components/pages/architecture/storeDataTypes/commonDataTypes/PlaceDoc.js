import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const PlaceDoc = props => (
	<Page title="Place">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(PlaceDoc);
