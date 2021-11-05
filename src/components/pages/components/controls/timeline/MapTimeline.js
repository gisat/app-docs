import React from 'react';
import _ from 'lodash';
import Page, {InlineCodeHighlighter, SyntaxHighlighter} from '../../../../Page';
import './timeline.scss';
import ComponentPropsTable from '../../../../ComponentPropsTable/ComponentPropsTable';
import {
	Mouse,
	Years,
	Months,
	TimeLineHover,
	HoverHandler,
	position,
	utils,
	MapTimeline,
} from '@gisatcz/ptr-timeline';

const {getTootlipPosition} = position;
const {getIntersectionLayers, getIntersectionOverlays, overlap} =
	utils.overlays;

const TOOLTIP_PADDING = 5;

const layers = [
	{
		key: 'layer_2',
		layerTemplateKey: 'lt_2',
		period: [
			{
				start: '2014-02-01 12:00',
				end: '2014-03-01 12:00',
			},
			{
				start: '2014-06-01 12:00',
				end: '2014-06-01 12:00',
			},
			{
				start: '2015-06-01 12:00',
				end: '2015-06-01 12:00',
			},
			{
				start: '2015-08-01 14:00',
				end: '2015-08-01 14:00',
			},
		],
		color: 'rgba(255, 0, 0, 0.7)',
		activeColor: 'rgba(0, 237, 3, 0.7)',
		active: true,
		activePeriodIndex: 0,
		title: 'Sentinel',
		zIndex: 2,
	},
	{
		key: 'layer_1',
		layerTemplateKey: 'lt_1',
		period: [
			{
				start: '2014-06-01 12:00',
				end: '2015-08-02',
			},
		],
		color: 'rgba(255, 0, 0, 0.7)',
		activeColor: 'rgba(0, 237, 3, 0.7)',
		active: false,
		title: 'Ortofoto 2016',
		info: 'západ',
		zIndex: 3,
	},
];
const MOUSEBUFFERWIDTH = 10;
class TimelineDoc extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {layers};
	}
	getOverlaysHoverContent(x, time, evt) {
		const intersectionOverlays = getIntersectionLayers(
			time,
			layers,
			MOUSEBUFFERWIDTH,
			evt.dayWidth
		);
		intersectionOverlays.sort((a, b) => a.top - b.top);

		const intersectionOverlaysElms = intersectionOverlays.map(overlay => {
			const periodCount = overlay.period && overlay.period.length;
			const info =
				periodCount > 1
					? periodCount
					: overlay.info ||
					  `${overlay.period[0].start} - ${overlay.period[0].end}`;
			return (
				<div
					key={overlay.layerTemplateKey}
					className={'ptr-timeline-tooltip-layer'}
				>
					<div>
						<span
							className="dot"
							style={{backgroundColor: overlay.color}}
						></span>
					</div>
					<div>{overlay.title}</div>
					<div>{info}</div>
				</div>
			);
		});

		if (intersectionOverlays.length > 0) {
			return (
				<div>
					{/* time: {` ${time.format("YYYY MM D H:mm:ss")}`} */}
					{intersectionOverlaysElms}
				</div>
			);
		} else {
			return null;
		}
	}

	onLayerClick = layer => {
		console.log('On layer click', layer);

		//set layer active
		const layers = _.cloneDeep(this.state.layers);
		const layerCfg = layers.find(
			l => l.key === layer.key.split('-').slice(0, -1).join('-')
		);

		if (
			layerCfg.period.length > 1 &&
			(layer.periodIndex === 0 || layer.periodIndex)
		) {
			//if click on same period, then toggle active
			if (layer.periodIndex === layerCfg.activePeriodIndex) {
				layerCfg.active = !layerCfg.active;
				//if click on unactive layer with activePeriodIndex === null
			} else if (layerCfg.activePeriodIndex === null) {
				layerCfg.active = !layerCfg.active;
			}
		} else {
			layerCfg.active = !layerCfg.active;
		}

		if (layerCfg.active) {
			layerCfg.activePeriodIndex = layer.periodIndex;
		} else {
			layerCfg.activePeriodIndex = null;
		}

		// place for code for buble layer state from timeline to the maps
		//
		////

		this.setState({layers});
	};

	getHorizontalTootlipStyle() {
		const referencePoint = 'center';

		return () => {
			const windowScrollTop = window.document.documentElement.scrollTop;
			const windowScrollLeft = window.document.documentElement.scrollLeft;
			const windowHeight = window.document.documentElement.clientHeight;
			const windowWidth = window.document.documentElement.clientWidth;
			const windowBBox = [
				windowScrollTop,
				windowScrollLeft + windowWidth,
				windowScrollTop + windowHeight,
				windowScrollLeft,
			];
			return getTootlipPosition(
				referencePoint,
				['bottom', 'top'],
				windowBBox,
				TOOLTIP_PADDING
			);
		};
	}
	getVerticalTootlipStyle() {
		const referencePoint = 'center';

		return () => {
			const windowScrollTop = window.document.documentElement.scrollTop;
			const windowScrollLeft = window.document.documentElement.scrollLeft;
			const windowHeight = window.document.documentElement.clientHeight;
			const windowWidth = window.document.documentElement.clientWidth;
			const windowBBox = [
				windowScrollTop,
				windowScrollLeft + windowWidth,
				windowScrollTop + windowHeight,
				windowScrollLeft,
			];
			return getTootlipPosition(
				referencePoint,
				['left', 'right'],
				windowBBox,
				TOOLTIP_PADDING
			);
		};
	}

	render() {
		const periodLimit = {
			start: '2014',
			end: '2016',
		};

		const LEVELS = [
			{
				level: 'year',
				end: 2,
			},
			{
				level: 'month',
				end: 20,
			},
		];

		const Levels = props => {
			const {activeLevel} = props;
			switch (activeLevel) {
				case 'year':
					return React.createElement(Years, {...props, key: 'year'});
				case 'month':
					return React.createElement(Months, {...props, key: 'month'});
			}
			return React.createElement(Months, {...props, key: 'month'});
		};

		return (
			<Page title="Map Timeline">
				<p>
					Extension of the Timeline component. Extends Timeline props for{' '}
					<InlineCodeHighlighter>layers</InlineCodeHighlighter>,{' '}
					<InlineCodeHighlighter>legend</InlineCodeHighlighter> and{' '}
					<InlineCodeHighlighter>onLayerClick</InlineCodeHighlighter>.
				</p>

				<h2 id="props">Common props</h2>
				<ComponentPropsTable
					content={[
						{
							name: 'periodLimit',
							type: 'object',
							required: true,
							description:
								'Time bounds for timeline. Move in timeline is restricted by periodLimit. If dayWidth or periodLimit not defined, periodLimit is set as initial period.',
							objectPropsDescription: [
								{
									name: 'start',
									type: 'object',
									description: 'momentjs instance',
								},
								{
									name: 'end',
									type: 'object',
									description: 'momentjs instance',
								},
							],
						},
						{
							name: 'period',
							type: 'object',
							required: false,
							description:
								'Time bounds for actual view. Must be inside periodLimit. Period defines dayWidth. Used only in constructor. If component gets onMount in props periodLimit and dayWidth, new dayWidth is calculated from periodLimit.',
							objectPropsDescription: [
								{
									name: 'start',
									type: 'object',
									description: 'momentjs instance',
								},
								{
									name: 'end',
									type: 'object',
									description: 'momentjs instance',
								},
							],
						},
						{
							name: 'dayWidth',
							type: 'number',
							required: false,
							description:
								'Zoom can be modified by dayWidth. DayWidth is xSize of one day in px. If component gets onMount props periodLimit and dayWidth, new dayWidth is calculated from periodLimit.',
						},
						{
							name: 'contentHeight',
							type: 'number',
							required: false,
							default: '45 for horizontal, 70 for vertical',
							description:
								'Height of content in horizontal view. In vertical view value define width.',
						},
						{
							name: 'time',
							type: 'object',
							required: false,
							description:
								'Momentjs instance. Time in center of visible periodLimit.',
						},
						{
							name: 'vertical',
							type: 'bool',
							required: false,
							default: 'false',
							description: 'Whether display timeline in vertical view.',
						},
						{
							name: 'levels',
							type: 'array',
							required: false,
							default: '[year/month/day/hour/minute]',
							description:
								"Definition of layers pyramid. Every level in array is object with 'end' [number] that is maximum dayWidth when level is visible and 'level' [string] id of level. Levels must be ordered from top to bottom -> small to max dayWidth.",
						},
						{
							name: 'onHover',
							type: 'function',
							required: false,
							description:
								'Callback on mouse move over timeline. Used for hoverHandler',
						},
						{
							name: 'onClick',
							type: 'function',
							required: false,
							description: 'Callback on click to timeline.',
						},
						{
							name: 'onChange',
							type: 'function',
							required: false,
							description: 'Callback on change timeline state.',
						},
						{
							name: 'periodLimitOnCenter',
							type: 'bool',
							required: false,
							default: 'false',
							description:
								'Whether limit periodLimit on start/end of element or in center of element.',
						},
						{
							name: 'selectMode',
							type: 'bool',
							required: false,
							default: 'false',
							description:
								'If true, zoom follows cursor. If false, zoom to center.',
						},
						{
							name: 'layers',
							type: 'Array',
							required: false,
							default: '[]',
							description: 'Array of layers displayed in timeline.',
						},
						{
							name: 'legend',
							type: 'bool',
							required: false,
							default: 'false',
							description:
								'True for display simple legend with layer names in Timeline.',
						},
						{
							name: 'onLayerClick',
							type: 'function',
							required: false,
							description: 'Callback on click to layer.',
						},
					]}
				/>
				<h2>Examples</h2>

				<h3>Horizontal</h3>
				<p></p>

				<SyntaxHighlighter language="jsx">
					{`

const periodLimit = {
	start: '2010',
	end: '2025'
}



const LEVELS=[
	{
		level: 'year',
		end:2
	},
	{
		level: 'month',
		end:20
	}
];

const Levels = (props) => {
	const {activeLevel} = props;
	switch (activeLevel) {
		case 'year':
			return React.createElement(Years, {...props, key: 'year'});
		case 'month':
			return React.createElement(Months, {...props, key: 'month'});
	}
	return React.createElement(Months, {...props, key: 'month'});
};


const layers = [
	{
		key: "layer_1",
		layerTemplateKey: "layer_1",
		period: [{
			start: "2015-06-01 12:00",
			end: "2015-08-02"
		}],
		color: 'rgba(255, 0, 0, 0.7)',
		activeColor: 'rgba(255, 0, 100, 0.5)',
		active: false,
		title: 'Ortofoto 2016',
		info: 'západ',
		zIndex: 3,
	},
	{
		key: "layer_2",
		layerTemplateKey: "layer_2",
		period: [
			{
				start: "2015-06-01 12:00",
				end: "2015-06-01 12:00"
			},
			{
				start: "2015-06-01 14:00",
				end: "2015-06-01 14:00"
			},
			{
				start: "2015-08-01 14:00",
				end: "2015-08-01 14:00"
			},
		],
		color: 'rgba(0, 237, 3, 0.7)',
		activeColor: 'rgba(0, 200, 100, 0.5)',
		active: true,
		activePeriodIndex: 2, 
		title: 'Sentinel',
		zIndex: 2,
	}
]


<HoverHandler getStyle={this.getHorizontalTootlipStyle()}>
	<TimeLineHover getHoverContent={this.getOverlaysHoverContent}>
		<MapTimeline
			periodLimit={periodLimit}
			onChange={(timelineState) => {console.log("onChange", timelineState)}}
			onClick={(evt) => console.log("onClick", evt)}
			vertical={false}
			levels={LEVELS}
			selectMode={true}
			layers={layers}
			legend={true}
			onLayerClick={this.onLayerClick}
			>
				<Mouse mouseBufferWidth={MOUSEBUFFERWIDTH} key="mouse"/>
				<Levels key="levels"/>
		</MapTimeline> 
	</TimeLineHover>
</HoverHandler>
`}
				</SyntaxHighlighter>

				<div>
					<HoverHandler getStyle={this.getHorizontalTootlipStyle()}>
						<TimeLineHover getHoverContent={this.getOverlaysHoverContent}>
							<MapTimeline
								periodLimit={periodLimit}
								onChange={timelineState => {
									console.log('onChange', timelineState);
								}}
								onClick={evt => console.log('onClick', evt)}
								vertical={false}
								levels={LEVELS}
								selectMode={true}
								layers={this.state.layers}
								legend={true}
								onLayerClick={this.onLayerClick}
							>
								<Mouse mouseBufferWidth={MOUSEBUFFERWIDTH} key="mouse" />
								<Levels key="levels" />
							</MapTimeline>
						</TimeLineHover>
					</HoverHandler>
				</div>
			</Page>
		);
	}
}

export default TimelineDoc;
