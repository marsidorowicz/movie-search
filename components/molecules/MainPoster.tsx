/** @format */

import React from 'react'
import { base } from '../../utilities/constants'
import PlayButton from '../atoms/PlayButton'
import MainPosterImage from '../atoms/MainPosterImage'

function MainPoster(props: { data: any; router: any }) {
	const topRatedMovie = props?.data?.[0] || null

	if (!topRatedMovie || !props?.router) return <div></div>
	const url: string = `${base}${topRatedMovie?.backdrop_path || topRatedMovie?.poster_path}`
	return (
		<div className='pb-20'>
			<MainPosterImage url={url} title={topRatedMovie.title} />
			<h1 className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold p-2'>{'No. 1 ' + topRatedMovie?.title}</h1>
			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold p-2'>{`Release Date: (${topRatedMovie?.release_date})`}</p>
			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{'Vote Average: ' + topRatedMovie?.vote_average}</p>
			<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{topRatedMovie?.overview}</p>
			<PlayButton topRatedElement={topRatedMovie.id} router={props?.router} />
		</div>
	)
}

export default MainPoster
