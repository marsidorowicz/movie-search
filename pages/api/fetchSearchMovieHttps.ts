/** @format */

import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { API_KEY, BASE_URL_TMDB } from '../../utilities/apiReqs'

export const FetchSearchMovie = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { year, title, genre } = req.body
		console.log(genre)
		console.log(genre.length)

		let query: string = ''

		let genreIds: any = []
		if (title) {
			query += `&query=${title}`
		}

		if (year) {
			query += `&year=${year}`
		}

		if (genre?.length > 0) {
			genreIds = genre.map((item: any) => {
				return item.id
			})
		}

		if (!title) return

		const response: any = await fetch(`${BASE_URL_TMDB}/search/movie/?${query}&api_key=${API_KEY}`).then((response) => response.json())

		if (!response) return

		const resFiltered = response?.results.filter((result: any) => {
			const genresFromResult = result?.genre_ids

			if (genreIds.some((i: any) => genresFromResult.includes(i))) {
				return result
			}
		})

		return res.status(200).json({ results: resFiltered?.length > 0 ? resFiltered : response })
	} catch (error) {
		res.status(400).json({ data: JSON.stringify(error) })
	}

	res.end()
}

export default FetchSearchMovie
