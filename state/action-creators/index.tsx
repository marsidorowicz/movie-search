/** @format */

export enum Actions {
	SET_THEME = 'SET_THEME',
	SET_TITLE = 'SET_TITLE',
	SET_FILTERS = 'SET_FILTERS',
}

export const setThemeAction = (payload: any) => ({
	type: Actions.SET_THEME,
	payload,
})

export const setTitleAction = (payload: any) => ({
	type: Actions.SET_TITLE,
	payload,
})

export const setFiltersAction = (payload: any) => ({
	type: Actions.SET_FILTERS,
	payload,
})
