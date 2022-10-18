import Page, { SyntaxHighlighter } from '../../../Page';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

const AppStoryBody = () => {
	return (
		<Page title="AppStoryBody">
			<p className='ptr-docs-story-isRequired' style={{color: "#2ea200"}}>NOT REQUIRED</p>
			<p>AppStoryBody gives an option to control state of the story.</p>
			<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
					<Prop name="activeApplicationStoryKey" type="string" >key of the story, handy when more than 1 story is being used</Prop>
					<Prop name="activeScope" type="object" defaultValue="false">when true - renders component's children</Prop>
					<Prop name="onMount" type="func" />
					<Prop name="onUnmount" type="func" />
					<Prop name="onStoryKeyChange" type="func">takes activeApplicationStoryKey as an argument</Prop>
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
