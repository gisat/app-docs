import Page, { SyntaxHighlighter } from '../../../../Page';
import ComponentPropsTable, { Section } from '../../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

import "./style.scss";
import AppStoryMainPanelExample from '../examples/AppStoryMainPanelExample';

const AppStoryMainPanel = () => {
	return (
		<Page title="AppStoryMainPanel">
			<AppStoryMainPanelExample />
			<p style={{marginTop: "2rem"}}>AppStoryMainPanel is a container component.</p>
			<h2>Props</h2>
				<ComponentPropsTable>
					<Section name={"AppStoryMainPanel"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
					</Section>
					<Section name={"AppStoryMainPanelIntro"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
							<Prop name="backgroundImage" type="string" />
					</Section>
					<Section name={"AppStoryMainPanelFooter"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
					</Section>
				</ComponentPropsTable>
			<h2>Code example</h2>
			<SyntaxHighlighter language="jsx">
{`import {
	AppStoryContent, 
	AppStoryMainPanel, 
	AppStorySubheadline,
	AppStoryMainPanelIntro,
	AppStoryHeadline,
	AppStoryMainPanelFooter
} from '@gisatcz/visat-components';

<AppStoryContent className={''} layout="horizontal" theme="default">
	<AppStoryMainPanel className={''}>
		<AppStoryMainPanelIntro className={''}>
			<AppStoryHeadline className={'is-intro'}>
				Headline
			</AppStoryHeadline>
			<AppStorySubheadline className={'is-intro'}>
				Maecenas aliquet accumsan leo. Nullam sit amet magna in magna gravida vehicula.
			</AppStorySubheadline>
		</AppStoryMainPanelIntro>
		<div className='showcase-1'></div>
		<div className='showcase-2'></div>
		<AppStoryMainPanelFooter className={''}>
			<AppStorySubheadline className={'is-footerTitle'}>
				Donec iaculis gravida nulla.
			</AppStorySubheadline>
		</AppStoryMainPanelFooter>
	</AppStoryMainPanel>
</AppStoryContent>`}
				</SyntaxHighlighter>
		</Page>
	);
};

AppStoryMainPanel.propTypes = {};

export default AppStoryMainPanel;