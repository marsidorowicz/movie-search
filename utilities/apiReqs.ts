/** @format */

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY_TMDB
export const BASE_URL_TMDB = 'https://api.themoviedb.org/3'

export const fetchMovieData = async (id: string) => {
	const res = await fetch(`${BASE_URL_TMDB}/movie/${id}?&api_key=${API_KEY}`).then((res) => res.json())
	return res
}

export const searchMovie = async (props: { year?: string; title: string; genre?: any }) => {
	let query: string = ''

	let genreIds: any = []
	if (props?.title) {
		query += `&query=${props?.title}`
	}

	if (props?.year) query += `&year=${props?.year}`

	if (props?.genre?.length > 0) {
		genreIds = props?.genre.map((item: any) => {
			return item.id
		})
		console.log('genreIds')
		console.log(genreIds)
	}

	const res = await fetch(`https://api.themoviedb.org/3/search/movie/?${query}&api_key=${API_KEY}`).then((res) => res.json())
	console.log('res')
	console.log(res)

	if (!res?.results) return

	const resFiltered = res?.results?.filter((result: any) => {
		const genresFromResult = result?.genre_ids
		return genreIds.some((i: any) => genresFromResult.includes(i))
	})

	console.log('resFiltered')
	console.log(resFiltered)

	return resFiltered
}

const req = {
	topRated: `${BASE_URL_TMDB}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	genreList: `${BASE_URL_TMDB}/genre/movie/list?&api_key=${API_KEY}`,
	year: `${BASE_URL_TMDB}/discover/movie?&sort_by=vote_average.desc&api_key=${API_KEY}`,
	fetchMovieData: `${BASE_URL_TMDB}/movie?&api_key=${API_KEY}`,
}

export default req
