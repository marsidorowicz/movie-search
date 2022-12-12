/** @format */

import { Component, useEffect, useState } from 'react'
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

class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		logErrorToMyService(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>
		}

		return this.props.children
	}
}

export function Root(props: { topRated: any; genre: any }) {
	const [showChild, setShowChild] = useState(false)
	const [topRatedArray, setTopRatedArray] = useState<[]>()
	const [dataFromFilters, setDataFromFilters] = UseLocalStorage('dataFromFilters', '')
	const [selectedFilters, setSelectedFilters] = UseLocalStorage('selectedFilters', null)
	const [year, setYear] = UseLocalStorage('year', '')
	const [title, setTitle] = UseLocalStorage('title', null)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const state = useSelector((state: any) => state.root)
	const { t } = useTranslation('home')

	console.log(dataFromFilters)
	console.log(topRatedArray)

	if (typeof window !== 'undefined') {
		let url = new URL(window.location.href)

		console.log(url)
		console.log(url.search)
		let arrOfObjects = {}
		const searchParams: any = new URLSearchParams(url.search)
		for (const [key, value] of searchParams.entries()) {
			console.log(`${key}, ${value}`)
			arrOfObjects[key] = value
		}
		console.log('arrOfObjects')
		console.log(arrOfObjects)
	}

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
			<ErrorBoundary>
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

						{year && dataFromFilters && dataFromFilters?.results?.length ? (
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
						<Link to={'/play'}>Home</Link>
					</Home>
				</Layout>
				{/* <Routes>
					<Route path='/' element={<></>} />
					<Route path='/play' element={<>A</>} />
				</Routes> */}
			</ErrorBoundary>
		</div>
	)
}

export default function App(props: { topRated: any; genre: any }) {
	return <BrowserRouter children={<Root topRated={props?.topRated} genre={props?.genre} />}></BrowserRouter>
}
function logErrorToMyService(error: any, errorInfo: any) {
	throw new Error('Function not implemented.')
}
