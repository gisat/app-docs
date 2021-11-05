import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const AttributeSetDoc = props => (
	<Page title="Attribute set">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(AttributeSetDoc);
