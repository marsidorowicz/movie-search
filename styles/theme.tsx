/** @format */

import { color, extendTheme } from '@chakra-ui/react'

const config: any = {
	initialColorMode: 'light',
	useSystemColorMode: false,
}

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
})
export default theme
