import {
	AppStoryContent, 
	AppStorySidePanel, 
	AppStorySidePanelIntro, 
	AppStorySidePanelCase,
	AppStorySubheadline,
	AppStoryParagraph,
	AppStorySidePanelFooter,
} from '@gisatcz/visat-components';
import React from 'react';

import Proptypes from "prop-types";

import "./style.scss";

const AppStorySidePanelExample = ({hideNavigation, style, navigationIcons}) => {
	return (
		<div className='ptr-docs-story-sidePanelExample' style={style}>
			<AppStoryContent className={''} layout="" theme="default">
				<AppStorySidePanel className={''} hideNavigation={hideNavigation} navigationIcons={navigationIcons}>
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
			</AppStoryContent>
		</div>
	);
};

AppStorySidePanelExample.propTypes = {
	hideNavigation: Proptypes.bool,
	style: Proptypes.object,
	navigationIcons: Proptypes.object,
};

export default AppStorySidePanelExample;
