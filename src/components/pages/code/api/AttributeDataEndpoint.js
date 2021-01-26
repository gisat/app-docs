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
        spatialFilter: {
            tiles: [[lon, lat], ...],
            level: 3
        },
        
        // use data source keys as filter or add them to filter
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
        relations: [],
        data: {
            'attributeDataSourceKey': {
                'feature-id': "Dinagat Islands"
            }
        },
        total: {
        	attributeRelations: 74,
        	features: 148
        }
    }
}
        `}
		</SyntaxHighlighter>
	</Page>
);

export default AttributeDataEndpoint;
