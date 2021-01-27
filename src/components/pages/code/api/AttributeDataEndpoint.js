import React from 'react';
import Page, {DocsToDo, SyntaxHighlighter} from '../../../Page';

const AttributeDataEndpoint = props => (
	<Page title="Attribute data endpoint">
		<h2>Payload</h2>
		<SyntaxHighlighter language="json">
			{`
{
    modifiers: {
        scopeKey: "",
        placeKey: "",
        caseKey: "",
        scenarioKey: "",
        periodKey: {
            in: []
        }
    },
    
    // data from which layer you want
    layerTemplateKey | areaTreeLevelKey: "uuid",
    
    // which attributes you want
    attributeKeys: ["uuid", ...]
    
    // pagination for relations (& data sources)
    relations: {
        offset: 0,
        limit: 100
    },
    
    // options for attributes data   
    data: {
    	offset: 0,
    	limit: 100,
    	
    	attributeFilter: {
    		'attribute-uuid': "blue",
            'attribute-uuid': {
                in: [12, 13]
            }
    	}
    	
    	attributeOrder: [['attribute-uuid', 'ascending'], [...]]
    	
        // list of specific features you want
        featureKeys: [],
    
        // extent
        spatialFilter: GeoJSON,
        
        // use data source keys instead of LayerTemplateKey/AreaTreeLevelKey + modifiers
        dataSourceKeys: ["dataSource-uuid",...] 
    }
}
        `}
		</SyntaxHighlighter>

		<h2>Response</h2>
		<SyntaxHighlighter language="json">
			{`
{
    data: {
        attributeRelations: [],
        attributeData: {
            'attributeDataSourceKey': {
                data: {
                	'feature-id': "Dinagat Islands",
                	'feature-id': "Gisatland"
                },
                offset: 100,
                limit: 100
            }
        },
    },
    total: {
        attributeRelations: 74,
        features: 148
    },
    offset: 0,
    limit: 100  
}
        `}
		</SyntaxHighlighter>
	</Page>
);

export default AttributeDataEndpoint;
