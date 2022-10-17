import {
	AppStoryContent, 
	AppStoryMainPanel, 
	AppStorySubheadline,
	AppStoryMainPanelIntro,
	AppStoryHeadline,
	AppStoryMainPanelFooter
} from '@gisatcz/visat-components';
import React from 'react';

import "./style.scss";

const AppStoryMainPanelExample = () => {
	return (
		<div className='ptr-docs-story-example'>
			<AppStoryContent className={''} layout="horizontal" theme="default">
				<AppStoryMainPanel className={''}>
					<AppStoryMainPanelIntro className={''}>
						<AppStoryHeadline className={''} isIntro>
							Headline
						</AppStoryHeadline>
						<AppStorySubheadline className={''} isIntro>
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
			</AppStoryContent>
		</div>
	);
};

AppStoryMainPanelExample.propTypes = {};

export default AppStoryMainPanelExample;