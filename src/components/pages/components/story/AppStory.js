import Page, { SyntaxHighlighter } from '../../../Page';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

import "./style.scss";

const AppStory = () => {
	return (
		<Page title="AppStory">
			<p className='ptr-docs-story-isRequired' style={{color: "#2ea200"}}>NOT REQUIRED</p>
			<p>
				AppStory is meant to provide the option to add additional content to the story (for example - header).
				It is necessary to define the isReady prop to show the component's children.
			</p>
			<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
					<Prop name="isReady" type="bool" defaultValue="false">when true - renders component's children</Prop>
				</ComponentPropsTable>
			<h2>Code example</h2>
			<SyntaxHighlighter language="jsx">
{`import { AppStory } from '@gisatcz/visat-components';

	{isReady: !!Select.app.getCompleteConfiguration(state)}

	<AppStory isReady={isReady}>
		<ApplicationStoryHeader />
		<... />
	</AppStory>`}
				</SyntaxHighlighter>
		</Page>
	);
};

AppStory.propTypes = {};

export default AppStory;
