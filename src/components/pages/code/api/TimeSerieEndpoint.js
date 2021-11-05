import React from 'react';
import Page, { SyntaxHighlighter} from '../../../Page';

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

    // pagination for relations
	"relations": {
		"offset": 0,
		"limit": 100
	},

    // options for time serie data   
	"data": {
		// pagination for features
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
		"total": 1,
		"offset": 0,
		"limit": 1,
		"timeSerieRelations": [
			// List of relations for each Attribute/AttributeDataSource
			// Every timeSerieDataSourceKey corresponds to one Attribute/AttributeDataSource
			{
				"key": "530c6982-af2a-4c2a-8fad-69c07f7d76e7",
				"data": {
					"scopeKey": null,
					"periodKey": null,
					"placeKey": null,
					"attributeDataSourceKey": "attributeDataSourceKey1",
					"layerTemplateKey": null,
					"scenarioKey": null,
					"caseKey": null,
					"attributeSetKey": null,
					"attributeKey": "attributeKey1",
					"areaTreeLevelKey": null,
					"applicationKey": "testKey",
					"timeSerieDataSourceKey": "timeSerieDataSourceKey1"
				}
			}
		}
		]
	},
	"timeSerieData": {
        // Count of features
		"total": 14756,

		"offset": 0,
		
		// limit for features in timeSerieDataSource
		"limit": 2, 

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
					"period": "2021-11",
					"value": 22
				},
				{
					"period": "2021-12",
					"value": 38
				}]
			}
		},

		"index": {
			//list of features for each timeSerieDataSourceKey
			"timeSerieDataSourceKey1": ["feature-id1", "feature-id2"]
		}
		
	}
}
        `}
		</SyntaxHighlighter>
	</Page>
);

export default TimeSerieEndpoint;
