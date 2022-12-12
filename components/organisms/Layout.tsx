/** @format */

import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import React, { Children } from 'react'
import Header from '../atoms/Header'

function Layout(props: { children: any; genre: any[]; sendData: (data: any) => void }) {
	return (
		<Box className='bg-gradient-to-t from-gray-900 to-black relative h-screen z-10'>
			<Head>
				<title>Movies!</title>
				<link rel='icon' href='./public/assets/favicon.png'></link>
			</Head>
			<Header genre={props?.genre} sendData={(data: any) => props?.sendData(data)} />
			<br></br>
			<main className='m-2 pl-2 pt-2 pb-24 text-white'>{props.children}</main>
			<div className='text-white p-3'></div>
			<footer>
				<Box className='bg-black text-white w-full  bottom-0 fixed flex justify-center text-[7px] sm:text-[12px] md:text-[15px] lg:text-[25px]'>
					<a href='mailto:marsidorowicz@gmail.com'>Author: © Infinity MS &nbsp; marsidorowicz@gmail.com</a>
				</Box>
			</footer>
		</Box>
	)
}

export default Layout
