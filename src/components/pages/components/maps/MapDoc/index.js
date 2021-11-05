import {connect} from '@gisatcz/ptr-state';
import {Action} from '@gisatcz/ptr-state';

import presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addMap: map => {
			dispatch(Action.maps.addMap(map));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(presentation);
