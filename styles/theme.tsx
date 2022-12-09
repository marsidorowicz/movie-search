/** @format */

import { color, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { light, dark } from '@material-ui/core/styles/createPalette';

const config: any = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	config,
	styles: {
		global: {
			body: {
				// color: 'white',
				background: 'linear-gradient(to left, #18b5d9, #031770);',
				overflowX: 'hidden',
			},
		},
	},
});
export default theme;
