import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const CaseDoc = props => (
	<Page title="Case">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(CaseDoc);
