import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';
import {Link} from 'react-router-dom';

const CaseDoc = props => (
	<Page title="Case">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(CaseDoc);
