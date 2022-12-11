/** @format */

import { useEffect, useState } from 'react'
import Layout from '../components/organisms/Layout'
import MainPoster from '../components/atoms/MainPoster'
import Home from '../components/organisms/Home'
import req from '../utilities/apiReqs'
import MovieThumbnail from '../components/atoms/MovieThumbnail'

export async function getServerSideProps(context: any) {
	const [topRated, genre] = await Promise.all([fetch(req.topRated).then((res) => res.json()), fetch(req.genreList).then((res) => res.json()), ,])

	return {
		props: {
			topRated: topRated.results,
			genre: genre,
		}, // will be passed to the page component as props
	}
}

export default function HomePage(props: { topRated: any; genre: any }) {
	const [showChild, setShowChild] = useState(false)
	const [topRatedArray, setTopRatedArray] = useState<[]>()

	const getYear = async (props: { year: string; page?: number }) => {
		if (!props?.year) return
		const res = await fetch(
			req.year + `&sort_by=vote_average.desc&sort_by=popularity.desc&primary_release_year=${props?.year}&page=${props?.page ? props?.page.toString() : '1'}`
		).then((res) => res.json())
		console.log('res')
		console.log(res)
	}

	useEffect(() => {
		console.log('topRated')
		console.log(props?.topRated)
		getYear({
			year: '2020',
			page: 1,
		})
		console.log('genre')
		console.log(props?.genre)

		setTopRatedArray(props?.topRated)
		setShowChild(true)
	}, [])

	if (!showChild) {
		return null
	}
	return (
		<Layout genre={props?.genre}>
			<Home>
				<MainPoster data={props?.topRated} />
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
				{/* <section id='searched' className='flex float-left w-full overflow-x-scroll scroll-smooth'>
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
				</section> */}
			</Home>
		</Layout>
	)
}
