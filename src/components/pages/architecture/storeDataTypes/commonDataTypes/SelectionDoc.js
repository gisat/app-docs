import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';
import {Link} from 'react-router-dom';

const SelectionDoc = props => (
	<Page title="Selection">
		<DocsToDo />
	</Page>
);

export default withNamespaces()(SelectionDoc);
