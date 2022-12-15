/** @format */

import { useEffect, useState } from 'react'
import Layout from '../components/organisms/Layout'
import MainPoster from '../components/atoms/MainPoster'
import Home from '../components/organisms/Home'
import req, { searchMovie } from '../utilities/apiReqs'
import MovieThumbnail from '../components/atoms/MovieThumbnail'
import { UseLocalStorage } from '../utilities/UseLocalStorage'
import MovieThumbnailNotRated from '../components/atoms/MovieThumbnailNotRated'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setDataAction, setFiltersAction, setIdAction, setTitleAction, setYearAction } from '../state/action-creators'
import { fetchMovieData } from '../utilities/apiReqs'
import SimpleNotification from '../utilities/SimpleNotifications'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
	const [topRated, genre] = await Promise.all([fetch(req.topRated).then((res) => res.json()), fetch(req.genreList).then((res) => res.json()), ,])
	const genresArray = genre?.genres
	const genreQuery: any = context.query.genre
	const yearQuery: any = context.query.year
	const isWithQuery: boolean = (genresArray.length > 0 && genreQuery) || (genresArray.length > 0 && yearQuery) ? true : false

	const genreMatch =
		isWithQuery && genresArray?.length > 0
			? genresArray?.filter((genre: any) => {
					for (let item in genreQuery.split(',')) {
						if (genre?.id.toString() === genreQuery.split(',')[item].toString()) {
							return genre
						}
					}
			  })
			: null

	let ids: any = '&with_genres='
	if (isWithQuery && genreMatch.length > 0) {
		for (let i = 0; i < genreMatch.length; i++) {
			if (i === genreMatch.length) return
			ids += genreMatch[i].id + ','
		}
	}

	const response = await fetch(req.year + ids + '&year=' + `${yearQuery ? yearQuery : ''} `).then((res) => res.json())

	for (let item in response?.results) {
	}

	return {
		props: {
			topRated: topRated.results,
			genre: genre,
			query: response,
		},
	}
}

export default function HomePage(props: { topRated: any; genre: any; query: any }) {
	const [showChild, setShowChild] = useState(false)
	const [topRatedArray, setTopRatedArray] = useState<[]>()
	const [dataFromFilters, setDataFromFilters] = UseLocalStorage('dataFromFilters', '')
	const [selectedFilters, setSelectedFilters] = UseLocalStorage('selectedFilters', null)
	const [year, setYear] = UseLocalStorage('year', '')
	const [title, setTitle] = UseLocalStorage('title', null)
	const dispatch = useDispatch()
	const state = useSelector((state: any) => state.root)
	const { t } = useTranslation('home')
	const [open, setOpen] = useState<boolean>(false)
	const [severity, setSeverity] = useState<string>('error')
	const [msg, setMsg] = useState<string>('error')

	const router = useRouter()

	useEffect(() => {
		if (!props?.query?.results?.length) return
		if (props?.query?.results?.length > 0) {
			setDataFromFilters(props?.query)
			dispatch(setDataAction(props?.query))
		}
		return () => {}
	}, [props])

	useEffect(() => {
		if (!state) return
		if (state?.root?.data?.results?.length) {
			setDataFromFilters(state?.root?.data)
		}
		return () => {}
	}, [state])

	useEffect(() => {
		setTopRatedArray(props?.topRated)
		setShowChild(true)

		return () => {}
	}, [])

	useEffect(() => {
		if (title) {
			dispatch(setTitleAction(title))
		}
		if (year) {
			dispatch(setYearAction(year))
		}

		if (selectedFilters) {
			dispatch(setFiltersAction(selectedFilters))
		}

		return () => {}
	}, [title, year, selectedFilters])

	if (!showChild) {
		return null
	}

	return (
		<div>
			<SimpleNotification open={open} setOpen={setOpen} message={msg} severity={severity} time={10000} />
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
							: 'No Movie Found'}
					</section>

					{dataFromFilters && Array.isArray(dataFromFilters?.results) ? (
						<div>
							<div>Last Search: </div>
							<div className='overflow-auto'>
								<section id='searched-year' className='flex float-left w-full overflow-x-scroll scroll-smooth pb-20 mb-50'>
									{dataFromFilters?.results?.length
										? dataFromFilters?.results?.map((movieInfoData: any, index: number) => {
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
				</Home>
			</Layout>
		</div>
	)
}
