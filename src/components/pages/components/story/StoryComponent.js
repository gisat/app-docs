import Page, { SyntaxHighlighter } from '../../../Page';
import ComponentPropsTable from '../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';
import StoryExample from './examples/StoryExample';

const StoryComponent = () => {
	return (
		<Page title="Story component">
			<p className='ptr-docs-story-isRequired' style={{color: "#e2575a"}}>REQUIRED</p>
			<p>
				Story is a required fundamental component that holds all the content of story.
				It connects side panel with main panel and ensures that story works as expected.
			</p>
			<h3>Functionality</h3>
			<p>
				As the user is scrolling in the side panel, the location of the user's actual window is being recorded.
				When the user's window reaches top of a next section, this section is set as a new active section
				and content in the main panel is changed. If the user reaches bottom - the last section (footer)
				is set as the active section. <b>It is important that sections have reasonable heights.</b>
			</p>
			<h3>Panel layout</h3>
			<p>
				By default, the content is layed out horizontally. On smaller screens the layout changes to vertical.
				The layout can be also changed with a prop "panelLayout".
			</p>
			<h3>Theme</h3>
			<p>
				Theme affects colors of the navigation icons and overlay in the main panel's introduction section.
				It can be changed with a prop "theme".
			</p>
			<h2>Props</h2>
			<ComponentPropsTable>
				<Prop name="children" type="node" />
				<Prop name="className" type="string" />
				<Prop name="panelLayout" type="string" defaultValue="horizontal">horizontal || vertical</Prop>
				<Prop name="theme" type="object" defaultValue="default">cure || default</Prop>
			</ComponentPropsTable>
			<h2>Code example</h2>
			<h3>Vertical & default</h3>
			<SyntaxHighlighter language="jsx">
{`import { Story } from '@gisatcz/visat-components';

	<Story
		panelLayout="vertical"
		theme="default">
	>
		<... />
	</Story>`}
			</SyntaxHighlighter>
			<div className='ptr-docs-story-example'>
				<StoryExample panelLayout="vertical" theme="default" />
			</div>
			<h3>Horizontal & cure</h3>
			<SyntaxHighlighter language="jsx">
{`import { Story } from '@gisatcz/visat-components';

	<Story
		panelLayout="horizontal"
		theme="cure">
	>
		<... />
	</Story>`}
			</SyntaxHighlighter>
			<div className='ptr-docs-story-example'>
				<StoryExample panelLayout="horizontal" theme="cure" />
			</div>
		</Page>
	);
};

StoryComponent.propTypes = {};

export default StoryComponent;
