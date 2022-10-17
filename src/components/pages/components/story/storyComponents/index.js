import Page, { SyntaxHighlighter } from '../../../../Page';
import React from 'react';
import ComponentPropsTable, { Prop, Section } from '../../../../ComponentPropsTable/ComponentPropsTable';
import AppStoryComponentsExample from '../examples/AppStoryComponentsExample';

const AppStoryComponents = () => {
	return (
		<Page title="Story components">
			<AppStoryComponentsExample />
			<p style={{marginTop: "2rem"}}>Story components are standalone components that can be applied to text.</p>
			<ComponentPropsTable>
					<Section name={"AppStoryHeadline"}>
						<Prop name="children" type="node" />
						<Prop name="className" type="string" />
						<Prop name="isIntro" type="bool" defaultValue="false" />
					</Section>
					<Section name={"AppStorySubheadline"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
							<Prop name="isIntro" type="bool" defaultValue="false" />
							<Prop name="isFooterTitle" type="bool" defaultValue="false" />
					</Section>
					<Section name={"AppStoryParagraph"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
					</Section>
					<Section name={"AppStoryLink"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
					</Section>
					<Section name={"AppStoryTags"}>
							<Prop name="children" type="node" />
							<Prop name="className" type="string" />
							<Prop name="onMount" type="func" />
							<Prop name="className" type="func" />
							<Prop name="tagKeys" type="number" />
							<Prop name="tags" type="array" />
					</Section>
				</ComponentPropsTable>
			<h2>Code example</h2>
			<SyntaxHighlighter language="jsx">
{`import {
	AppStoryContent,
	AppStorySidePanel, 
	AppStoryMainPanel, 
	AppStorySidePanelIntro, 
	AppStorySidePanelCase,
	AppStorySubheadline,
	AppStoryParagraph,
	AppStorySidePanelFooter,
	AppStoryMainPanelIntro,
	AppStoryHeadline,
	AppStoryMainPanelFooter
} from '@gisatcz/visat-components';

<AppStoryContent className={''} layout="" theme="default">
	<AppStorySidePanel className={''} >
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
	<AppStoryMainPanel className={''}>
		<AppStoryMainPanelIntro className={''}>
			<AppStoryHeadline className={''} isIntro>
				Headline
			</AppStoryHeadline>
			<AppStorySubheadline className={''} isIntro>
				Maecenas aliquet accumsan leo. Nullam sit amet magna in magna gravida vehicula.
			</AppStorySubheadline>
			<AppStoryTags
				className={''}
				tagKeys={activeApplicationStory?.data?.tagKeys}
				tags={tags}
			/>
		</AppStoryMainPanelIntro>
		<div className='showcase-1'></div>
		<div className='showcase-2'></div>
		<AppStoryMainPanelFooter className={''}>
			<AppStorySubheadline className={''} isFooterTitle>
				Donec iaculis gravida nulla.
			</AppStorySubheadline>
				<ul className={'cure-AppStory-listLinks'}>
				<li>
					<AppStoryLink className={''}>
						Copernicus LST products description -{' '}
						<a href="https://sentinels.copernicus.eu/web/sentinel/user-guides/sentinel-3-slstr/overview/geophysical-measurements/land-surface-temperature">
							the Sentinel-3 SLSTR User Guide
						</a>
					</AppStoryLink>
				</li>
				<li>
					<AppStoryLink className={''}>
						Copernicus LST products description -{' '}
						<a href="https://land.copernicus.eu/global/products/lst">
							Copernicus Global Land service
						</a>
					</AppStoryLink>
				</li>
			</ul>
		</AppStoryMainPanelFooter>
	</AppStoryMainPanel>
</AppStoryContent>`}
				</SyntaxHighlighter>
		</Page>
	);
};

AppStoryComponents.propTypes = {};

export default AppStoryComponents;
