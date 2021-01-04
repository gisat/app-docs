import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo} from '../../../../Page';
import {Link} from 'react-router-dom';

const CommonDataTypes = props => (
	<Page title="Common data types">
		<DocsToDo>About common data types</DocsToDo>

		<h2>Modifiers</h2>
		<DocsToDo>About modifiers</DocsToDo>

		<ul>
			<li>
				<Link to="./common/scope">Scope</Link>
			</li>
			<li>
				<Link to="./common/place">Place</Link> - representing specific place
				(area) on the Earth (Downing Street 10, Moscow, Poland, ...)
			</li>
			<li>
				<Link to="./common/period">Period</Link> - representing specific time
				interval (2011-09-11T8:46:00.000 to 2011-09-11T8:47:00.000, 1939, ...)
			</li>
			<li>
				<Link to="./common/case">Case</Link> - (kangaroo, maple, ...)
			</li>
			<li>
				<Link to="./common/scenario">Scenario</Link> - representing possible
				scenario of a given phenomenon (a park instead of buildings, New York
				urban area in 2050)
			</li>
		</ul>

		<h2>Templates</h2>
		<DocsToDo>About templates</DocsToDo>

		<ul>
			<li>
				<Link to="./common/attribute">Attribute</Link> - representing specific
				property of a feature (Population, Land Cover class, Displacement rate,
				...)
			</li>
			<li>
				<Link to="./common/attributeSet">Attribute set</Link> - representing set
				of attributes grouped by common characteristics (Demography, Land Cover,
				Interferometry, ...)
			</li>
			<li>
				<Link to="./common/layerTemplate">Layer template</Link>
			</li>
		</ul>

		<h2>Data</h2>
		<DocsToDo>About data</DocsToDo>

		<ul>
			<li>
				<Link to="./common/attributeDataSource">Attribute data source</Link>
			</li>
			<li>
				<Link to="./common/attributeRelation">Attribute relation</Link>
			</li>
			<li>
				<Link to="./common/spatialDataSource">Spatial data source</Link>
			</li>
			<li>
				<Link to="./common/spatialRelation">Spatial relation</Link>
			</li>
			<li>
				<Link to="./common/data">Data</Link>
			</li>
		</ul>

		<h2>Other data types</h2>

		<ul>
			<li>
				<Link to="./common/areaTree">Area tree</Link> - representing the
				analytical units hierarchy system (NUTS, GADM)
			</li>
			<li>
				<Link to="./common/areaTreeLevel">Area tree level</Link> - representing
				the level of the analytical units hierarchy system (NUTS1, GADM2)
			</li>
			<li>
				<Link to="./common/layerTree">Layer tree</Link> - representing the
				hierarchy of layers
			</li>
			<li>
				<Link to="./common/selection">Selection</Link>
			</li>
			<li>
				<Link to="./common/style">Style</Link> - representing set of rules for
				layer styling
			</li>
			<li>
				<Link to="./common/tag">Tag</Link>
			</li>
			<li>
				<Link to="./common/user">User</Link>
			</li>
			<li>
				<Link to="./common/userGroup">User group</Link>
			</li>
			<li>
				<Link to="./common/view">View</Link>
			</li>
		</ul>
	</Page>
);

export default withNamespaces()(CommonDataTypes);
