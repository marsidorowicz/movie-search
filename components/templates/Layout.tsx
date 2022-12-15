/** @format */

import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import React, { Children } from 'react'
import Footer from '../atoms/Footer'
import Header from '../organisms/Header'

function Layout(props: { children: any; genre: any[] }) {
	return (
		<Box className='bg-gradient-to-t from-gray-900 to-black absolute h-[100%] w-[100%] -z-10 '>
			<Head>
				<title>Movies!</title>
				<link rel='icon' href='./public/assets/favicon.png'></link>
			</Head>
			<Header genre={props?.genre} />
			<main className='pb-24 text-white pt-10'>{props.children}</main>
			<Footer />
		</Box>
	)
}

export default Layout
