import * as actions from '../actions/babble.actions';

const initialState = {
	categories: []
};

const babbleReducer = (state = initialState, action) => {
	let mutatedState = Object.assign({}, state);
	switch(action.type) {
		case actions.ACTIONS.LOAD_BABBLE_COMPLETE:
			mutatedState = action.payload;
			return mutatedState;
		default:
			return state;
	}
};

export default babbleReducer;