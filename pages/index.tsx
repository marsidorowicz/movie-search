/** @format */

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import * as A from '../public/assets/favicon.png';

import { Button, Checkbox, Container, FormControl, FormHelperText, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Header from '../components/Header';
import { Box } from '@material-ui/core';
import LiveTv from '@mui/icons-material/LiveTv';

const apiKey = 'b2ea913c';
// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts

	const res1 = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=aa0f7d6a78e403ee5c3f7ddc92f6d9ed&language=en-US`);
	const movies = await res1.json();
	console.log(movies);

	// const movies: any = [];

	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			movies,
		},
	};
}

const Home: NextPage = (movies) => {
	const state = useSelector((state: any) => state.root);
	const { t } = useTranslation('home');

	return (
		<Box className='bg-gradient-to-t from-gray-900 to-black relative h-screen'>
			<Head>
				<title>Movies!</title>
				<link rel='icon' href='./public/assets/favicon.png'></link>
			</Head>
			<Header />
			<br></br>
			<main>
				<section>
					<h1 className='text-2xl font-bold underline'>Movie Player!</h1>
				</section>
			</main>
			<div className='text-white p-3'>
				a <br></br>a <br></br>a <br></br>a <br></br>a <br></br>a <br></br>a <br></br>a <br></br>a <br></br>a <br></br>a <br></br>a <br></br>a <br></br>a a{' '}
				<br></br>a <br></br>a <br></br>a <br></br>
				<br></br>
			</div>
			<footer>
				<Box className='bg-white text-black v-screen bottom-0 fixed'>
					<Container textAlign='center'>
						Author: © Infinity MS &nbsp;
						<a href='mailto:marsidorowicz@gmail.com'>marsidorowicz@gmail.com</a>
					</Container>
				</Box>
			</footer>
		</Box>
	);
};

export default Home;
