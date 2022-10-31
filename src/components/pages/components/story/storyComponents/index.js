import Page, { SyntaxHighlighter } from '../../../../Page';
import React from 'react';
import ComponentPropsTable, { Prop, Section } from '../../../../ComponentPropsTable/ComponentPropsTable';
import StoryExample from '../examples/StoryExample';

const StoryComponents = () => {
	return (
		<Page title="Story components">
			<p className='ptr-docs-story-isRequired' style={{color: "#2ea200"}}>NOT REQUIRED</p>
			<p>
				StoryComponents are standalone components that can be used in the side panel's or main panel's sections.
			</p>
			<h2>Props</h2>
			<ComponentPropsTable>
					<Section name={"StoryHeadline"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
						<Prop name="isIntro" type="bool" defaultValue="false" />
					</Section>
					<Section name={"StorySubheadline"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
							<Prop name="isIntro" type="bool" defaultValue="false" />
							<Prop name="isFooterTitle" type="bool" defaultValue="false" />
					</Section>
					<Section name={"StoryParagraph"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
					</Section>
					<Section name={"StoryLink"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
					</Section>
					<Section name={"StoryTags"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
							<Prop name="onMount" type="func" />
							<Prop name="className" type="func" />
							<Prop name="tagKeys" type="number" />
							<Prop name="tags" type="array">{'[{key: 2, data: {nameDisplay: "rural"}}]'}</Prop>
					</Section>
				</ComponentPropsTable>
			<h2>Code example</h2>
			<SyntaxHighlighter language="jsx">
{`import {
	Story,
	StorySidePanel, 
	StoryMainPanel, 
	StorySidePanelIntro, 
	StorySidePanelCase,
	StorySubheadline,
	StoryParagraph,
	StorySidePanelFooter,
	StoryMainPanelIntro,
	StoryHeadline,
	StoryMainPanelFooter
} from '@gisatcz/visat-components';

<Story className={''}>
	<StorySidePanel className={''}>
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
			<ul className={''} style={{marginLeft: "1rem"}}>
				<li>
					<StoryLink className={''}>
						Ut tempus purus at lorem -{' '}
						<a href="./storyComponents">
							aenean placerat
						</a>
					</StoryLink>
				</li>
				<li>
					<StoryLink className={''}>
						Curabitur bibendum justo non orci -{' '}
						<a href="./storyComponents">
							mauris metus
						</a>
					</StoryLink>
				</li>
			</ul>
		</StorySidePanelFooter>
	</StorySidePanel>
	<StoryMainPanel className={''}>
		<StoryMainPanelIntro className={''}>
			<StoryHeadline className={''} isIntro>
				Headline
			</StoryHeadline>
			<StorySubheadline className={''} isIntro>
				Maecenas aliquet accumsan leo. Nullam sit amet magna in magna gravida vehicula.
			</StorySubheadline>
			<StoryTags
				className={''}
				tags={[
					{key: 0, data: {nameDisplay: "nature"}},
					{key: 1, data: {nameDisplay: "forest"}},
					{key: 2, data: {nameDisplay: "rural"}}
				]}
			/>
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
				<div className='ptr-docs-story-example'>
					<StoryExample />
				</div>
		</Page>
	);
};

StoryComponents.propTypes = {};

export default StoryComponents;
