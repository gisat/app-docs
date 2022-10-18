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
			<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
					<Prop name="layout" type="string" defaultValue="horizontal">horizontal || vertical</Prop>
					<Prop name="theme" type="object" defaultValue="default">cure || default</Prop>
				</ComponentPropsTable>
			<h2>Code example</h2>
			<h3>vertical & default</h3>
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
			<h3>horizontal & cure</h3>
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
