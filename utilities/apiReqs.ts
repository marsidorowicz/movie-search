
const API_KEY = process.env.NEXT_PUBLIC_API_KEY_TMDB
const BASE_URL_TMDB = 'https://api.themoviedb.org/3'

const req = {
  topRated: `${BASE_URL_TMDB}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  genreList: `${BASE_URL_TMDB}/genre/movie/list?&api_key=${API_KEY}`,
  year: `${BASE_URL_TMDB}/discover/movie?&sort_by=vote_average.desc&api_key=${API_KEY}`,
}

export default req