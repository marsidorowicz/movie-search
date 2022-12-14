/** @format */

import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'

import { API_KEY } from '../../utilities/apiReqs'

export const FetchSearchMovie = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { year, title, genre } = req.body
		console.log(req.body)

		let query: string = ''

		let genreIds: any = []
		if (title) {
			query += `query=${title}`
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

		const response = await axios.get(`https://api.themoviedb.org/3/search/movie/?${query}&api_key=${API_KEY}`, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: false,
		})
		console.log(response.data)

		if (response?.status !== 200 && response?.statusText !== 'OK') return

		const resFiltered = response?.data?.results?.filter((result: any) => {
			const genresFromResult = result?.genre_ids
			return genreIds.some((i: any) => genresFromResult.includes(i))
		})

		console.log('resFiltered')
		console.log(resFiltered)

		return res.status(200).json({ data: { results: resFiltered?.length > 0 ? resFiltered : response } })
	} catch (error) {
		console.log(error)

		res.status(301).json({ data: JSON.stringify(error) })
	}

	res.end()
}

export default FetchSearchMovie
