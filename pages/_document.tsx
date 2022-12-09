/**
 * eslint-disable @next/next/no-document-import-in-page
 *
 * @format
 */

// import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang='en'>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
