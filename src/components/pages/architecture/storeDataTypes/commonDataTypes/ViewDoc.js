import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';
import {Link} from 'react-router-dom';

const ViewDoc = props => (
	<Page title="View">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(ViewDoc);
