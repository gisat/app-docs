import {
	Story, 
	StoryMainPanel, 
	StorySubheadline,
	StoryMainPanelIntro,
	StoryHeadline,
	StoryMainPanelFooter
} from '@gisatcz/visat-components';
import React from 'react';

import Proptypes from "prop-types";

import "./style.scss";

const StoryMainPanelExample = ({backgroundImage, showFooter}) => {
	return (
		<Story className={''} >
			<StoryMainPanel className={''} >
				{showFooter ?
					<StoryMainPanelFooter className={''}>
						<StorySubheadline className={''} isFooterTitle>
							Footer text.
						</StorySubheadline>
					</StoryMainPanelFooter>
					:
					<StoryMainPanelIntro className={''} backgroundImage={backgroundImage}>
						<StoryHeadline className={''} isIntro>
							Headline
						</StoryHeadline>
						<StorySubheadline className={''} isIntro>
							Maecenas aliquet accumsan leo. Nullam sit amet magna in magna gravida vehicula.
						</StorySubheadline>
					</StoryMainPanelIntro>
				}
				<StoryMainPanelFooter className={''}>
					<StorySubheadline className={''} isFooterTitle>
						Footer text.
					</StorySubheadline>
				</StoryMainPanelFooter>
			</StoryMainPanel>
		</Story>
	);
};

StoryMainPanelExample.propTypes = {
	backgroundImage: Proptypes.string,
	showFooter: Proptypes.bool,
};

export default StoryMainPanelExample;