import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const PeriodDoc = props => (
	<Page title="Period">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(PeriodDoc);
