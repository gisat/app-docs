import React from 'react';
import {Link} from 'react-router-dom';
import {withNamespaces} from '@gisatcz/ptr-locales';

import Page, {ImplementationToDo, SyntaxHighlighter} from '../../../Page';

class MapViewLimitsDoc extends React.PureComponent {
	render() {
		return (
			<Page title="Map view limits">
				<p>
					Universal framework-agnostic representation of map view limitations.
					It is used to restrict <Link to="./mapView">map view</Link>.
				</p>
				<ImplementationToDo>
					Center is implemented for Leaflet only. Add center, tilt, roll for
					WorldWind.
				</ImplementationToDo>

				<SyntaxHighlighter language="javascript">
					{`{
	boxRangeRange: [1000, 50000],
	center: {
		minLat: 50,
		minLon: 14.2,
		maxLat: 50.2,
		maxLon: 14.6
	}
}`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default withNamespaces()(MapViewLimitsDoc);
