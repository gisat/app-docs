import Page, { SyntaxHighlighter } from '../../../../Page';
import ComponentPropsTable, { Section } from '../../../../ComponentPropsTable/ComponentPropsTable';
import { Prop } from '../../../../ComponentPropsTable/ComponentPropsTable';
import React from 'react';

import "./style.scss";
import StorySidePanelExample from '../examples/StorySidePanelExample';

const StorySidePanel = () => {
	return (
		<Page title="StorySidePanel">
			<p className='ptr-docs-story-isRequired' style={{color: "#2ea200"}}>NOT REQUIRED</p>
			<p>
				StorySidePanel serves as a guide through the story.
			</p>
			<p style={{textDecoration: "underline"}}>
				It is composed of two main parts:
			</p>
			<ul style={{marginLeft: "1rem"}}>
				<li>Navigation (left) is composed of buttons for jumping between sections of the story.</li>
				<li>SidePanel (right) is split into sections - introduction, cases and footer.
					For all three sections, there are components that can be used to hold the content.</li>
			</ul>
			<h3>Navigation icons</h3>
			<p style={{marginTop: "1rem"}}>
				First section in the side panel is always considered to be the introduction - home icon is assigned in the navigation.
				Last section is considered to be the footer - square icon in the navigation.
				You can change the icons in the navigation with "navigationIcons" prop. (see the last example)
			</p>
			<p>
				<b>The number of sections in the side panel should be the same as in the main panel.</b>
			</p>
			<h2>Props</h2>
			<ComponentPropsTable>
				<Section name={"StorySidePanel"}>
					<Prop name="children" type="node" />
					<Prop name="className" type="string" />
					<Prop name="hideNavigation" type="bool" defaultValue="false">if true - hides the navigation</Prop>
					<Prop name="navigationIcons" type="object" defaultValue="{home: 'ri-home', case: 'ri-dot', footer: 'ri-square'}" />
				</Section>
				<Section name={"StorySidePanelIntro"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
				</Section>
				<Section name={"StorySidePanelCase"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
				</Section>
				<Section name={"StorySidePanelFooter"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
				</Section>
			</ComponentPropsTable>
			<h2>Code example</h2>
			<h3>With navigation</h3>
			<SyntaxHighlighter language="jsx">
{`import {
	Story, 
	StorySidePanel, 
	StorySidePanelIntro, 
	StorySidePanelCase,
	StorySubheadline,
	StoryParagraph,
	StorySidePanelFooter,
} from '@gisatcz/visat-components';

<Story className={''} layout="" theme="default">
	<StorySidePanel className={''} hideNavigation={false}>
		<StorySidePanelIntro className={''}>
			<StorySubheadline className={''}>
				Service Rationale
			</StorySubheadline>
			<StoryParagraph className={''}>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc tincidunt ante vitae massa. Nunc dapibus tortor vel mi dapibus sollicitudin. Integer tempor. Donec iaculis gravida nulla. Fusce consectetuer risus a nunc. Pellentesque ipsum. Fusce tellus. Aliquam erat volutpat. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer vulputate sem a nibh rutrum consequat. Etiam neque. Nulla non lectus sed nisl molestie malesuada. Maecenas aliquet accumsan leo. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Fusce nibh. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus.
			</StoryParagraph>
		</StorySidePanelIntro>
		<StorySidePanelCase className={''}>
			<StorySubheadline className={''}>
				Showcase 1
			</StorySubheadline>
			<StoryParagraph className={''}>
				Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Integer lacinia. Duis pulvinar. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Duis pulvinar. Et harum quidem rerum facilis est et expedita distinctio. Nullam eget nisl. Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam. Duis condimentum augue id magna semper rutrum. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Pellentesque ipsum. Curabitur bibendum justo non orci. Praesent id justo in neque elementum ultrices. Integer lacinia. Quisque tincidunt scelerisque libero. Etiam bibendum elit eget erat. Nam quis nulla. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Fusce aliquam vestibulum ipsum. Nulla non arcu lacinia neque faucibus fringilla
			</StoryParagraph>
		</StorySidePanelCase>
		<StorySidePanelCase className={''}>
			<StorySubheadline className={''}>
				Showcase 2
			</StorySubheadline>
			<StoryParagraph className={''}>
				In rutrum. Quisque porta. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Aliquam erat volutpat. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Integer imperdiet lectus quis justo. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Mauris metus. Integer imperdiet lectus quis justo. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam id dolor. In rutrum.
			</StoryParagraph>
			<StoryParagraph>
				Nam sed tellus id magna elementum tincidunt. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. In rutrum. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Quisque porta. Nullam at arcu a est sollicitudin euismod. Nullam sit amet magna in magna gravida vehicula. Aliquam erat volutpat. Nullam rhoncus aliquam metus.
			</StoryParagraph>
		</StorySidePanelCase>
		<StorySidePanelFooter className={''}>
			<StorySubheadline className={''}>
				Footer
			</StorySubheadline>
			<StoryParagraph className={''}>
			Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Aliquam id dolor. Integer in sapien. Pellentesque pretium lectus id turpis. Duis pulvinar. Duis risus. Curabitur bibendum justo non orci. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Quisque porta. Fusce suscipit libero eget elit. Fusce aliquam vestibulum ipsum.
			</StoryParagraph>
		</StorySidePanelFooter>
	</StorySidePanel>
</Story>`}
				</SyntaxHighlighter>
				<div className='ptr-docs-story-sidePanelExample'>
					<StorySidePanelExample />
				</div>
				<h3>No navigation</h3>
				<SyntaxHighlighter language="jsx">
{`<StorySidePanel className={''} hideNavigation={true}>
	<.../>
</StorySidePanel>`}
				</SyntaxHighlighter>
				<div className='ptr-docs-story-sidePanelExample'>
					<StorySidePanelExample hideNavigation/>
				</div>
				<h3>Navigation behaviour on small screens</h3>
				<p>If the window is too small for the navigation to be shown completely, only the navigation arrows are rendered.</p>
				<div className='ptr-docs-story-sidePanelExample' style={{height: "10rem"}}>
					<StorySidePanelExample />
				</div>
				<h3>Custom navigation</h3>
				<p>Default icons in the navigation can be changed with the prop navigationIcons.</p>
				<SyntaxHighlighter language="jsx">
{`<StorySidePanel className={''} navigationIcons={{home: "ri-city", case: "ri-star", footer: "ri-star"}}>
	<.../>
</StorySidePanel>`}
				</SyntaxHighlighter>
				<div className='ptr-docs-story-sidePanelExample'>
					<StorySidePanelExample navigationIcons={{home: "ri-city", case: "ri-star", footer: "ri-star"}}/>
				</div>
		</Page>
	);
};

StorySidePanel.propTypes = {};

export default StorySidePanel;