const webpack = require('webpack');

module.exports = function override(config) {
	// comment when using package from npm
	config.resolve = {
		alias: {
			react:
				'C:/Users/PavelVlach/WebstormProjects/ptr-components/node_modules/react',
			'@gisatcz/ptr-components':
				'C:/Users/PavelVlach/WebstormProjects/ptr-components',
			// 'classnames': './node_modules/classnames',
			// 'react': '/Users/vojtadubrovsky/Work/GISAT/git/app-esaWorldCerealProductViewer/node_modules/@gisatcz/ptr-state/node_modules/react',
			// '@gisatcz/ptr-state': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-state',
			// 'react': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-state/node_modules/react',
			// '@gisatcz/ptr-state': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-state',
			// '@gisatcz/ptr-timeline': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-timeline',
			// 'react': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-timeline/node_modules/react',
			// 'react-resize-detector': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-timeline/node_modules/react-resize-detector',
			// 'react-dom': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-state/node_modules/react-dom',
			// 'react-resize-detector': '/Users/vojtadubrovsky/Work/GISAT/git/app-esaWorldCerealProductViewer/node_modules/@gisatcz/ptr-maps/node_modules/react-resize-detector',
			// 'react-resize-detector': '/Users/vojtadubrovsky/Work/GISAT/git/app-esaWorldCerealProductViewer/node_modules/react-resize-detector',
			// '@gisatcz/ptr-timeline': '/Users/vojtadubrovsky/Work/GISAT/git/ptr-timeline'
		},
		fallback: {
			fs: false,
			crypto: require.resolve('crypto-browserify'),
			path: require.resolve('path-browserify'),
			os: require.resolve('os-browserify/browser'),
			process: require.resolve('process/browser'),
			stream: false,
		},
	};
	config.plugins = [
		...config.plugins,
		// fix "process is not defined" error:
		// (do "npm install process" before running the build)
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
	];

	return config;
};
