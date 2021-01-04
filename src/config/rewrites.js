/**
 * CONFIG
 *
 * Per-instance values, development values & features.
 * See documentation in ./defaults.js
 * Versions/variants managed in github.com/gisat/docker/
 */

let gst206 = {
	geoServerUrl: 'http://192.168.2.206/geoserver/',
	serverUrl: 'http://192.168.2.206/backend/',
	apiGeoserverWFSHost: '192.168.2.206',
	apiGeoserverWMSHost: '192.168.2.206',
	apiBackendHost: '192.168.2.206',

	devHostnames: ['127.0.0.1'],
	requestPageSize: 100,
};

export default gst206;
