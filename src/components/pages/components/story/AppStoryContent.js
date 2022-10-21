import Page, { SyntaxHighlighter } from '../../../Page';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';
import AppStoryExample from './examples/AppStoryExample';

const AppStoryContent = () => {
	return (
		<Page title="AppStoryContent">
			<p className='ptr-docs-story-isRequired' style={{color: "#e2575a"}}>REQUIRED</p>
			<p>
				AppStoryContent is a required component that holds the main content of the story.
				It connects side panel with main panel and ensures that story works as expected.
			</p>
			<p>
				As the user is scrolling in the side panel, the location of the user's actual window is being recorded.
				When the window reaches top of the next section, this section is set as a new active section
				and content in the main panel is changed.
			</p>
			<h2>Props</h2>
			<ComponentPropsTable>
				<Prop name="children" type="node" />
				<Prop name="className" type="string" />
				<Prop name="layout" type="string" defaultValue="horizontal">horizontal || vertical</Prop>
				<Prop name="theme" type="object" defaultValue="default">cure || default</Prop>
			</ComponentPropsTable>
			<h2>Code example</h2>
			<h3>Vertical & default</h3>
			<SyntaxHighlighter language="jsx">
{`import { AppStoryContent } from '@gisatcz/visat-components';

	<AppStoryContent
		layout="vertical"
		theme="default">
	>
		<... />
	</AppStoryContent>`}
			</SyntaxHighlighter>
			<AppStoryExample layout="vertical" theme="default" />
			<h3>Horizontal & cure</h3>
			<SyntaxHighlighter language="jsx">
{`import { AppStoryContent } from '@gisatcz/visat-components';

	<AppStoryContent
		layout="horizontal"
		theme="cure">
	>
		<... />
	</AppStoryContent>`}
			</SyntaxHighlighter>
			<AppStoryExample layout="horizontal" theme="cure" />
		</Page>
	);
};

AppStoryContent.propTypes = {};

export default AppStoryContent;
