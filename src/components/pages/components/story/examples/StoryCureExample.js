import {
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
	StoryMainPanelCase,
} from '@gisatcz/visat-components';
import React from 'react';

import {Button} from '@gisatcz/ptr-atoms';

import {
	ReactLeafletMap,
	PresentationMap,
	MapControls,
} from '@gisatcz/ptr-maps';

import "./style.scss";
import Page, { SyntaxHighlighter } from "../../../../Page";

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

class MapCenterWrapper extends React.PureComponent {
	render() {
		const view = this.props.view;

		return (
			<div className="ptr-map-wrapper">
				<div
					style={{
						background: 'white',
						position: 'absolute',
						bottom: 0,
						left: 0,
						zIndex: 2,
					}}
				>
					{view?.center ? (
						<span>
							lat: {view.center.lat}, lon: {view.center.lon}
						</span>
					) : null}
				</div>
				{this.props.children}
			</div>
		);
	}
}

const StoryCureExample = () => {
	return (
		<Page title="CURE example">
			<p>This example was created for the CURE application.</p>
			<div className='ptr-docs-story-cureExample'>
				<div className='ptr-docs-story-cureExample-nav'>CURE NAVIGATION</div>
				<div className='ptr-docs-story-cureExample-wrapper'>	
					<Story className={''} theme="cure">
						<StorySidePanel className={''}>
							<StorySidePanelIntro className={''}>
								<StorySubheadline className={''}>
									Service Rationale
								</StorySubheadline>
								<StoryParagraph className={''}>
									The surface temperature is one of the most important parameters in
									the physical processes of urban surface energy, water balance and
									the land-atmosphere exchanges. Thence, it constitutes a valuable
									information source for the understanding of the natural and human
									components of the Earth system. In this context, the service
									provides frequent local scale surface temperature estimations, which
									are essential data for other CURE services too, i.e. the{' '}
									<a href="">
										Surface Urban Heat Island (UHI) Assessment Service
									</a>
									, the{' '}
									<a href="">
										Urban Heat Emissions Monitoring Service
									</a>{' '}
									and the{' '}
									<a href="">
										Urban Heat Storage Monitoring Service
									</a>
									.
								</StoryParagraph>
							</StorySidePanelIntro>
							<StorySidePanelCase className={''}>
								<StorySubheadline className={''}>
									Detailed Land Surface Temperature (LST)
								</StorySubheadline>
								<StoryParagraph className={''}>
									This CURE service generates daily land surface temperature maps for
									urban areas exploiting the Copernicus Sentinel-3 thermal
									acquisitions and detailed dynamic information on the land surface
									from Sentinel-2 and land cover / land use information from the CLMS
									and the atmosphere information from C3S. Similar maps available from
									Copernicus are coarse, with a pixel corresponding to more than 1 km
									on the ground, which makes it difficult to asses the intra-urban
									variations of surface temperature. The CURE urban LST compensates
									the spatial-temporal resolution trade-off of the satellite LST
									products, providing dense time series of 100 m spatial resolution
									LST. See example and compare the CURE LST product in 100m resolution
									(left) with original Copernicus service in 1km resolution (right).{' '}
								</StoryParagraph>
							</StorySidePanelCase>
							<StorySidePanelCase className={''}>
								<StorySubheadline className={''}>
									Intra-urban Surface Temperature Dynamics
								</StorySubheadline>
								<StoryParagraph className={''}>
									The CURE LST maps resolve the intra-urban variations of surface
									temperature, while providing insights on the surface temperature
									dynamics, with up to 4 maps per day. These detailed, frequent
									surface temperature maps are highly important as input for assessing
									the surface urban heat island, the heat emissions and the heat
									storage and the thermal comfort. See interactive timeline of the
									temporal distribution of Sentinel-3 LST maps for LST daytime and
									nighttime values. Select the point in the timeline and see a
									corresponding LST product in a map.
								</StoryParagraph>
							</StorySidePanelCase>
							<StorySidePanelCase className={''}>
								<StorySubheadline className={''}>
									Aggregated temperatures for user-defined units
								</StorySubheadline>
								<StoryParagraph className={''}>
									<em data-tour="showcase-about">
										Land Surface Temperature (LST) information can be related to user
										defined units (e.g. urban plots, neighbourhood blocks, districts)
										to be ready for specific level of analysis. See visualization of
										CLMS Urban Atlas polygons with aggregated temperatures coming from
										the CURE Land Surface Temperature (LST) service. Hoover on the map
										to explore aggregated land surface temperature values. Use slider
										to inspect variation, value distribution and differences between
										daytime and nighttime.
									</em>
								</StoryParagraph>
							</StorySidePanelCase>
							<StorySidePanelFooter className={''}>
								<StorySubheadline className={''}>
									Added value discussion
								</StorySubheadline>
								<StoryParagraph className={''}>
									The surface temperature is one of the most important parameters in
									the physical processes of urban surface energy and water balance
									including the land-atmosphere exchanges. CURE Land Surface
									Temperature dynamics service provides detailed spatial-temporal
									monitoring and analysis of the land surface temperature of your
									city. As such, it guides local and regional decision makers in
									efficient city intervention planning and policy-making.
								</StoryParagraph>
								<StorySubheadline className={''}>
									Further resources
								</StorySubheadline>
								<ul className={'cure-Story-listLinks'}>
									<li>
										<StoryLink className={''}>
											Copernicus LST products description -{' '}
											<a href="">
												the Sentinel-3 SLSTR User Guide
											</a>
										</StoryLink>
									</li>
									<li>
										<StoryLink className={''}>
											Copernicus LST products description -{' '}
											<a href="">
												Copernicus Global Land service
											</a>
										</StoryLink>
									</li>
									<li>
										<StoryLink className={''}>
											RSLab LST product (Landsat based){' '}
											<a href="">
												documentation and service
											</a>
										</StoryLink>
									</li>
								</ul>
								<StorySubheadline className={''}>
									Service provider info and other copyrights and credits
								</StorySubheadline>
								<StoryParagraph className={''}>
									The service is based on{' '}
									<a href="">
										Copernicus Sentinel satellite imagery
									</a>
									, <a href="">CLMS</a> and{' '}
									<a href="">C3S</a> Copernicus
									Services. The methodology is based on{' '}
									<a href="">
										Sentinel-3
									</a>{' '}
									thermal image downscaling (
									<a href="">
										https://www.mdpi.com/2072-4292/7/4/4139
									</a>
									) using several <a href="">CLMS</a>{' '}
									products for detailed surface cover information,{' '}
									<a href="">
										Sentinel-2
									</a>{' '}
									imagery for urban surface dynamics and atmospheric information from{' '}
									<a href="">C3S</a>.
								</StoryParagraph>
								<Button
									disabled
									icon="settings"
								>
									Order service
								</Button>
							</StorySidePanelFooter>
						</StorySidePanel>
						<StoryMainPanel className={''}>
							<StoryMainPanelIntro
								className={''}
								backgroundImage={require("../../../../../assets/storyCureExample.jpg")}
							>
								<StoryHeadline className={'is-cureExample'} isIntro>
									Local Scale Surface Temperature Dynamics
								</StoryHeadline>
								<StorySubheadline className={'is-cureExample'} isIntro>
									Monitor and analyze the surface temperature dynamics in your city
								</StorySubheadline>
								<StoryTags
									className={''}
									tagKeys={0}
									tags={[
										{key: 0, data: {nameDisplay: "Heat"}},
										{key: 1, data: {nameDisplay: "Climate Change Mitigation"}},
										{key: 2, data: {nameDisplay: "Temperature"}},
										{key: 3, data: {nameDisplay: "C3C"}},
										{key: 4, data: {nameDisplay: "CLMS"}}
									]}
								/>
							</StoryMainPanelIntro>
							<div className="ptr-docs-story-cureExample-map">
								<PresentationMap
									mapComponent={ReactLeafletMap}
									mapKey="map3"
									wrapper={MapCenterWrapper}
									backgroundLayer={backgroundLayer}
									view={{
										boxRange: 100000,
									}}
								>
									{/* // FIXME controlls */}
									<MapControls levelsBased zoomOnly />
								</PresentationMap>
							</div>
							<div className="ptr-docs-story-cureExample-map">
								<PresentationMap
									mapComponent={ReactLeafletMap}
									mapKey="map3"
									wrapper={MapCenterWrapper}
									backgroundLayer={backgroundLayer}
									view={{
										boxRange: 100000,
									}}
								>
									{/* // FIXME controlls */}
									<MapControls levelsBased zoomOnly />
								</PresentationMap>
							</div>
							<div className="ptr-docs-story-cureExample-map">
								<PresentationMap
									mapComponent={ReactLeafletMap}
									mapKey="map3"
									wrapper={MapCenterWrapper}
									backgroundLayer={backgroundLayer}
									view={{
										boxRange: 100000,
									}}
								>
									{/* // FIXME controlls */}
									<MapControls levelsBased zoomOnly />
								</PresentationMap>
							</div>
							<StoryMainPanelFooter className={''}>
								<StorySubheadline className={''} isFooterTitle>
									Continue to other applications
								</StorySubheadline>
								<a href="">
									Surface Urban Heat Island Assessment
								</a>
								<a href="">
									Urban Heat Emissions Monitoring
								</a>
								<a href="">
									Urban Thermal Comfort
								</a>
								<a href="">
									Urban Heat Storage Monitoring
								</a>
								<a href="">
									Nature Based Solutions
								</a>
							</StoryMainPanelFooter>
						</StoryMainPanel>
					</Story>
					</div>
			</div>
			<h2>Code</h2>
				<SyntaxHighlighter language="jsx">
			{`
import {
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
	StoryMainPanelCase,
} from '@gisatcz/visat-components';
import React from 'react';

import {Button} from '@gisatcz/ptr-atoms';

import {
	ReactLeafletMap,
	PresentationMap,
	MapControls,
} from '@gisatcz/ptr-maps';

import "./style.scss";

const backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	},
};

class MapCenterWrapper extends React.PureComponent {
	render() {
		const view = this.props.view;

		return (
			<div className="ptr-map-wrapper">
				<div
					style={{
						background: 'white',
						position: 'absolute',
						bottom: 0,
						left: 0,
						zIndex: 2,
					}}
				>
					{view?.center ? (
						<span>
							lat: {view.center.lat}, lon: {view.center.lon}
						</span>
					) : null}
				</div>
				{this.props.children}
			</div>
		);
	}
}

const StoryCureExample = () => {
	return (
		<div className='ptr-docs-story-cureExample'>
			<div className='ptr-docs-story-cureExample-nav'>CURE NAVIGATION</div>
			<Story className={''} theme="cure">
				<StorySidePanel className={''}>
					<StorySidePanelIntro className={''}>
						<StorySubheadline className={''}>
							Service Rationale
						</StorySubheadline>
						<StoryParagraph className={''}>
							The surface temperature is one of the most important parameters in
							the physical processes of urban surface energy, water balance and
							the land-atmosphere exchanges. Thence, it constitutes a valuable
							information source for the understanding of the natural and human
							components of the Earth system. In this context, the service
							provides frequent local scale surface temperature estimations, which
							are essential data for other CURE services too, i.e. the{' '}
							<a href="">
								Surface Urban Heat Island (UHI) Assessment Service
							</a>
							, the{' '}
							<a href="">
								Urban Heat Emissions Monitoring Service
							</a>{' '}
							and the{' '}
							<a href="">
								Urban Heat Storage Monitoring Service
							</a>
							.
						</StoryParagraph>
					</StorySidePanelIntro>
					<StorySidePanelCase className={''}>
						<StorySubheadline className={''}>
							Detailed Land Surface Temperature (LST)
						</StorySubheadline>
						<StoryParagraph className={''}>
							This CURE service generates daily land surface temperature maps for
							urban areas exploiting the Copernicus Sentinel-3 thermal
							acquisitions and detailed dynamic information on the land surface
							from Sentinel-2 and land cover / land use information from the CLMS
							and the atmosphere information from C3S. Similar maps available from
							Copernicus are coarse, with a pixel corresponding to more than 1 km
							on the ground, which makes it difficult to asses the intra-urban
							variations of surface temperature. The CURE urban LST compensates
							the spatial-temporal resolution trade-off of the satellite LST
							products, providing dense time series of 100 m spatial resolution
							LST. See example and compare the CURE LST product in 100m resolution
							(left) with original Copernicus service in 1km resolution (right).{' '}
						</StoryParagraph>
					</StorySidePanelCase>
					<StorySidePanelCase className={''}>
						<StorySubheadline className={''}>
							Intra-urban Surface Temperature Dynamics
						</StorySubheadline>
						<StoryParagraph className={''}>
							The CURE LST maps resolve the intra-urban variations of surface
							temperature, while providing insights on the surface temperature
							dynamics, with up to 4 maps per day. These detailed, frequent
							surface temperature maps are highly important as input for assessing
							the surface urban heat island, the heat emissions and the heat
							storage and the thermal comfort. See interactive timeline of the
							temporal distribution of Sentinel-3 LST maps for LST daytime and
							nighttime values. Select the point in the timeline and see a
							corresponding LST product in a map.
						</StoryParagraph>
					</StorySidePanelCase>
					<StorySidePanelCase className={''}>
						<StorySubheadline className={''}>
							Aggregated temperatures for user-defined units
						</StorySubheadline>
						<StoryParagraph className={''}>
							<em data-tour="showcase-about">
								Land Surface Temperature (LST) information can be related to user
								defined units (e.g. urban plots, neighbourhood blocks, districts)
								to be ready for specific level of analysis. See visualization of
								CLMS Urban Atlas polygons with aggregated temperatures coming from
								the CURE Land Surface Temperature (LST) service. Hoover on the map
								to explore aggregated land surface temperature values. Use slider
								to inspect variation, value distribution and differences between
								daytime and nighttime.
							</em>
						</StoryParagraph>
					</StorySidePanelCase>
					<StorySidePanelFooter className={''}>
						<StorySubheadline className={''}>
							Added value discussion
						</StorySubheadline>
						<StoryParagraph className={''}>
							The surface temperature is one of the most important parameters in
							the physical processes of urban surface energy and water balance
							including the land-atmosphere exchanges. CURE Land Surface
							Temperature dynamics service provides detailed spatial-temporal
							monitoring and analysis of the land surface temperature of your
							city. As such, it guides local and regional decision makers in
							efficient city intervention planning and policy-making.
						</StoryParagraph>
						<StorySubheadline className={''}>
							Further resources
						</StorySubheadline>
						<ul className={'cure-Story-listLinks'}>
							<li>
								<StoryLink className={''}>
									Copernicus LST products description -{' '}
									<a href="">
										the Sentinel-3 SLSTR User Guide
									</a>
								</StoryLink>
							</li>
							<li>
								<StoryLink className={''}>
									Copernicus LST products description -{' '}
									<a href="">
										Copernicus Global Land service
									</a>
								</StoryLink>
							</li>
							<li>
								<StoryLink className={''}>
									RSLab LST product (Landsat based){' '}
									<a href="">
										documentation and service
									</a>
								</StoryLink>
							</li>
						</ul>
						<StorySubheadline className={''}>
							Service provider info and other copyrights and credits
						</StorySubheadline>
						<StoryParagraph className={''}>
							The service is based on{' '}
							<a href="">
								Copernicus Sentinel satellite imagery
							</a>
							, <a href="">CLMS</a> and{' '}
							<a href="">C3S</a> Copernicus
							Services. The methodology is based on{' '}
							<a href="">
								Sentinel-3
							</a>{' '}
							thermal image downscaling (
							<a href="">
								https://www.mdpi.com/2072-4292/7/4/4139
							</a>
							) using several <a href="">CLMS</a>{' '}
							products for detailed surface cover information,{' '}
							<a href="">
								Sentinel-2
							</a>{' '}
							imagery for urban surface dynamics and atmospheric information from{' '}
							<a href="">C3S</a>.
						</StoryParagraph>
						<Button
							disabled
							icon="settings"
						>
							Order service
						</Button>
					</StorySidePanelFooter>
				</StorySidePanel>
				<StoryMainPanel className={''}>
					<StoryMainPanelIntro
						className={''}
						backgroundImage={require("../../../../../assets/storyCureExample.jpg")}
					>
						<StoryHeadline className={'is-cureExample'} isIntro>
							Local Scale Surface Temperature Dynamics
						</StoryHeadline>
						<StorySubheadline className={'is-cureExample'} isIntro>
							Monitor and analyze the surface temperature dynamics in your city
						</StorySubheadline>
						<StoryTags
							className={''}
							tagKeys={0}
							tags={[
								{key: 0, data: {nameDisplay: "Heat"}},
								{key: 1, data: {nameDisplay: "Climate Change Mitigation"}},
								{key: 2, data: {nameDisplay: "Temperature"}},
								{key: 3, data: {nameDisplay: "C3C"}},
								{key: 4, data: {nameDisplay: "CLMS"}}
							]}
						/>
					</StoryMainPanelIntro>
					<div className="ptr-docs-story-cureExample-map">
						<PresentationMap
							mapComponent={ReactLeafletMap}
							mapKey="map3"
							wrapper={MapCenterWrapper}
							backgroundLayer={backgroundLayer}
							view={{
								boxRange: 100000,
							}}
						>
							{/* // FIXME controlls */}
							<MapControls levelsBased zoomOnly />
						</PresentationMap>
					</div>
					<div className="ptr-docs-story-cureExample-map">
						<PresentationMap
							mapComponent={ReactLeafletMap}
							mapKey="map3"
							wrapper={MapCenterWrapper}
							backgroundLayer={backgroundLayer}
							view={{
								boxRange: 100000,
							}}
						>
							{/* // FIXME controlls */}
							<MapControls levelsBased zoomOnly />
						</PresentationMap>
					</div>
					<div className="ptr-docs-story-cureExample-map">
						<PresentationMap
							mapComponent={ReactLeafletMap}
							mapKey="map3"
							wrapper={MapCenterWrapper}
							backgroundLayer={backgroundLayer}
							view={{
								boxRange: 100000,
							}}
						>
							{/* // FIXME controlls */}
							<MapControls levelsBased zoomOnly />
						</PresentationMap>
					</div>
					<StoryMainPanelFooter className={''}>
						<StorySubheadline className={''} isFooterTitle>
							Continue to other applications
						</StorySubheadline>
						<a href="">
							Surface Urban Heat Island Assessment
						</a>
						<a href="">
							Urban Heat Emissions Monitoring
						</a>
						<a href="">
							Urban Thermal Comfort
						</a>
						<a href="">
							Urban Heat Storage Monitoring
						</a>
						<a href="">
							Nature Based Solutions
						</a>
					</StoryMainPanelFooter>
				</StoryMainPanel>
			</Story>
		</div>
		);
	};`}
				</SyntaxHighlighter>
		</Page>
	);
};

StoryCureExample.propTypes = {};

export default StoryCureExample;
