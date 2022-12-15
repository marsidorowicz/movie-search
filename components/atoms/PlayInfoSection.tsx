/** @format */

import React from 'react'
import { base } from '../../utilities/constants'

function PlayInfoSection(props: { movieData: any }) {
	if (!props?.movieData) return
	const movieUrl = `${base}${props?.movieData?.backdrop_path || props?.movieData?.poster_path}`

	return (
		<section>
			<div className='relative p-2 '>
				<h1 className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold flex flex-wrap justify-center	'>
					{'Title: ' + props?.movieData?.title || 'No Title'}
				</h1>
				{movieUrl ? (
					<div className='flex flex-wrap justify-center'>
						<img src={movieUrl ? movieUrl : ''} className='p-1 bg-white border rounded max-w-[15rem] max-h-[15rem] ' alt={props?.movieData?.title || ''} />
					</div>
				) : (
					<div className='p-1 bg-white border rounded max-w-[6rem] max-h-[10rem]'>No image</div>
				)}
				<div className='p-2'>
					<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] font-bold p-2'>{`Release Date: (${
						props?.movieData?.release_date || 'unknown'
					})`}</p>
					<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{'Vote Average: ' + props?.movieData?.vote_average}</p>
					<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{'Description: ' + props?.movieData?.overview || 'No description'}</p>
					<div className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2 flex'>
						Categories:
						{props?.movieData?.genres?.map((genre: any, index: any) => {
							return (
								<p key={genre?.id} className='pl-1'>
									{genre?.name}
								</p>
							)
						})}
					</div>
					<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{'For Adults: ' + props?.movieData?.adult || 'No data'}</p>
					<p className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>{`Imdb ID:   ${props?.movieData?.imdb_id || 'No data'}`}</p>
				</div>
			</div>
		</section>
	)
}

export default PlayInfoSection
