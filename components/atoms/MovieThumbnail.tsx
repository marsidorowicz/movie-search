/** @format */

import React, { useEffect, useState } from 'react'
import { base } from '../../utilities/constants'
import { useRouter } from 'next/router'

function MovieThumbnail(props: { movieInfo: any; rating: number }) {
	const [movieDetails, setMovieDetails] = useState<any | null>(null)
	const [url, setUrl] = useState<any | null>(null)
	const router = useRouter()
	useEffect(() => {
		setMovieDetails(props?.movieInfo)

		const movieUrl = `${base}${props?.movieInfo?.backdrop_path || props?.movieInfo?.poster_path}`
		setUrl(movieUrl)
		return () => {}
	}, [props?.movieInfo])

	if (!movieDetails || !url) return null

	return (
		<div className='relative p-2 min-h-[20px] sm:min-h-[50px] md:min-h-[70px] lg:sm:min-h-[100px] min-w-[150px] sm:min-w-[50px] md:min-w-[70px] lg:sm:min-w-[100px] w-[200px]'>
			<h1 className='text-[6px] sm:text-[8px] md:text-[10px] lg:text-[15px] font-bold p-1 flex-wrap  min-h-[20px] sm:min-h-[50px] md:min-h-[50px] lg:sm:min-h-[80px]'>
				{`No. ${props?.rating + 1} - ` + movieDetails?.title || 'No Title'}
			</h1>
			<button className='' onClick={() => router.push(`/play/?id=${movieDetails?.id || 'noId'}`)}>
				<div className='flex justify-center'>
					{url ? (
						<img src={url ? url : ''} className='p-1 bg-white border rounded ' alt={movieDetails?.title || ''} />
					) : (
						<div className='p-1 bg-white border-[1px] rounded '>No image</div>
					)}
				</div>
			</button>
			{/* <p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold'>{`Release Date: (${movieDetails?.release_date || 'unknown'})`}</p> */}
			{/* <p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px]'>{'Vote Average: ' + movieDetails?.vote_average}</p> */}
			<div>
				<div className='p-2 flex justify-center'></div>
			</div>
		</div>
	)
}

export default MovieThumbnail
