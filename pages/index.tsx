/** @format */

import { useEffect, useState } from 'react'
import Layout from '../components/organisms/Layout'
import MainPoster from '../components/atoms/MainPoster'
import Home from '../components/organisms/Home'
import req from '../utilities/apiReqs'
import MovieThumbnail from '../components/atoms/MovieThumbnail'
import { UseLocalStorage } from '../utilities/UseLocalStorage'
import MovieThumbnailNotRated from '../components/atoms/MovieThumbnailNotRated'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setTitleAction } from '../state/action-creators'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'

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
	const [dataFromFilters, setDataFromFilters] = UseLocalStorage('dataFromFilters', '')
	const [selectedFilters, setSelectedFilters] = UseLocalStorage('selectedFilters', null)
	const [year, setYear] = UseLocalStorage('year', '')
	const [title, setTitle] = UseLocalStorage('title', null)
	const dispatch = useDispatch()
	const state = useSelector((state: any) => state.root)
	const { t } = useTranslation('home')
	console.log(state)
	console.log(selectedFilters)

	if (typeof window !== 'undefined') {
		let url = new URL(window.location.href)

		let arrOfObjects = {}
		const searchParams: any = new URLSearchParams(url.search)
		for (const [key, value] of searchParams.entries()) {
			console.log(`${key}, ${value}`)
			arrOfObjects[key] = value
		}
	}

	useEffect(() => {
		if (!state) return
		if (state?.root?.data?.length) {
			setDataFromFilters(state?.root?.data)
		}
		return () => {}
	}, [state])

	useEffect(() => {
		if (!title) return
		dispatch(setTitleAction(title))
		return () => {}
	}, [])

	useEffect(() => {
		setTopRatedArray(props?.topRated)
		setShowChild(true)
	}, [])

	if (!showChild) {
		return null
	}
	return (
		<div>
			<Layout
				genre={props?.genre}
				sendData={(data) => {
					setDataFromFilters(data)
				}}>
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

					{dataFromFilters && Array.isArray(dataFromFilters?.results) ? (
						<div>
							<div>Last Search By Year</div>
							<section id='searched-year' className='flex float-left w-full overflow-x-scroll scroll-smooth mb-10'>
								{dataFromFilters?.results?.length
									? dataFromFilters?.results?.map((movieInfoData: any, index: number) => {
											return (
												<div key={movieInfoData?.id}>
													<MovieThumbnailNotRated movieInfo={movieInfoData} />
												</div>
											)
									  })
									: 'No Data'}
							</section>
						</div>
					) : (
						''
					)}
				</Home>
			</Layout>
		</div>
	)
}
