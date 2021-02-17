import React from 'react';
import Page, {DocsToDo, SyntaxHighlighter} from '../../../Page';

const Data = props => (
	<Page title="Data">
		<h2>attributeData</h2>
		<SyntaxHighlighter language="javascript">
			{`{
	byDataSourceKey: {
		'attributeDataSourceKey': {
			'featureKey1': 'attributeValue',
			'featureKey2': 'attributeValue',
			...
		},
		...
	},
	spatialIndexes: [{
		filter: {
			caseKey: "4c2afea6-0964-458e-88a7-a65318554487",
			layerTemplateKey: "758b72dd-76a8-4792-8e9f-bbf13784e992",
			periodKey: "439af632-5804-4fc0-b641-a9c34cc6a853",
			placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
			scopeKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3",
			styleKey: "55f48ed1-ee67-47bd-a044-8985662ec29f"
		},
		index: {
			'level1': {
				'tile1': {
					'attributeDataSourceKey1': ['featureKey1', 'featureKey2', ...]
					'attributeDataSourceKey2': ['featureKey3', 'featureKey4', ...]
				},
				'tile2': {
					'attributeDataSourceKey1': ['featureKey5', 'featureKey6', ...],
					...
				},
				...
			},
			'level2': {
				'tile4': true, //true is loading indicator for tile
				'tile3': {
					'attributeDataSourceKey1': [], //No data for tile 
					'attributeDataSourceKey2': [], //No data for tile 
				}
			}
		}
	}, {
		...
	}],
	indexes: [{
		filter: {
			caseKey: "4c2afea6-0964-458e-88a7-a65318554487",
			layerTemplateKey: "758b72dd-76a8-4792-8e9f-bbf13784e992",
			periodKey: "439af632-5804-4fc0-b641-a9c34cc6a853",
			placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
			scopeKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3",
			styleKey: "55f48ed1-ee67-47bd-a044-8985662ec29f"
		},
		order: [['attributeKey1', 'ascending'], ['attributeKey2', 'descending'], ...],
		count: 4788,
		index: {0: 'attributeKey745', 1: 'attributeKey147', ...}
	}, {
		...
	}]
}`}
		</SyntaxHighlighter>

		<h2>attributeDataSources</h2>
		<SyntaxHighlighter language="javascript">
			{`{
	byKey: {
		'attributeDataSourceKey1: {
			key: 'attributeDataSourceKey1',
			data: {
				columnName: "num4",
				fidColumnName: "fid",
				tableName: "gadm_fra_1",
				nameInternal: "france gadm 1"
			}
		}, 
		...
	},
	indexes: [{
		count: 1,
		filter: {
			caseKey: "4c2afea6-0964-458e-88a7-a65318554487",
			layerTemplateKey: "758b72dd-76a8-4792-8e9f-bbf13784e992",
			periodKey: "439af632-5804-4fc0-b641-a9c34cc6a853",
			placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
			scopeKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3",
			styleKey: "55f48ed1-ee67-47bd-a044-8985662ec29f"
		},
		index: {0: "attributeDataSourceKey1"}
	}, ...]
}`}
		</SyntaxHighlighter>

		<h2>attributeRelations</h2>
		<SyntaxHighlighter language="javascript">
			{`{
	byKey: {
		'attributeRelationKey1: {
			key: 'attributeRelationKey1',
			data: {
				applicationKey: null,
				areaTreeLevelKey: null,
				attributeDataSourceKey: "55f48ed1-ee67-47bd-a044-8985662ec29f",
				attributeKey: "528ac373-b82f-44cb-a883-4f3ef5b13d07",
				attributeSetKey: null,
				caseKey: "4c2afea6-0964-458e-88a7-a65318554487",
				layerTemplateKey: "758b72dd-76a8-4792-8e9f-bbf13784e992",
				periodKey: "439af632-5804-4fc0-b641-a9c34cc6a853",
				placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
				scenarioKey: null,
				scopeKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3"
			}
		}, 
		...
	},
	indexes: [{
		count: 1,
		filter: {
			caseKey: "4c2afea6-0964-458e-88a7-a65318554487",
			layerTemplateKey: "758b72dd-76a8-4792-8e9f-bbf13784e992",
			periodKey: "439af632-5804-4fc0-b641-a9c34cc6a853",
			placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
			scopeKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3",
			styleKey: "55f48ed1-ee67-47bd-a044-8985662ec29f"
		},
		index: {0: "attributeRelationKey1"}
	}, ...]
}`}
		</SyntaxHighlighter>

		<h2>spatialData</h2>
		<SyntaxHighlighter language="javascript">
			{`{
	byDataSourceKey: {
		'spatialDataSourceKey': {
			'featureKey1': {
				geometries: {
					'level10': {type: "MultiPolygon", coordinates: []},  
					'level11': {type: "MultiPolygon", coordinates: []},  
				}
			},
			'featureKey2': {
				geometry: {
					type: "MultiPolygon", 
					coordinates: [] 
				}
			},
			...
		},
		...
	},
	indexes: [{
		filter: {
			caseKey: "4c2afea6-0964-458e-88a7-a65318554487",
			layerTemplateKey: "758b72dd-76a8-4792-8e9f-bbf13784e992",
			periodKey: "439af632-5804-4fc0-b641-a9c34cc6a853",
			placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
			scopeKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3"
		},
		index: {
			'level1': {
				'tile1': {
					'spatialDataSourceKey1': ['featureKey1', 'featureKey2', ...]
					'spatialDataSourceKey2': ['featureKey3', 'featureKey4', ...]
				},
				'tile2': {
					'spatialDataSourceKey1': ['featureKey5', 'featureKey6', ...],
					...
				},
				...
			},
			'level2': {
				'tile3': {
					...
				}
			},
			'level3': {
				'tile3': true,	//true is loading indicator for tile
				'tile4': {
					'spatialDataSourceKey1': [], //No data for tile 
					'spatialDataSourceKey2': ['featureKey5']
				},
			}
		}
	}, {
		...
	}]
}`}
		</SyntaxHighlighter>

		<h2>spatialDataSources</h2>
		<SyntaxHighlighter language="javascript">
			{`{
	byKey: {
		'spatialDataSourceKey1: {
			key: 'spatialDataSourceKey1',
			data: {
				attribution: null,
				fidColumnName: "ogc_fid",
				geometryColumnName: "geom",
				layerName: null,
				nameInternal: "gadm36_fra_4",
				tableName: "gadm36_FRA_4",
				type: "tiled-vector"
			}
		}, 
		...
	},
	indexes: [{
		count: 1,
		filter: {
			caseKey: "4c2afea6-0964-458e-88a7-a65318554487",
			layerTemplateKey: "758b72dd-76a8-4792-8e9f-bbf13784e992",
			periodKey: "439af632-5804-4fc0-b641-a9c34cc6a853",
			placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
			scopeKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3",
		},
		index: {0: "spatialDataSourceKey1"}
	}, ...]
}`}
		</SyntaxHighlighter>

		<h2>spatialRelations</h2>
		<SyntaxHighlighter language="javascript">
			{`{
	byKey: {
		'spatialRelationKey1: {
			key: 'spatialRelationKey1',
			data: {
				applicationKey: null,
				caseKey: "4c2afea6-0964-458e-88a7-a65318554487",
				layerTemplateKey: "758b72dd-76a8-4792-8e9f-bbf13784e992",
				periodKey: "439af632-5804-4fc0-b641-a9c34cc6a853",
				placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
				scenarioKey: null,
				scopeKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3",
				spatialDataSourceKey: "85e35be5-1706-402a-86ad-851397bae7aa"
			}
		}, 
		...
	},
	indexes: [{
		count: 1,
		filter: {
			caseKey: "4c2afea6-0964-458e-88a7-a65318554487",
			layerTemplateKey: "758b72dd-76a8-4792-8e9f-bbf13784e992",
			periodKey: "439af632-5804-4fc0-b641-a9c34cc6a853",
			placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
			scopeKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3",
		},
		index: {0: "spatialRelationKey1"}
	}, ...]
}`}
		</SyntaxHighlighter>

		<h2>components</h2>
		<SyntaxHighlighter language="javascript">
			{`{
	components: {
		'componentKey': {
			metadataModifiers: {
				placeKey: "8b65f2c9-bd6a-4d92-bc09-af604761f2f1",
				caseKeys: ["4c2afea6-0964-458e-88a7-a65318554487", "758b72dd-76a8-4792-8e9f-bbf13784e992"],
				...
			},
			filterByActive: {
				scope: true,
				period: true,
				place: true,
				...
			},
			layerTemplateKey | areaTreeLevelKey: "c81d59c8-0b4c-4df3-9c20-375f977660d3",
			attributeKeys: ["c043af5a-ec2b-4126-b047-f203c058662e", "fa37b062-bd5a-4888-9e38-aef103d03e3c", ...],
			
			// filter features by attribute value
			attributeFilter: {
				'attributeKey1': "blue",
				'attributeKey2': {
					in: [12, 13]
				},
				...
			},
			attributeOrder: [['attributeKey1', 'ascending'], ['attributeKey2', 'descending'], ...]
			spatialFilter: {
				geoJson: {},
				tiles: {
					tiles: [[lon, lat], ...],
					level: 3
				}
			},
			// list of specific features you want
        	featureKeys: [],
        	start: 11,
        	length: 10
		}, ...
	},
	sets: {
		components: ['componentKey', ...]
	}
}`}
		</SyntaxHighlighter>
	</Page>
);

export default Data;
