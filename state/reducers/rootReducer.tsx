/** @format */

const initState = {
	theme: 'light',
};

export const rootReducer = (state = initState, action: any) => {
	switch (action.type) {
		case 'SET_THEME':
			return {
				...state,
				theme: action.payload,
			};
		default:
			return state;
	}

	return null;
};

export function languageReducer(state = { language: 'EN' }, action: { type: any; language: any }) {
	switch (action.type) {
		case 'SET_LANGUAGE':
			let x = { ...state, language: action.language };
			return x;
		default:
			return state;
	}
}

export default { rootReducer, languageReducer };
