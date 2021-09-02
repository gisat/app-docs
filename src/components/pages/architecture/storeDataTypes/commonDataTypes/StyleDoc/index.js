import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import {Link} from 'react-router-dom';

import Page, {DocsToDo, SyntaxHighlighter} from '../../../../../Page';

import './style.scss';

class StyleDoc extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Page title="Style">
				<DocsToDo>Add description</DocsToDo>

				<SyntaxHighlighter language="javascript">
					{`{
	key: '3a188ace-94d2-46e5-86c8-684172bd2af4',
	data: {
		nameInternal: '',
		nameDisplay: '',
		description: '',
		source: 'geoserver|definition',
		nameGeoserver: '',
		definition: {
			rules: [
				{
					filter: {
						['and'|'or']: [
							{
								featureType: 'Point|MultiPolygon|pixel|...',
								attributeKey: '4a188ace-94d2-46e5-86c8-684172bd2af5',
								attributeInterval: [-10.12,11.45] | [null, 11.45],
								attributeValue: 'Prague' | 7 | ...
								...
							}
						], 
						featureType: 'Point|MultiPolygon|pixel|...',
						attributeKey: '4a188ace-94d2-46e5-86c8-684172bd2af5',
						attributeInterval: [-10.12,11.45] | [null, 11.45],
						attributeValue: 'Prague' | 7 | ...
						...
					},
					styles: [
						{
							attributeKey: '54fba0c3-889b-4a26-bda9-5cf9235517d0',
							attributeClasses: [
								{
									interval: [7, 8]
									intervalBounds: [true, false] // 7 is included, 8 not
									fill: '#ff00ee'
								}, {
									
								}
							]
						}
					]
				}
			]
		}
	}
}`}
				</SyntaxHighlighter>

				<h2>Styles by type</h2>
				<ul className="ptr-docs-basic-list">
					<li>
						<Link to="./styles/vectors">Vectors</Link>
					</li>
					<li>
						<Link>Rasters</Link>
					</li>
				</ul>
			</Page>
		);
	}
}

export default withNamespaces()(StyleDoc);
