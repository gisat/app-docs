import Page, { SyntaxHighlighter } from '../../../Page';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

const AppStoryBody = () => {
	return (
		<Page title="AppStoryBody">
			<p>AppStoryBody is a container component.</p>
			<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
					<Prop name="activeApplicationStoryKey" type="string" />
					<Prop name="activeScope" type="object" defaultValue="false" />
					<Prop name="onMount" type="func" />
					<Prop name="onUnmount" type="func" />
					<Prop name="onStoryKeyChange" type="func" />
				</ComponentPropsTable>
			<h2>Code example</h2>
			<SyntaxHighlighter language="jsx">
{`import { AppStoryBody } from '@gisatcz/visat-components';

	{
		activeApplicationStoryKey : Select.router.getStory(state),
		activeScope:
			Select.cure.applicationStories.getActiveScopeByApplicationStoryKey(
				state,
				activeApplicationStoryKey
			),
	}

	{
		const componentId = 'ApplicationStoryBody';
		onMount: storyKey => {
			dispatch(Action.cure.applicationStories.use(storyKey, componentId));
		},
		onStoryKeyChange: storyKey => {
			dispatch(Action.cure.applicationStories.use(storyKey, componentId));
	}

	<AppStoryBody
		activeApplicationStoryKey={activeApplicationStoryKey}
		activeScope={activeScope}
		onMount={onMount}
		onUnmount={onUnmount}
		onStoryKeyChange={onStoryKeyChange}
	>
		<... />
	</AppStoryBody>`}
				</SyntaxHighlighter>
		</Page>
	);
};

AppStoryBody.propTypes = {};

export default AppStoryBody;
