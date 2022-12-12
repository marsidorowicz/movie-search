/** @format */

import Image from 'next/image'
import React from 'react'
import { base } from '../../utilities/constants'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

function MainPoster(props: { data: any }) {
	const topRatedMovie = props?.data?.[0]

	if (!topRatedMovie) return null
	const url = `${base}${topRatedMovie?.backdrop_path || topRatedMovie?.poster_path}`

	return (
		<div className='pb-20'>
			<div className='absolute left-0 top-0 h-[80vh] w-screen -z-10 flex lg:justify-end'>
				<Image src={url} alt={topRatedMovie?.title} style={{ objectFit: 'cover' }} fill />
			</div>
			<h1 className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold p-2'>{'No. 1 ' + topRatedMovie?.title}</h1>

			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold p-2'>{`Release Date: (${topRatedMovie?.release_date})`}</p>
			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{'Vote Average: ' + topRatedMovie?.vote_average}</p>
			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{topRatedMovie?.overview}</p>
			<div className='p-2 flex justify-center'>
				<button className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold flex shadow-white shadow align-middle' onClick={() => ''}>
					<PlayCircleOutlineIcon className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold flex' />
					PLAY
				</button>
			</div>
		</div>
	)
}

export default MainPoster
