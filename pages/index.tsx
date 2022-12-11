/** @format */

import { useEffect, useState } from 'react'
import Layout from '../components/organisms/Layout'
import MainPoster from '../components/atoms/MainPoster'
import Home from '../components/organisms/Home'
import req from '../utilities/apiReqs'
import MovieThumbnail from '../components/atoms/MovieThumbnail'

export async function getServerSideProps(context: any) {
	const topRated = await fetch(req.topRated).then((res) => res.json())

	return {
		props: {
			topRated: topRated.results,
		}, // will be passed to the page component as props
	}
}

export default function HomePage(topRated: any) {
	const [showChild, setShowChild] = useState(false)
	const [topRatedArray, setTopRatedArray] = useState<[]>()
	useEffect(() => {
		console.log('topRated here')
		console.log(topRated)
		console.log(topRated?.topRated)
		setTopRatedArray(topRated?.topRated)
		setShowChild(true)
	}, [])

	if (!showChild) {
		return null
	}
	return (
		<Layout>
			<Home>
				<MainPoster data={topRated} />
				<section id='top-rated' className='flex float-left w-full overflow-x-scroll scroll-smooth'>
					{topRatedArray?.length
						? topRatedArray.map((movieInfoData: any, index: number) => {
								if (index === 0 || index > 7) return
								return (
									<div key={movieInfoData?.id}>
										<MovieThumbnail movieInfo={movieInfoData} rating={index} />
									</div>
								)
						  })
						: 'No Data'}
				</section>
				<div>Last Search</div>
				<section id='searched' className='flex float-left w-full overflow-x-scroll scroll-smooth'>
					{topRatedArray?.length
						? topRatedArray.map((movieInfoData: any, index: number) => {
								if (index === 0 || index > 7) return
								return (
									<div key={movieInfoData?.id}>
										<MovieThumbnail movieInfo={movieInfoData} rating={index} />
									</div>
								)
						  })
						: 'No Data'}
				</section>
			</Home>
		</Layout>
	)
}
