import Page from '../../../Page';
import React from 'react';
import AppStoryExample from './examples/AppStoryExample';
import { Link } from 'react-router-dom';

const Story = () => {
	return (
		<Page title="Story">
			<p>Story can be used for presenting a story of a project.</p>
			<AppStoryExample />
			<br />
			<p>There are 2 main parts of the story:</p>
				<ul>
					<li><Link to='./story/sidePanel'>Side panel</Link> (left) - Serves as a guide for the story, usually contains text/graphs.</li>
					<li><Link to='./story/mainPanel'>Main panel</Link> (right) - Ideal for the main content like maps or images.</li>
				</ul>
			<br />
			<p>Together they create organized and clean user interface.</p>
			<p>In the moment it is available in the visat-components package.</p>
		</Page>
	);
};

Story.propTypes = {};

export default Story;
