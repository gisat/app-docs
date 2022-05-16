var path = require('path');

module.exports = function override(config, env) {
	// TODO comment when using package from npm
	config.resolve = {
		alias: {
			// '@gisatcz/ptr-state': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-state',
			// '@gisatcz/ptr-maps': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-maps',
			// react:
			// 	'/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-maps/node_modules/react',
			// 'react-resize-detector': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-timeline/node_modules/react-resize-detector',
			// 'react-dom': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-state/node_modules/react-dom',
			// "@gisatcz/ptr-charts": "C:/Users/pvlach/DATA/ptr-charts",
			// react: 'C:/Users/PavelVlach/WebstormProjects/ptr-maps/node_modules/react',
			// '@gisatcz/ptr-maps': 'C:/Users/PavelVlach/WebstormProjects/ptr-maps',
			// "@gisatcz/ptr-utils": "C:/Users/pvlach/DATA/ptr-utils",
			// "@gisatcz/ptr-core": "C:/Users/pvlach/DATA/ptr-core",
			// "@gisatcz/ptr-state": "C:/Users/PavelVlach/WebstormProjects/ptr-state",
			// "@gisatcz/ptr-components": "C:/Users/pvlach/DATA/ptr-components",
			// "@gisatcz/ptr-deprecated": "C:/Users/pvlach/DATA/ptr-deprecated",
		},
	};

	return config;
};
