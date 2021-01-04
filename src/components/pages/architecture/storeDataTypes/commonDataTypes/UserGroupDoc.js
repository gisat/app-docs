import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';
import {Link} from 'react-router-dom';

const UserGroupDoc = props => (
	<Page title="User group">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(UserGroupDoc);
