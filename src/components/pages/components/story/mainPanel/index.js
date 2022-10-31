import Page, { SyntaxHighlighter } from '../../../../Page';
import ComponentPropsTable, { Section } from '../../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

import "./style.scss";
import StoryMainPanelExample from '../examples/StoryMainPanelExample';

const StoryMainPanel = () => {
	return (
		<Page title="StoryMainPanel">
			<p className='ptr-docs-story-isRequired' style={{color: "#2ea200"}}>NOT REQUIRED</p>
			<p>
				StoryMainPanel was created to hold the main content of the story, for example: maps or graphs...
				Like the side panel, main panel is also split into sections - introduction, cases and footer.
				There are three components that can be optionally used to hold the content.
			</p>
			<p style={{marginTop: "1rem"}}>
				<b>The number of sections in the main panel should be the same as in the side panel.</b>
				{' '}If the number is different, only the introduction and footer section is rendered.
			</p>
			<h2>Props</h2>
			<ComponentPropsTable>
				<Section name={"StoryMainPanel"}>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
				</Section>
				<Section name={"StoryMainPanelIntro"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
						<Prop name="backgroundImage" type="string">path to the background image</Prop>
				</Section>
				<Section name={"StoryMainPanelCase"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
				</Section>
				<Section name={"StoryMainPanelFooter"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
				</Section>
			</ComponentPropsTable>
			<h2>Code example</h2>
			<h3>Two showcases</h3>
			<SyntaxHighlighter language="jsx">
{`import {
	Story, 
	StoryMainPanel, 
	StorySubheadline,
	StoryMainPanelIntro,
	StoryHeadline,
	StoryMainPanelFooter,
	StoryMainPanelCase
} from '@gisatcz/visat-components';

<Story className={''}>
	<StoryMainPanel className={''}>
		<StoryMainPanelIntro className={''}>
			<StoryHeadline className={''} isIntro>
				Headline
			</StoryHeadline>
			<StorySubheadline className={'is-intro'}>
				Maecenas aliquet accumsan leo. Nullam sit amet magna in magna gravida vehicula.
			</StorySubheadline>
		</StoryMainPanelIntro>
		<StoryMainPanelCase>
			<h2>Showcase 1</h2>
		</StoryMainPanelCase>
		<StoryMainPanelCase>
			<h2>Showcase 2</h2>
		</StoryMainPanelCase>
		<StoryMainPanelFooter className={''}>
			<StorySubheadline className={''} isFooterTitle>
				Donec iaculis gravida nulla.
			</StorySubheadline>
		</StoryMainPanelFooter>
	</StoryMainPanel>
</Story>`}
				</SyntaxHighlighter>
				<h3>Custom intro background</h3>
				<SyntaxHighlighter language="jsx">
{`<StoryMainPanelIntro className={''} backgroundImage={require("../../../../../assets/storyCustomBackground.jpg")}>
	<.../>
</StoryMainPanelIntro>`}
				</SyntaxHighlighter>
				<div className='ptr-docs-story-example'>
					<StoryMainPanelExample backgroundImage={require("../../../../../assets/storyCustomBackground.jpg")}/>
				</div>
				<h3>Footer</h3>
				<SyntaxHighlighter language="jsx">
{`<StoryMainPanelFooter className={''}>
	<.../>
</StoryMainPanelFooter>`}
				</SyntaxHighlighter>
				<div className='ptr-docs-story-example'>
					<StoryMainPanelExample showFooter/>
				</div>
		</Page>
	);
};

StoryMainPanel.propTypes = {};

export default StoryMainPanel;