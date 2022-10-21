import Page, { SyntaxHighlighter } from '../../../../Page';
import ComponentPropsTable, { Section } from '../../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

import "./style.scss";
import AppStorySidePanelExample from '../examples/AppStorySidePanelExample';

const AppStorySidePanel = () => {
	return (
		<Page title="AppStorySidePanel">
			<p className='ptr-docs-story-isRequired' style={{color: "#2ea200"}}>NOT REQUIRED</p>
			<p>
				AppStorySidePanel serves as a guide through the story and is composed of two main parts:
			</p>
			<ul style={{marginLeft: "1rem"}}>
				<li>Navigation (left) is composed of buttons for jumping between sections of the story.</li>
				<li>SidePanel (right) is split into sections - introduction, cases and footer.
					For all three sections, there are components that can be used to hold the content.</li>
			</ul>
			<p style={{marginTop: "1rem"}}>
				<b>The number of sections in the side panel should be the same as in the main panel.</b>
			</p>
			<h2>Props</h2>
			<ComponentPropsTable>
				<Section name={"AppStorySidePanel"}>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
					<Prop name="hideNavigation" type="bool" defaultValue="false">if true - hides the navigation</Prop>
				</Section>
				<Section name={"AppStorySidePanelIntro"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
				</Section>
				<Section name={"AppStorySidePanelCase"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
				</Section>
				<Section name={"AppStorySidePanelFooter"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
				</Section>
			</ComponentPropsTable>
			<h2>Code example</h2>
			<h3>With navigation</h3>
			<SyntaxHighlighter language="jsx">
{`import {
	AppStoryContent, 
	AppStorySidePanel, 
	AppStorySidePanelIntro, 
	AppStorySidePanelCase,
	AppStorySubheadline,
	AppStoryParagraph,
	AppStorySidePanelFooter,
} from '@gisatcz/visat-components';

<AppStoryContent className={''} layout="" theme="default">
	<AppStorySidePanel className={''} hideNavigation={false}>
		<AppStorySidePanelIntro className={''}>
			<AppStorySubheadline className={''}>
				Service Rationale
			</AppStorySubheadline>
			<AppStoryParagraph className={''}>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc tincidunt ante vitae massa. Nunc dapibus tortor vel mi dapibus sollicitudin. Integer tempor. Donec iaculis gravida nulla. Fusce consectetuer risus a nunc. Pellentesque ipsum. Fusce tellus. Aliquam erat volutpat. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer vulputate sem a nibh rutrum consequat. Etiam neque. Nulla non lectus sed nisl molestie malesuada. Maecenas aliquet accumsan leo. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Fusce nibh. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus.
			</AppStoryParagraph>
		</AppStorySidePanelIntro>
		<AppStorySidePanelCase className={''}>
			<AppStorySubheadline className={''}>
				Showcase 1
			</AppStorySubheadline>
			<AppStoryParagraph className={''}>
				Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Integer lacinia. Duis pulvinar. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Duis pulvinar. Et harum quidem rerum facilis est et expedita distinctio. Nullam eget nisl. Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam. Duis condimentum augue id magna semper rutrum. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Pellentesque ipsum. Curabitur bibendum justo non orci. Praesent id justo in neque elementum ultrices. Integer lacinia. Quisque tincidunt scelerisque libero. Etiam bibendum elit eget erat. Nam quis nulla. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Fusce aliquam vestibulum ipsum. Nulla non arcu lacinia neque faucibus fringilla
			</AppStoryParagraph>
		</AppStorySidePanelCase>
		<AppStorySidePanelCase className={''}>
			<AppStorySubheadline className={''}>
				Showcase 2
			</AppStorySubheadline>
			<AppStoryParagraph className={''}>
			In rutrum. Quisque porta. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Aliquam erat volutpat. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Integer imperdiet lectus quis justo. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Mauris metus. Integer imperdiet lectus quis justo. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam id dolor. In rutrum.
			</AppStoryParagraph>
		</AppStorySidePanelCase>
		<AppStorySidePanelFooter className={''}>
			<AppStorySubheadline className={''}>
				Footer
			</AppStorySubheadline>
			<AppStoryParagraph className={''}>
			Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Aliquam id dolor. Integer in sapien. Pellentesque pretium lectus id turpis. Duis pulvinar. Duis risus. Curabitur bibendum justo non orci. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Quisque porta. Fusce suscipit libero eget elit. Fusce aliquam vestibulum ipsum.
			</AppStoryParagraph>
		</AppStorySidePanelFooter>
	</AppStorySidePanel>
</AppStoryContent>`}
				</SyntaxHighlighter>
				<AppStorySidePanelExample />
				<h3>No navigation</h3>
				<SyntaxHighlighter language="jsx">
{`<AppStorySidePanel className={''} hideNavigation={true}>
	<.../>
</AppStorySidePanel>`}
				</SyntaxHighlighter>
				<AppStorySidePanelExample hideNavigation/>
				<h3>Navigation behaviour on small screens</h3>
				<p>If the window is too small for the navigation to be shown completely, only the navigation arrows are rendered.</p>
				<AppStorySidePanelExample style={{height: "10rem"}}/>
		</Page>
	);
};

AppStorySidePanel.propTypes = {};

export default AppStorySidePanel;