import Page, { SyntaxHighlighter } from '../../../../Page';
import ComponentPropsTable, { Section } from '../../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

import "./style.scss";
import AppStoryMainPanelExample from '../examples/AppStoryMainPanelExample';

const AppStoryMainPanel = () => {
	return (
		<Page title="AppStoryMainPanel">
			<p className='ptr-docs-story-isRequired' style={{color: "#2ea200"}}>NOT REQUIRED</p>
			<p>
				AppStoryMainPanel was created to hold the main content of the story, for example: maps, graphs...
				Like side panel, main panel is also split into sections - introduction, cases and footer.
				There are two components that can be used to hold the conent. For the section with cases,
				individual components with content should be created for each case.
			</p>
			<p style={{marginTop: "1rem"}}>
				<b>The number of sections in the main panel should be the same as in the side panel.</b>
				{' '}If the number is different, only the introduction and footer section is rendered.
			</p>
			<h2>Props</h2>
			<ComponentPropsTable>
				<Section name={"AppStoryMainPanel"}>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
				</Section>
				<Section name={"AppStoryMainPanelIntro"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
						<Prop name="backgroundImage" type="string">path to the background image</Prop>
				</Section>
				<Section name={"AppStoryMainPanelFooter"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
				</Section>
			</ComponentPropsTable>
			<h2>Code example</h2>
			<h3>Two showcases</h3>
			<SyntaxHighlighter language="jsx">
{`import {
	AppStoryContent, 
	AppStoryMainPanel, 
	AppStorySubheadline,
	AppStoryMainPanelIntro,
	AppStoryHeadline,
	AppStoryMainPanelFooter
} from '@gisatcz/visat-components';

<AppStoryContent className={''}>
	<AppStoryMainPanel className={''}>
		<AppStoryMainPanelIntro className={''}>
			<AppStoryHeadline className={''} isIntro>
				Headline
			</AppStoryHeadline>
			<AppStorySubheadline className={'is-intro'}>
				Maecenas aliquet accumsan leo. Nullam sit amet magna in magna gravida vehicula.
			</AppStorySubheadline>
		</AppStoryMainPanelIntro>
		<div className='showcase-1'></div>
		<div className='showcase-2'></div>
		<AppStoryMainPanelFooter className={''}>
			<AppStorySubheadline className={''} isFooterTitle>
				Donec iaculis gravida nulla.
			</AppStorySubheadline>
		</AppStoryMainPanelFooter>
	</AppStoryMainPanel>
</AppStoryContent>`}
				</SyntaxHighlighter>
				<h3>Custom intro background</h3>
				<SyntaxHighlighter language="jsx">
{`<AppStoryMainPanelIntro className={''} backgroundImage={require("../../../../../assets/appStoryCustomBackground.jpg")}>
	<.../>
</AppStoryMainPanelIntro>`}
				</SyntaxHighlighter>
				<AppStoryMainPanelExample backgroundImage={require("../../../../../assets/appStoryCustomBackground.jpg")}/>
				<h3>Footer</h3>
				<SyntaxHighlighter language="jsx">
{`<AppStoryMainPanelFooter className={''}>
	<.../>
</AppStoryMainPanelFooter>`}
				</SyntaxHighlighter>
				<AppStoryMainPanelExample showFooter/>
		</Page>
	);
};

AppStoryMainPanel.propTypes = {};

export default AppStoryMainPanel;