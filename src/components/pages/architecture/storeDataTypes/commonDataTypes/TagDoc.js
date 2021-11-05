import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';

const TagDoc = (props) => (
	<Page title="Tag">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(TagDoc);
