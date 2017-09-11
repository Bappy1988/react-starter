import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import homeReducer from './home.reducer';
import babbleReducer from './babble.reducer';
import {routerReducer} from 'react-router-redux';

const appReducers = combineReducers({
	auth: authReducer,
	home: homeReducer,
	router: routerReducer,
	babble: babbleReducer
});
export default appReducers;
