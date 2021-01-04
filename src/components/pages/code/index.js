import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../Page';

const Code = props => (
	<Page>
		<DocsToDo>
			<ul>
				<li>index</li>
			</ul>
		</DocsToDo>
	</Page>
);

export default withNamespaces()(Code);
