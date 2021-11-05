import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const ScopeDoc = props => (
	<Page title="Scope">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(ScopeDoc);
