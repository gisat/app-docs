import {connect} from '@gisatcz/ptr-state';
import {Action, Select} from '@gisatcz/ptr-state';

import presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		activeSetKey: Select.maps.getActiveSetKey(state),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addSet: set => {
			dispatch(Action.maps.addMapSet(set));
		},
		addMap: map => {
			dispatch(Action.maps.addMap(map));
		},
		addMapToSet: (setKey, mapKey) => {
			dispatch(Action.maps.addMapToSet(setKey, mapKey));
		},
		setSetSync: (setKey, sync) => {
			dispatch(Action.maps.setMapSetSync(setKey, sync));
		},
		setSetBackgroundLayer: (setKey, backgroundLayer) => {
			dispatch(Action.maps.setMapSetBackgroundLayer(setKey, backgroundLayer));
		},
		removeSetBackgroundLayer: setKey => {
			dispatch(Action.maps.setMapSetBackgroundLayer(setKey, null));
		},
		removeSet: setKey => {
			dispatch(Action.maps.removeMapSet(setKey));
		},
		removeMap: mapKey => {
			dispatch(Action.maps.removeMap(mapKey));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(presentation);
