/** @format */

import Image from 'next/image'
import React from 'react'

function MainPoster(props: { data: any }) {
	console.log('props?.data')
	console.log(props?.data)
	const base = 'https://image.imdb.org/t/p/orginal/'
	const topRatedMovie = props?.data?.topRated?.[0]
	console.log('topRatedMovie')
	console.log(topRatedMovie)
	if (!topRatedMovie) return null

	return (
		<div>
			<div>
				<Image src={`${base}${topRatedMovie?.backdrop_path || topRatedMovie?.poster_path}`} alt={''} width={100} height={100}></Image>
			</div>
		</div>
	)
}

export default MainPoster
