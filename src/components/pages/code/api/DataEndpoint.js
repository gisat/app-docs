import React from 'react';
import Page, {DocsToDo, SyntaxHighlighter} from "../../../Page";

const DataEndpoint = props => (
    <Page title="Data Endpoint">
        <h2>Payload</h2>
        <h3>Relations filter</h3>
        <SyntaxHighlighter language="json">{`
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
    
    // which layer you want
    layerTemplateKey | areaTreeLevelKey: "uuid",
    
    // get attributes from style
    styleKey: "", 
    
    // pagination for relations (& data sources)
    relations: {
        offset: 0,
        limit: 100
    },
    
    // options for spatial & attributes data   
    data: {
        // list of features you want
        featureKeys: [],
        
        // which tiles you want (pseudo-pagination)
        spatialIndex: {
            tiles: [[lon, lat], ...],
        },
        
        // part of attribute endpoint 
        // attributeIndex: {
        //     order: [["attribute-uuid", "ascending"], ...],
        //     offset: 0,
        //     limit: 10 
        // },
    
        // extent
        spatialFilter: {
            tiles: [[lon, lat], ...],
            level: 3
        },
        
        // filter features by attribute value
        attributeFilter: {
            'attribute-uuid': "blue",
            'attribute-uuid': {
                in: [12, 13]
            },
            ...
        },
        geometry: true,
        
        // use data source keys as filter or add them to filter
        dataSourceKeys: ["dataSource-uuid",...] 
    }
}
        `}
        </SyntaxHighlighter>


        <h2>Response</h2>
        <SyntaxHighlighter language="json">{`
{
    data: {
        spatialRelations: [],
        attributeRelations: [],
        spatialDataSources: [],
        attributeDataSources: [],
        spatialData: {
            'spatialDataSourceKey': {
                data:  {
                    'feature-id': {
                        type: "Point",
                        coordinates: [125.6, 10.1]
                    }
                },
                spatialIndex: {
                    'level': {
                        'tile_lon,tile_lat': [feature-id, feature-id, ...]
                    }
                }
            }
        },
        attributeData: {
            'attributeDataSourceKey': {
                'feature-id': "Dinagat Islands"
            }
        }
    }
}
        `}
        </SyntaxHighlighter>
    </Page>
);

export default DataEndpoint;