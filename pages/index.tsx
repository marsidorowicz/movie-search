/** @format */

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom'
import * as A from '../public/assets/favicon.png'

import { Button, Checkbox, Container, FormControl, FormHelperText, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react'
import type { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import Header from '../components/Header'
import { Box } from '@material-ui/core'
import LiveTv from '@mui/icons-material/LiveTv'
import MainPoster from '../components/MainPoster'
import dotenv from 'dotenv'
import req from '../utilities/apiReqs'
import { FetchEventResult } from 'next/dist/server/web/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { setTitleAction } from '../state/action-creators'
import { UseLocalStorage } from '../utilities/UseLocalStorage'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const apiKey = process.env.NEXT_PUBLIC_API_KEY_TMDB
// This function gets called at build time
export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const topRated = await fetch(req.topRated).then((res) => res.json())
	const res1 = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
	const movies = await res1.json()
	// console.log(movies)

	// const movies: any = [];

	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			topRated: topRated.results,
		},
	}
}

const Home: NextPage = (topRated) => {
	const dispatch = useDispatch()
	const state = useSelector((state: any) => state.root)
	const { t } = useTranslation('home')
	const router = useRouter()
	const [title, setTitle] = UseLocalStorage('title', '')

	console.log(router)
	console.log('state')
	console.log(state)
	console.log(state?.root.title)
	console.log('title')
	console.log(title)

	console.log(topRated)
	if (typeof window !== 'undefined') {
		let url = new URL(window.location.href)
		console.log(url.search)
	}
	console.log('title1')
	console.log(title)

	useEffect(() => {
		if (!title) return
		dispatch(setTitleAction(title))
		return () => {}
	}, [])

	return (
		<Layout>
			<section>
				<h1 className='text-1xl font-bold underline text-white'>Find your movie!</h1>
			</section>
			<MainPoster data={topRated} />
		</Layout>
	)
}

export default Home
