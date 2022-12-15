/** @format */

import React, { useEffect, useState } from 'react'
import Layout from '../components/templates/Layout'
import { fetchMovieData } from '../utilities/apiReqs'
import SimpleNotification from '../utilities/SimpleNotifications'
import ReactPlayerInstance from '../components/atoms/ReactPlayerInstance'
import PlayInfoSection from '../components/atoms/PlayInfoSection'

function Play() {
	const [movieId, setMovieId] = useState<any | null>(null)
	const [movie, setMovie] = useState<any | null>(null)
	const [urlQuery, setUrlQuery] = useState<any | null>(null)
	const [open, setOpen] = useState<boolean>(false)
	const [severity, setSeverity] = useState<string>('error')
	const [msg, setMsg] = useState<string>('error')
	let arrOfObjects: any = {}

	const getMovieData = async (id: string) => {
		if (!movieId && !id) return
		const res = await fetchMovieData(id || movieId)
		if (!res) {
			setMsg('no response')
			setSeverity('error')
			setOpen(true)
		}
		setMovie(res)
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			let url = new URL(window.location.href)
			const searchParams: any = new URLSearchParams(url.search)
			for (const [key, value] of searchParams.entries()) {
				arrOfObjects[key] = value
			}
		}
		setUrlQuery(arrOfObjects)
		if (arrOfObjects['id']) {
			setMovieId(arrOfObjects['id'])
			getMovieData(arrOfObjects['id'])
		}

		return () => {}
	}, [])

	return (
		<div>
			<SimpleNotification open={open} setOpen={setOpen} message={msg} severity={severity} time={10000} />
			<Layout genre={null}>
				<div className=' h1 text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold'>PLAY</div>
				<ReactPlayerInstance url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
				<PlayInfoSection movieData={movie || null} />
			</Layout>
		</div>
	)
}

export default Play
