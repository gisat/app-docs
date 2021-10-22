import React from 'react';
import Page, {DocsToDo, SyntaxHighlighter} from '../../../Page';

const DataEndpoint = props => (
	<Page title="Data Endpoint">
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
    
    // which layer you want
    "layerTemplateKey" | "areaTreeLevelKey": "uuid",
    
    // get attributes from style
    "styleKey": "uuid", 
    
    // pagination for relations (& data sources)
    // return relations & data sources in response (spatial and/or attribute) 
    "relations": {
        "offset": 0,
		"limit": 100,
		"spatial": true,
		"attribute": true
    },
    
    // options for spatial & attributes data   
    "data": {
        // list of features you want
        "featureKeys": [],
        
        // which tiles you want (pseudo-pagination)
        "spatialIndex": {
            "tiles": [[lon, lat], ...],
        },
    
        // extent
        "spatialFilter": {
            "tiles": [[lon, lat], ...],
            "level": 3
        },
        
        // filter features by attribute value
        "attributeFilter": {
            "attribute-uuid": "blue",
            "attribute-uuid": {
                "in": [12, 13]
            },
            ...
        },
        
        // return geometries in response. Set to false, if only style was changed
        "geometry": true,
        
        // use data source keys instead of LayerTemplateKey/AreaTreeLevelKey + modifiers
        "dataSourceKeys": ["dataSource-uuid",...] 
    }
}
        `}
		</SyntaxHighlighter>

		<h2>Response</h2>
		<SyntaxHighlighter language="json">
			{`
{
	"spatialAttributeRelationsDataSources": {
		"total": {
			"attributeRelations": 45,
			"spatialRelations": 147
		},
		"offset": 0,
		"limit": 100.
		"spatialRelations": [],
        "attributeRelations": [],
        "spatialDataSources": [],
        "attributeDataSources": [],
	},
	"spatialData": {
		"spatialDataSourceKey": {
                "data":  {
                    "feature-id": {
                        "type": "Point",
                        "coordinates": [125.6, 10.1]
                    }
                },
                "spatialIndex": {
                    "level": {
                        "tile_lon,tile_lat": [feature-id, feature-id, ...]
                    }
                }
            }
	},
	"attributeData": {
		"attributeDataSourceKey": {
                "feature-id": "Dinagat Islands"
        }
	}
}
        `}
		</SyntaxHighlighter>
	</Page>
);

export default DataEndpoint;
