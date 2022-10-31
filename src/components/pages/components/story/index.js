import Page, { SyntaxHighlighter } from '../../../Page';
import React from 'react';
import StoryExample from './examples/StoryExample';
import { Link } from 'react-router-dom';

import "./style.scss";

const Story = () => {
	return (
		<Page title="Story">
			<p>
				Story is a set of react components that can be used for presenting a project or basically anything that needs to be presented/documented.
				It was originally developed for CURE application to showcase applications that are connected to the project.
			</p>
			<p style={{textDecoration: "underline"}}>There are 2 main parts of the story:</p>
			<ul style={{marginLeft: "1rem"}}>
				<li>
					<Link to='./story/sidePanel'>Side panel</Link> 
					{' '}(left) - Contains navigation and a panel that serves as a guide for the story, usually contains text/graphs. </li>
				<li><Link to='./story/mainPanel'>Main panel</Link> (right) - Ideal for the main content like maps or images, these are then descibed in the side panel.</li>
			</ul>
			<p style={{marginTop: "1rem"}}>These panels need to be wrapped in a Story component that connects them and provides the correct functionality.</p>
			<b>At this moment, Story is available in the visat-components package.</b>
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
	StoryLink,
	StoryTags,
	StoryMainPanelFooter,
	StoryMainPanelCase
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

Story.propTypes = {};

export default Story;
