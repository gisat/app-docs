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

const AppStoryMainPanelExample = ({backgroundImage, showFooter}) => {
	return (
		<div className='ptr-docs-story-example'>
			<AppStoryContent className={''} >
				<AppStoryMainPanel className={''} >
					{showFooter ?
						<AppStoryMainPanelFooter className={''}>
							<AppStorySubheadline className={''} isFooterTitle>
								Footer text.
							</AppStorySubheadline>
						</AppStoryMainPanelFooter>
						:
						<AppStoryMainPanelIntro className={''} backgroundImage={backgroundImage}>
							<AppStoryHeadline className={''} isIntro>
								Headline
							</AppStoryHeadline>
							<AppStorySubheadline className={''} isIntro>
								Maecenas aliquet accumsan leo. Nullam sit amet magna in magna gravida vehicula.
							</AppStorySubheadline>
						</AppStoryMainPanelIntro>
					}
						<AppStoryMainPanelFooter className={''}>
							<AppStorySubheadline className={''} isFooterTitle>
								Footer text.
							</AppStorySubheadline>
						</AppStoryMainPanelFooter>
				</AppStoryMainPanel>
			</AppStoryContent>
		</div>
	);
};

AppStoryMainPanelExample.propTypes = {};

export default AppStoryMainPanelExample;