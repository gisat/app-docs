import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const ViewDoc = props => (
	<Page title="View">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(ViewDoc);
