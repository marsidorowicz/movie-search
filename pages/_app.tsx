/** @format */

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../state/store'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
	const [showChild, setShowChild] = useState(false)
	useEffect(() => {
		setShowChild(true)
	}, [])

	if (!showChild) {
		return null
	}

	if (typeof window === 'undefined') {
		return <></>
	} else {
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		)
	}
}
