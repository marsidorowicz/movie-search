/** @format */

import React, { useEffect, useState } from 'react'
import Layout from '../components/organisms/Layout'
import req, { API_KEY, BASE_URL_TMDB, fetchMovieData } from '../utilities/apiReqs'
import SimpleNotification from '../utilities/SimpleNotifications'
import ReactPlayer from 'react-player'
import { base } from '../utilities/constants'

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
		console.log(res)
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
	console.log(movieId)
	console.log(urlQuery)

	const movieUrl = `${base}${movie?.backdrop_path || movie?.poster_path}`

	return (
		<div>
			<SimpleNotification open={open} setOpen={setOpen} message={msg} severity={severity} time={10000} />
			<Layout sendData={() => console.log()} genre={null}>
				<div className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold'>PLAY</div>
				<div className='flex  justify-center'>
					<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width={'auto'} height={'60%'} style={{ objectFit: 'cover' }} />
				</div>

				<div>
					<div className='relative p-2 '>
						<h1 className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold min-h-[20px] sm:min-h-[50px] md:min-h-[70px] lg:sm:min-h-[100px] flex flex-wrap justify-center	'>
							{'Title: ' + movie?.title || 'No Title'}
						</h1>
						{movieUrl ? (
							<div className='flex flex-wrap justify-center'>
								<img src={movieUrl ? movieUrl : ''} className='p-1 bg-white border rounded max-w-[16rem] max-h-[15rem] ' alt={movie?.title || ''} />
							</div>
						) : (
							<div className='p-1 bg-white border rounded max-w-[6rem] max-h-[10rem]'>No image</div>
						)}
						<div className='p-2'>
							<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold p-2'>{`Release Date: (${movie?.release_date || 'unknown'})`}</p>
							<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{'Vote Average: ' + movie?.vote_average}</p>
							<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{'Description: ' + movie?.overview}</p>
						</div>

						<div>
							<div className='p-2 flex justify-center'></div>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default Play
