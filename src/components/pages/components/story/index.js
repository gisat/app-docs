import Page from '../../../Page';
import React from 'react';
import AppStoryExample from './examples/AppStoryExample';
import { Link } from 'react-router-dom';

import "./style.scss";

const Story = () => {
	return (
		<Page title="Story">
			<AppStoryExample />
			<p className='ptr-docs-story-paragraph'>
				Story is a set of react components can be used for presenting a project or basically anything that needs to be presented/documented.
				It was originally developed for CURE application to present applications that are connected to the project.
			</p>
			<p className='ptr-docs-story-paragraph'>There are 2 main parts of the story:</p>
			<ul style={{marginLeft: "1rem"}}>
				<li>
					<Link to='./story/sidePanel'>Side panel</Link> 
					{' '}(left) - Contains navigation and a panel that serves as a guide for the story, usually contains text/graphs. </li>
				<li><Link to='./story/mainPanel'>Main panel</Link> (right) - Ideal for the main content like maps or images, these are then descibed in the side panel.</li>
			</ul>
			<p className='ptr-docs-story-paragraph'>At this moment, Story is available in the visat-components package.</p>
		</Page>
	);
};

Story.propTypes = {};

export default Story;
