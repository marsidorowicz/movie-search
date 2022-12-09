/** @format */

export enum Actions {
	SET_THEME = 'SET_THEME',
}

export const setThemeAction = (payload: any) => ({
	type: Actions.SET_THEME,
	payload,
});
