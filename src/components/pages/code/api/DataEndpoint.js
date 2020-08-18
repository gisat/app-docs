import React from 'react';
import {withNamespaces} from '@gisatcz/ptr-locales';
import Page, {DocsToDo, SyntaxHighlighter} from "../../../Page";

const DataEndpoint = props => (
    <Page title="Data Endpoint">
        <h2>Payload</h2>
        <h3>Relations filter</h3>
        <SyntaxHighlighter language="json">{`
{
    relationsFilter: {
        scopeKey: "",
        periodKey: ""
        ...
    },
    attributeKeys: [],
    geometry: true,        
    
    // common params
    order: [["attributeKey", "ascending"], ...],
    offset: 0,
    limit: 100,
    featureKeys: [],
    spatialFilter: {
        tiles: [[lon, lat], ...],
        level: 3
    },
    attributeFilter: {
        'attributeKey': 12,
        'attributeKey': {
            in: [12, 13]
        },
        ...
    }
}
        `}
        </SyntaxHighlighter>

        <h3>Data source filter</h3>
        <SyntaxHighlighter language="json">{`
{
    dataSourceFilter: {
        'relationKey': {
            in: []
        }
    }     
    // common params
}
        `}
        </SyntaxHighlighter>

        <h3>Data filter</h3>
        <SyntaxHighlighter language="json">{`
{
    dataFilters: [
        {
           dataSourceKey: "",
           fidColumnName: ""
        }
    ]  
    // common params
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
                    'featureKey': {
                        type: "Point",
                        coordinates: [125.6, 10.1]
                    }
                },
                index: {
                    'level': {
                        'tile_lon,tile_lat': [featureKey, featureKey, ...]
                    }
                }
            }
        },
        attributeData: {
            'attributeDataSourceKey': {
                'featureKey': {
                    "name": "Dinagat Islands"
                }
            }
        }
    }
}
        `}
        </SyntaxHighlighter>
    </Page>
);

export default withNamespaces()(DataEndpoint);