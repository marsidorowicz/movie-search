/** @format */

import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import React, { Children } from 'react'
import Header from './Header'

function Layout(props: { children: any }) {
	return (
		<Box className='bg-gradient-to-t from-gray-900 to-black relative h-screen'>
			<Head>
				<title>Movies!</title>
				<link rel='icon' href='./public/assets/favicon.png'></link>
			</Head>
			<Header />
			<br></br>
			<main className='m-10 text-white'>{props.children}</main>
			<div className='text-white p-3'></div>
			<footer>
				<Box className='bg-black text-white w-full  bottom-0 fixed flex justify-center'>
					<a href='mailto:marsidorowicz@gmail.com'>Author: © Infinity MS &nbsp; marsidorowicz@gmail.com</a>
				</Box>
			</footer>
		</Box>
	)
}

export default Layout
