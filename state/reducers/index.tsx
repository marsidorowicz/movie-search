/** @format */

import { combineReducers } from 'redux';
import { rootReducer, languageReducer } from './rootReducer';

const reducers = combineReducers({
	root: rootReducer,
	lang: languageReducer,
});

export default reducers;
