import Page, { SyntaxHighlighter } from '../../../Page';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

const AppStoryContent = () => {
	return (
		<Page title="AppStoryContent">
			<p>AppStoryContent is a container component.</p>
			<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
					<Prop name="layout" type="string" defaultValue="horizontal">horizontal || vertical</Prop>
					<Prop name="theme" type="object" defaultValue="default">cure || default</Prop>
				</ComponentPropsTable>
			<h2>Code example</h2>
			<SyntaxHighlighter language="jsx">
{`import { AppStoryContent } from '@gisatcz/visat-components';

	<AppStoryContent
		layout="vertical"
		theme="cure">
	>
		<... />
	</AppStoryContent>`}
				</SyntaxHighlighter>
		</Page>
	);
};

AppStoryContent.propTypes = {};

export default AppStoryContent;
