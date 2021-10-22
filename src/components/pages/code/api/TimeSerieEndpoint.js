import React from 'react';
import Page, {DocsToDo, SyntaxHighlighter} from '../../../Page';

const TimeSerieEndpoint = props => (
	<Page title="TimeSerie endpoint">
		<h2>Payload</h2>
		<SyntaxHighlighter language="json">
			{`
{
	"modifiers": {
		"scopeKey": "",
		"placeKey": "",
		"caseKey": "",
		"scenarioKey": "",
		"periodKey": {
			"in": []
		}
	},
    
    // data from which layer you want
	"layerTemplateKey": "uuid",

    // data from which area tree level you want
	"areaTreeLevelKey": "uuid",

	"attributeKeys": ["uuid"],

    // pagination for relations (& data sources)
	"relations": {
		"offset": 0,
		"limit": 100
	},

    // options for time serie data   
	"data": {
		"offset": 0,
		"limit": 100,

		"orderPeriods": "ascending|descending",

        // list of specific features you want
		"featureKeys": [],

		"spatialFilter": {
			"geoJson": {}
		},

        // use time serie data source keys instead of LayerTemplateKey/AreaTreeLevelKey + modifiers
		"dataSourceKeys": ["timeSerieDataSource-uuid"]
	}
}
        `}
		</SyntaxHighlighter>

		<h2>Response</h2>
		<SyntaxHighlighter language="json">
			{`
{
	"timeSerieRelations": {
		"total": 124,
		"offset": 0,
		"limit": 100,
		"timeSerieRelations": []
	},
	"timeSerieData": {
        // Maximum length of period/value from any feature.
		"total": 14756,
		"offset": 0,
		"limit": 100,
		"timeSerieData": {
			"timeSerieDataSourceKey1": {
				"feature-id1": [{
					"period": "2021-01",
					"value": 1
				}, {
					"period": "2021-02",
					"value": "hehe"
				}],
				"feature-id2": [{
					"period": "2021-10",
					"value": 1
				}, {
					"period": "2021-12",
					"value": "hehe"
				}]
			}
		},

		"index": ["feature-id1", "feature-id3", "feature-id2", "feature-id4"]
	}
}
        `}
		</SyntaxHighlighter>
	</Page>
);

export default TimeSerieEndpoint;
