/** @format */

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../state/store'
import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Home from '.'
import Test from '../components/App'

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
		const router = createBrowserRouter([
			{
				path: '/',
				element: <Home />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/test',
				element: <Test />,
				errorElement: <ErrorPage />,
			},
		])
		return (
			<Provider store={store}>
				<RouterProvider router={router} />
				<Component {...pageProps} />
			</Provider>
		)
	}
}
