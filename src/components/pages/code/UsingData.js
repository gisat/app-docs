import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../Page';

const UsingData = props => (
	<Page>
		<DocsToDo>
			<ul>
				<li>Components - mount, unmount</li>
				<li>use, ensure</li>
			</ul>
		</DocsToDo>
	</Page>
);

export default withNamespaces()(UsingData);
