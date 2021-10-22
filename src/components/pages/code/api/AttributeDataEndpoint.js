import React from 'react';
import Page, {DocsToDo, SyntaxHighlighter} from '../../../Page';

const AttributeDataEndpoint = props => (
	<Page title="Attribute data endpoint">
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
	"layerTemplateKey" | "areaTreeLevelKey": "uuid",

	// which attributes you want
	"attributeKeys": ["uuid", ...]

	// pagination for relations (& data sources)
	"relations": {
		"offset": 0,
		"limit": 100
	},

	// options for attributes data   
	"data": {
		"offset": 0,
		"limit": 100,

		"attributeFilter": {
			"attribute-uuid": "blue",
			"attribute-uuid": {
				"in": [12, 13]
			}
		}

		"attributeOrder": [
			['attribute-uuid', 'ascending'],
			[...]
		]

		// list of specific features you want
		"featureKeys": [],

		// extent
		"spatialFilter": {
			"geoJson": {},
			"tiles": {
				"tiles": [
					[lon, lat], ...
				],
				"level": 3
			}
		},

		// use data source keys instead of LayerTemplateKey/AreaTreeLevelKey + modifiers
		"dataSourceKeys": ["dataSource-uuid", ...]
	}
}
        `}
		</SyntaxHighlighter>

		<h2>Response</h2>
		<SyntaxHighlighter language="json">
			{`
{
	"attributeRelationsDataSources": {
		"total": 124,
		"offset": 0,
		"limit": 100,
		"attributeRelations": []
		// "attributeDataSources": []
	},
	"attributeData": {
		"total": 14756,
		"offset": 0, 
		"limit": 100,
		"attributeData": {
            "attributeDataSourceKey1": {
                "feature-id1": "Dinagat Islands",
                "feature-id2": "Gisatland"
            },
            "attributeDataSourceKey2": {
                "feature-id3": "Satellites",
                "feature-id4": "Resolution"
            },
            "attributeDataSourceKey3": {}  //Empty datasource caused by order
        },
        "index": ["feature-id1","feature-id3","feature-id2","feature-id4"] //index reflects order throught all dataSources.
	}      
}
        `}
		</SyntaxHighlighter>
	</Page>
);

export default AttributeDataEndpoint;
