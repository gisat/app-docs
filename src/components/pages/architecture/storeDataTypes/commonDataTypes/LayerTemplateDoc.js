import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const LayerTemplateDoc = props => (
	<Page title="LayerTemplate">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(LayerTemplateDoc);
