import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const AreaTreeDoc = props => (
	<Page title="AreaTree">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(AreaTreeDoc);
