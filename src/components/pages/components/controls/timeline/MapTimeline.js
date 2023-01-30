import React from 'react';
import {period as periodParser} from '@gisatcz/ptr-utils';
import Page, {InlineCodeHighlighter, SyntaxHighlighter} from '../../../../Page';
import './timeline.scss';
import ComponentPropsTable from '../../../../ComponentPropsTable/ComponentPropsTable';
import {
	Mouse,
	Years,
	Months,
	MapTimelineLegend,
	MapTimeline,
} from '@gisatcz/ptr-timeline';

const MapTimelinePresentation = MapTimeline.MapTimelinePresentation;

const LayerRowPresentation = MapTimeline.LayerRowPresentation;
const LayerRowItemPresentation = MapTimeline.LayerRowItemPresentation;
const LayerRowPeriodItemPresentation =
	MapTimeline.LayerRowPeriodItemPresentation;

const getParsedPeriod = period => {
	if (period?.data?.start && period?.data?.end) {
		const parsed = periodParser.parse(
			`${period.data.start}/${period.data.end}`
		);
		return {
			start: parsed.start,
			end: parsed.end,
		};
	} else if (period?.data?.period) {
		const parsed = periodParser.parse(period.data.period);
		return {
			start: parsed.start.toString(),
			end: parsed.end.toString(),
		};
	} else {
		return null;
	}
};

const LayerRowPeriodItemPresentationWrapped = props => (
	<LayerRowPeriodItemPresentation
		{...props}
		parsedPeriod={getParsedPeriod(props.originPeriod)}
	/>
);
const LayerRowItemComponentWrapped = props => (
	<LayerRowItemPresentation
		{...props}
		LayerRowPeriodItemComponent={LayerRowPeriodItemPresentationWrapped}
	/>
);
const LayerRowComponentWrapped = props => (
	<LayerRowPresentation
		{...props}
		LayerRowItemComponent={LayerRowItemComponentWrapped}
	/>
);

const getHoverContent = (x, time, evt, hoverContext, layerRows) => {
	const clientY = evt.clientY;

	// remove timeline as a overlay
	const hoveredOverlays = hoverContext?.hoveredItems?.filter(
		i => i.key !== 'timeline'
	);

	let top = 0;
	// select row by mouse position
	const layerRowMouseIntersection = layerRows?.find(layerRow => {
		top = top + (layerRow.lineHeight - layerRow.elementHeight) / 2;
		const layerRowTop = top;
		top = top + layerRow.elementHeight;
		const layerRowBottom = top;
		top = top + (layerRow.lineHeight - layerRow.elementHeight) / 2;
		const mouseIntersectRow =
			layerRowTop <= clientY && layerRowBottom >= clientY;
		return mouseIntersectRow;
	});

	const descriptionElm = (
		<div>{`${hoveredOverlays?.[0]?.overlay?.origin?.originPeriod?.data?.nameDisplay}`}</div>
	);
	const intersectionOverlaysElms =
		hoveredOverlays?.length > 0 && layerRowMouseIntersection ? (
			<div
				key={hoveredOverlays[0].overlay.key}
				className={'ptr-timeline-tooltip-layer'}
			>
				<div>
					<span
						className="dot"
						style={{
							backgroundColor: layerRowMouseIntersection.items[0].colors.basic,
						}}
					></span>
				</div>
				<div>
					<div>xxx</div>
				</div>
			</div>
		) : null;

	return (
		<div>
			<div className={'ptr-timeline-tooltip-time'}>
				<b>{`${time?.format('YYYY')}`}</b>-<b>{`${time?.format('MM')}`}</b>-
				<b>{`${time?.format('DD')}`}</b>
			</div>
			{intersectionOverlaysElms}
		</div>
	);
};

const layers = [
	{
		lineHeight: 16,
		elementHeight: 10,
		legend: {
			title: 'layer 1',
		},
		items: [
			{
				periods: [{data: {start: '2014', end: '2015'}}],
				colors: {
					basic: 'red', //should be on row
					active: 'blue', //should be on row
				},
				states: ['basic', 'active', 'hover', 'disabled'],
				activeStates: ['basic'],
				mapZIndex: 1,
				layerState: {
					layerTemplateKey: 'lt2',
				},
			},
			{
				periods: [{data: {start: '2016', end: '2018'}}],
				colors: {
					basic: 'red', //should be on row
					active: 'blue', //should be on row
				},
				states: ['basic', 'active', 'hover', 'disabled'],
				activeStates: ['basic'],
				mapZIndex: 2,
				layerState: {
					layerTemplateKey: 'lt1',
				},
			},
		],
		controlMapState: false, //'toggle', true,
	},
];
const MOUSEBUFFERWIDTH = 10;

const MapTimelineDoc = () => {
	const onLayerClick = layer => {
		console.log('On layer click', layer);
	};

	const periodLimit = {
		start: '2013',
		end: '2022',
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
					{
						name: 'getHoverContent',
						type: 'function',
						required: true,
						description:
							'Function that returns hover content. It is called on every mouseMove on timeline.',
					},
					{
						name: 'LayerRowComponent',
						type: 'React Element',
						required: true,
						description: '',
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
		lineHeight: 16,
		elementHeight: 10,
		legend: {
			title: 'layer 1',
		},
		items: [
			{
				periods: [{data: {start: '2014', end: '2015'}}],
				colors: {
					basic: 'red', //should be on row
					active: 'blue', //should be on row
				},
				states: ['basic', 'active', 'hover', 'disabled'],
				activeStates: ['basic'],
				mapZIndex: 1,
				layerState: {
					layerTemplateKey: 'lt2',
				},
			},
			{
				periods: [{data: {start: '2016', end: '2018'}}],
				colors: {
					basic: 'red', //should be on row
					active: 'blue', //should be on row
				},
				states: ['basic', 'active', 'hover', 'disabled'],
				activeStates: ['basic'],
				mapZIndex: 2,
				layerState: {
					layerTemplateKey: 'lt1',
				},
			},
		],
		controlMapState: false, //'toggle', true,
	}
];

<MapTimelinePresentation
	getHoverContent={(...rest) => getOverlaysHoverContent(...rest, layers)}
	LayerRowComponent={LayerRowComponentWrapped}
	periodLimit={periodLimit}
	onChange={timelineState => {
		console.log('onChange', timelineState);
	}}
	onClick={evt => console.log('onClick', evt)}
	vertical={false}
	levels={LEVELS}
	selectMode={true}
	layers={layers}
	legend={true}
	onLayerClick={onLayerClick}
>
	<Mouse mouseBufferWidth={MOUSEBUFFERWIDTH} key="mouse" />
	<Levels key="levels" />
</MapTimelinePresentation>
`}
			</SyntaxHighlighter>

			<div
				style={{minHeight: '10rem', maxHeight: '20rem', position: 'relative'}}
			>
				<MapTimelinePresentation
					getHoverContent={(...rest) => getHoverContent(...rest, layers)}
					LayerRowComponent={LayerRowComponentWrapped}
					periodLimit={periodLimit}
					onChange={timelineState => {
						console.log('onChange', timelineState);
					}}
					onClick={evt => console.log('onClick', evt)}
					vertical={false}
					levels={LEVELS}
					selectMode={true}
					layers={layers}
					LegendComponent={MapTimelineLegend}
					onLayerClick={onLayerClick}
				>
					<Mouse mouseBufferWidth={MOUSEBUFFERWIDTH} key="mouse" />
					<Levels key="levels" />
				</MapTimelinePresentation>
			</div>
		</Page>
	);
};

export default MapTimelineDoc;
