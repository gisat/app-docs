import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';
import {Link} from 'react-router-dom';

const LayerTemplateDoc = props => (
	<Page title="LayerTemplate">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(LayerTemplateDoc);
