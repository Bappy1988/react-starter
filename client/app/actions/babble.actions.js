import {ajaxCall} from './ajax.actions';

export const ACTIONS = {
	LOAD_BABBLE: 'LOAD_BABBLE',
	LOAD_BABBLE_COMPLETE: 'LOAD_BABBLE_COMPLETE'
};

const loadBabble = () => {
	return ajaxCall('/data.json', 'GET', '', loadBabbleComplete());
};

const loadBabbleComplete = () => {
	return (dispatch, res) => {
		dispatch({type: ACTIONS.LOAD_BABBLE_COMPLETE, payload: res});
	}
};

export {loadBabble};