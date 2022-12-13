/** @format */

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { base } from '../../utilities/constants'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { useRouter } from 'next/router'

function MovieThumbnail(props: { movieInfo: any }) {
	const [movieDetails, setMovieDetails] = useState<any | null>(null)
	const [url, setUrl] = useState<any | null>(null)
	const router = useRouter()

	useEffect(() => {
		setMovieDetails(props?.movieInfo)
		if (!props?.movieInfo?.backdrop_path || !props?.movieInfo?.poster_path) return
		const movieUrl = `${base}${props?.movieInfo?.backdrop_path || props?.movieInfo?.poster_path}`
		setUrl(movieUrl)
		return () => {}
	}, [props?.movieInfo])

	if (!movieDetails) return null

	return (
		<div className='relative p-2'>
			<h1 className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold min-h-[20px] sm:min-h-[50px] md:min-h-[70px] lg:sm:min-h-[100px]'>
				{movieDetails?.title || 'No Title'}
			</h1>
			<div className='flex flex-wrap justify-center'>
				{url ? (
					<img src={url ? url : ''} className='p-1 bg-white border rounded max-w-[6rem] max-h-[10rem] ' alt={movieDetails?.title || ''} />
				) : (
					<div className='p-1 bg-white border rounded max-w-[6rem] max-h-[10rem]'>No image</div>
				)}
			</div>

			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold'>{`Release Date: (${movieDetails?.release_date || 'unknown'})`}</p>
			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px]'>{'Vote Average: ' + movieDetails?.vote_average || 'unknown'}</p>
			<div>
				<div className='p-2 flex justify-center'>
					<button
						className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold flex shadow-white shadow align-middle'
						onClick={() => router.push(`/play/?id=${movieDetails?.id || 'noId'}`)}>
						<PlayCircleOutlineIcon className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold flex' />
						PLAY
					</button>
				</div>
			</div>
		</div>
	)
}

export default MovieThumbnail
