import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const UserDoc = props => (
	<Page title="User">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(UserDoc);
