import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../Page';

const CodeComponents = props => (
	<Page>
		<DocsToDo>
			<ul>
				<li>container, presentational, styles</li>
			</ul>
		</DocsToDo>
	</Page>
);

export default withNamespaces()(CodeComponents);
