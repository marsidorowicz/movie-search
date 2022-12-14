/** @format */

export enum Actions {
	SET_THEME = 'SET_THEME',
	SET_TITLE = 'SET_TITLE',
	SET_FILTERS = 'SET_FILTERS',
	SET_DATA = 'SET_DATA',
	SET_YEAR = 'SET_YEAR',
	SET_ID = 'SET_ID',
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

export const setDataAction = (payload: any) => ({
	type: Actions.SET_DATA,
	payload,
})

export const setYearAction = (payload: any) => ({
	type: Actions.SET_YEAR,
	payload,
})

export const setIdAction = (payload: any) => ({
	type: Actions.SET_ID,
	payload,
})
