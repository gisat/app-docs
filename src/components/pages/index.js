import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';

import Page from "../Page";

const Index = props => (
	<Page>
		<ul>
			<li>What is Panther? framework, spatial data, ...</li>
			<li>Links to other sections (overview of sections)</li>
			<li>Links to gisat, github, npm?</li>
		</ul>
	</Page>
);

export default withNamespaces()(Index);