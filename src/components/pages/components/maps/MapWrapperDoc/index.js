import {connect} from '@gisatcz/ptr-state';
import {Action} from '@gisatcz/ptr-state';

import presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {};
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(presentation);
