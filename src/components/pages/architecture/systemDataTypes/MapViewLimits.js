import React from 'react';
import {Link} from "react-router-dom";
import {withNamespaces} from '@gisatcz/ptr-locales';

import Page, {
	ImplementationToDo,
	SyntaxHighlighter
} from '../../../Page';

class MapViewLimitsDoc extends React.PureComponent {
	
	render() {
		return (
			<Page title="Map view limits">
				<p>Universal framework-agnostic representation of map view limitations. It is used to restrict <Link to="./mapView">map view</Link>.</p>
				<ImplementationToDo>Other map view parameters</ImplementationToDo>

				<SyntaxHighlighter language="javascript">
					{
`{
	boxRangeRange: [1000, 50000]
}`
					}
				</SyntaxHighlighter>
				
			</Page>
		);
	}
}

export default withNamespaces()(MapViewLimitsDoc);