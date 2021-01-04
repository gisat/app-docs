import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';

import Page, {DocsToDoInline} from '../Page';
import {Link} from 'react-router-dom';

const Index = props => (
	<Page title="Panther documentation">
		<p>
			Panther is a framework for building applications for spatial data
			visualization and analysis.
		</p>
		<DocsToDoInline>links to examples?</DocsToDoInline>

		<h2>Learn more</h2>
		<ul>
			<li>
				<Link to="/architecture">Architecture</Link> - how the framework is
				built, framework structure & components
			</li>
			<li>
				<Link to="/design">Design principles</Link>
			</li>
			<li>
				<Link to="/components">Components</Link> - functionality & examples
			</li>
			<li>
				<Link to="/code">Code</Link>
			</li>
		</ul>

		<h2>Repositories</h2>
		<ul>
			<li>
				<a
					href="https://github.com/gisat-panther"
					target="_blank"
					rel="noopener noreferrer"
				>
					Github repository
				</a>
			</li>
			<li>
				<a
					href="https://www.npmjs.com/search?q=%40gisatcz"
					target="_blank"
					rel="noopener noreferrer"
				>
					NPM modules
				</a>
			</li>
		</ul>

		<h2>Developers</h2>
		<p>
			Panther is developed by{' '}
			<a
				href="http://gisat.cz/content/en"
				target="_blank"
				rel="noopener noreferrer"
			>
				Gisat
			</a>{' '}
			company as an open source project under{' '}
			<DocsToDoInline>license</DocsToDoInline>.
		</p>
	</Page>
);

export default withNamespaces()(Index);
