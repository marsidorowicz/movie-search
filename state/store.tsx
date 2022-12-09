/** @format */

import reducers from './reducers';
import { configureStore } from '@reduxjs/toolkit';

// export const store = createStore(reducers, {})
export const store = configureStore({
	reducer: {
		root: reducers,
	},
});

export default store;
