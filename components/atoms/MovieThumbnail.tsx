/** @format */

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { base } from '../../utilities/constants'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

function MovieThumbnail(props: { movieInfo: any; rating: number }) {
	const [movieDetails, setMovieDetails] = useState<any | null>(null)
	const [url, setUrl] = useState<any | null>(null)

	useEffect(() => {
		setMovieDetails(props?.movieInfo)

		const movieUrl = `${base}${props?.movieInfo?.backdrop_path || props?.movieInfo?.poster_path}`
		setUrl(movieUrl)
		return () => {}
	}, [props?.movieInfo])

	if (!movieDetails) return null

	return (
		<div className='relative p-2'>
			<h1 className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold min-h-[20px] sm:min-h-[50px] md:min-h-[70px] lg:sm:min-h-[100px]'>
				{`No. ${props?.rating + 1} - ` + movieDetails?.title || 'No Title'}
			</h1>
			<div className='relative left-0 top-0 flex pb-4'>
				<Image src={url ? url : ''} alt={movieDetails?.title || ''} style={{ objectFit: 'cover' }} width={'150'} height={'150'} />
			</div>

			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold'>{`Release Date: (${movieDetails?.release_date || 'unknown'})`}</p>
			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px]'>{'Vote Average: ' + movieDetails?.vote_average}</p>
			<div>
				<div className='p-2 flex justify-center'>
					<button className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold flex shadow-white shadow align-middle' onClick={() => ''}>
						<PlayCircleOutlineIcon className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold flex' />
						PLAY
					</button>
				</div>
			</div>
		</div>
	)
}

export default MovieThumbnail
