/** @format */

import React from 'react'
import MovieThumbnail from '../atoms/MovieThumbnail'

function RatedRow(props: { data: any }) {
	return (
		<div>
			{' '}
			<section id='top-rated' className='flex float-left w-full overflow-x-scroll scroll-smooth'>
				{props?.data?.length
					? props?.data.map((movieInfoData: any, index: number) => {
							if (index === 0 || index > 7) return
							return (
								<div key={movieInfoData?.id}>
									<MovieThumbnail movieInfo={movieInfoData} rating={index} />
								</div>
							)
					  })
					: 'No Movie Found'}
			</section>
		</div>
	)
}

export default RatedRow
