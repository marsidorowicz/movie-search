/** @format */

import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import { API_KEY } from '../utilities/apiReqs'
dotenv.config()

export const facekiGetToken = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { year, title, genre } = req.body

		let query: string = ''

		let genreIds: any = []
		if (title) {
			query += `&query=${title}`
		}

		if (year) query += `&year=${year}`

		if (genre?.length > 0) {
			genreIds = genre.map((item: any) => {
				return item.id
			})
		}

		const res = await fetch(`https://api.themoviedb.org/3/search/movie/?${query}&api_key=${API_KEY}`).then((res) => res.json())

		if (!res?.results) return

		const resFiltered = {
			results: res?.results?.filter((result: any) => {
				const genresFromResult = result?.genre_ids
				return genreIds.some((i: any) => genresFromResult.includes(i))
			}),
		}

		return res.status(200).json(resFiltered?.results.length > 0 ? resFiltered : res)
	} catch (error) {
		console.log(error)

		res.status(400).json({ data: error })
	}

	res.end()
}

export default facekiGetToken
