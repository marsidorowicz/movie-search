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
	const [urlQuery, setUrlQuery] = useState<any | null>(null)
	const [movieId, setMovieId] = useState<any | null>(null)
	const [movie, setMovie] = useState<any | null>(null)
	const [open, setOpen] = useState<boolean>(false)
	const [severity, setSeverity] = useState<string>('error')
	const [msg, setMsg] = useState<string>('error')

	const router = useRouter()
	let arrOfObjects: any = {}

	console.log(state)
	console.log(arrOfObjects)

	const getMovieDataByTitleGenreYear = async (props: { year?: string; title?: string; genre?: any }) => {
		if (!props?.year && !props?.title && !props?.genre) return
		const response = await searchMovie({
			year: props?.year,
			title: props?.title,
			genre: props?.genre?.length > 0 ? props?.genre : null,
		})
		if (!response) {
			setMsg('no response')
			setSeverity('error')
			setOpen(true)
			return
		}

		setMovie(response)
		setDataFromFilters(response)
		dispatch(setDataAction(response))
	}

	const getMovieDataByYear = async (props: { year?: string; genre?: any }) => {
		if (!props?.year && !props?.genre) return
		let ids: any = '&with_genres='
		if (props?.genre?.length > 0) {
			for (let item in props?.genre) {
				ids += props?.genre[item] + ','
			}
		}
		const response = await fetch(`${req.year}${ids !== '&with_genres=' ? ids : ''}&year=${props?.year}`).then((res) => res.json())
		if (!response) {
			setMsg('no response')
			setSeverity('error')
			setOpen(true)
			return
		}

		setMovie(response)
		setDataFromFilters(response)
		dispatch(setDataAction(response))
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			let url = new URL(window.location.href)
			const searchParams: any = new URLSearchParams(url.search)
			for (const [key, value] of searchParams.entries()) {
				arrOfObjects[key] = value
			}
		}
		setUrlQuery(arrOfObjects)
		const idA = arrOfObjects['id']
		const titleA = arrOfObjects['title'] || null
		const yearA = arrOfObjects['year']
		const genreA = arrOfObjects['genre']?.split(',')
		const genreFilters = props?.genre?.genres
		const genreMatch =
			genreFilters?.length > 0
				? genreFilters?.filter((genre: any) => {
						for (let item in genreA) {
							return genre?.id.toString() === genreA[item].toString()
						}
				  })
				: null

		if (idA) {
			setMovieId(idA)
			setIdAction(idA)
		}
		if (titleA) {
			setTitle(titleA)
			dispatch(setTitleAction(titleA))
		}
		if (yearA) {
			setYear(yearA)
			dispatch(setYearAction(yearA))
		}
		if (!titleA && arrOfObjects?.length > 0) {
			setMsg(`query doesn't contain title`)
			setSeverity('error')
			setOpen(true)
			return
		}

		if (!titleA && yearA) {
			getMovieDataByYear({
				year: year,
				genre: state?.root?.filtersSelected?.length > 0 ? state?.root?.filtersSelected : [],
			})
		}

		if (!titleA) return
		getMovieDataByTitleGenreYear({
			year: yearA,
			title: titleA,
			genre: null,
		})

		return () => {}
	}, [])

	useEffect(() => {
		console.log('state update')

		if (!state) return
		if (state?.root?.data?.length) {
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

	console.log('dataFromFilters')
	console.log(dataFromFilters)

	return (
		<div>
			<SimpleNotification open={open} setOpen={setOpen} message={msg} severity={severity} time={10000} />
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
