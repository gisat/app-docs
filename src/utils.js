import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

function request(url, method, query, payload) {
	if (query) {
		url += '?' + queryString.stringify(query);
	}

	return fetch(url, {
		method: method,
		body: payload ? JSON.stringify(payload) : null,
	}).then(
		response => {
			if (response.ok) {
				return response.json().then(body => {
					if (body) {
						return body;
					} else {
						throw new Error('no data returned');
					}
				});
			} else {
				throw new Error('response error');
			}
		},
		error => {
			throw error;
		}
	);
}

export default {
	request,
};
