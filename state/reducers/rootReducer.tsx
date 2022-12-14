/** @format */

const initState = {
	theme: 'light',
	title: '',
	filtersSelected: {},
	data: {},
	year: '',
	id: '',
}

export const rootReducer = (state = initState, action: any) => {
	switch (action.type) {
		case 'SET_THEME':
			return {
				...state,
				theme: action.payload,
			}
		case 'SET_TITLE':
			return {
				...state,
				title: action.payload,
			}
		case 'SET_FILTERS':
			return {
				...state,
				filtersSelected: action.payload,
			}
		case 'SET_DATA':
			return {
				...state,
				data: action.payload,
			}
		case 'SET_YEAR':
			return {
				...state,
				year: action.payload,
			}

		case 'SET_ID':
			return {
				...state,
				id: action.payload,
			}

		default:
			return state
	}

	return null
}

export function languageReducer(state = { language: 'EN' }, action: { type: any; language: any }) {
	switch (action.type) {
		case 'SET_LANGUAGE':
			let x = { ...state, language: action.language }
			return x
		default:
			return state
	}
}

export default { rootReducer, languageReducer }
