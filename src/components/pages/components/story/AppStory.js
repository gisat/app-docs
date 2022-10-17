import Page, { SyntaxHighlighter } from '../../../Page';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

const AppStory = () => {
	return (
		<Page title="AppStory">
			<p>AppStory is a container component.</p>
			<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
					<Prop name="isReady" type="bool" defaultValue="false" />
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
