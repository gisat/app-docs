import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../Page';
import {Link} from 'react-router-dom';

const Packages = props => (
	<Page title="Packages">
		<p>
			Panther packages contain common (core?) functionality used in the most of
			Panther-based <Link to="/architecture/applications">applications</Link>.
		</p>

		<h2>
			ptr-core{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-core"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-core"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<p>
			config defaults, constants, server side rendering, base style & style
			variables, HoverHandler
		</p>

		<h2>
			ptr-state{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-state"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-state"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<p>
			Common data types reducers, actions, & selectors. Container components.
		</p>

		<h2>
			ptr-utils{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-utils"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-utils"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>

		<h2>
			ptr-atoms{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-atoms"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-atoms"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<p>Atomic presentational components.</p>
		<Link to="/components/atoms">Docs</Link>

		<h2>
			ptr-maps{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-maps"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-maps"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<p>Maps-related presentational components.</p>
		<Link to="/components/Maps">Docs</Link>

		<h2>
			ptr-charts{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-charts"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-charts"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<p>Charts-related presentational components.</p>
		<Link to="/components/visualizations">Docs</Link>

		<h2>
			ptr-components{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-components"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-components"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<p>The rest of common presentational components.</p>

		<h2>
			ptr-router{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-router"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-router"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<a
			href="https://github.com/gisat-panther/ptr-router/blob/master/README.md"
			rel="noopener noreferrer"
		>
			Docs
		</a>

		<h2>
			ptr-locales{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-locales"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-locales"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<p>Internationalization.</p>
		<Link to="/code/internationalization">Docs</Link>

		<h2>
			ptr-tile-grid{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/ptr-tile-grid"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-tile-grid"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<a
			href="https://github.com/gisat-panther/ptr-tile-grid/blob/master/README.md"
			rel="noopener noreferrer"
		>
			Docs
		</a>

		<h2>
			cross-package-react-context{' '}
			<span>
				(
				<a
					href="https://github.com/gisat-panther/cross-package-react-context"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				,{' '}
				<a
					href="https://www.npmjs.com/package/@gisatcz/ptr-cross-package-react-context"
					target="_blank"
					rel="noopener noreferrer"
				>
					npm
				</a>
				)
			</span>
		</h2>
		<p>Singleton React context manager for use across packages.</p>
	</Page>
);

export default withNamespaces()(Packages);
