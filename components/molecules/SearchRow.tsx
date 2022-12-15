/** @format */

import React from 'react'
import MovieThumbnailNotRated from '../atoms/MovieThumbnailNotRated'

function SearchRow(props: { data: any }) {
	return (
		<div>
			<section>
				{props?.data && Array.isArray(props?.data?.results) ? (
					<div>
						<div>Last Search: </div>
						<div className='overflow-auto'>
							<section id='searched-year' className='flex float-left w-full overflow-x-scroll scroll-smooth pb-20 mb-50'>
								{props?.data?.results?.length
									? props?.data?.results?.map((movieInfoData: any, index: number) => {
											return (
												<div key={movieInfoData?.id}>
													<MovieThumbnailNotRated movieInfo={movieInfoData} />
												</div>
											)
									  })
									: 'No Movie Found'}
							</section>
						</div>
					</div>
				) : (
					''
				)}
			</section>
		</div>
	)
}

export default SearchRow
