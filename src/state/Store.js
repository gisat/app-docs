import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,
	thunk,
	reduxBatch,
	logger,
} from '@gisatcz/ptr-state';
import {createBrowserHistory, createMemoryHistory} from 'history';
import {wrapHistory} from 'oaf-react-router';
import {
	createRequestCounter,
	createAsyncMiddleware,
	isServer,
} from '@gisatcz/ptr-core';
import {connectRouter} from 'connected-react-router';

// base types
import {baseStores} from '@gisatcz/ptr-state';

export const createHistory = options => {
	let history = createBrowserHistory(options);
	const settings = {
		primaryFocusTarget: 'body',
		smoothScroll: true,
	};
	wrapHistory(history, settings); //todo review behaviour
	return history;
};

export const history = isServer ? createMemoryHistory() : createHistory();

function createMiddleware(requestCounter) {
	const middlewares = [
		createAsyncMiddleware(requestCounter),
		thunk,
		process.env.NODE_ENV === 'development' && !isServer && logger,
	];

	return applyMiddleware(...middlewares.filter(v => v !== false));
}

function createReducer() {
	return combineReducers({...baseStores, router: connectRouter(history)});
}

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({})) ||
	compose;

function createEnhancer(requestCounter) {
	return composeEnhancers(
		reduxBatch,
		createMiddleware(requestCounter),
		reduxBatch
	);
}

/**
 * Returns object with keys `store`, `readyP`.
 * - `readyP` - Promise that resolves once the app is initialized (helpful with SSR).
 * - `store` - Redux store.
 */
function createAppStore(options) {
	const isPreloaded = !isServer && window.__PRELOADED_STATE__ != null;
	const initialState = isPreloaded ? window.__PRELOADED_STATE__ : {};
	if (isPreloaded) {
		delete window.__PRELOADED_STATE__;
	}

	const requestCounter = createRequestCounter();
	const store = createStore(
		createReducer(),
		initialState,
		createEnhancer(requestCounter)
	);

	return {
		store: store,
		requestCounter: requestCounter,
	};
}

export default createAppStore;
