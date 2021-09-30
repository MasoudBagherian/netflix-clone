import { API_INFO as info } from '../../globals';

const requests = {
  fetchTrending: `/trending/all/week?api_key=${info.api_key}`,
  fetchNetflixOriginals: `/discover/tv?api_key=${info.api_key}&with_networks=213
  `,
  fetchTopRated: `/movie/top_rated?api_key=${info.api_key}`,
  fetchActionsMovies: `/discover/movie?api_key=${info.api_key}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${info.api_key}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${info.api_key}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${info.api_key}&with_genres=10749`,
  fetchDocumentries: `/discover/movie?api_key=${info.api_key}&with_genres=99`,
};

export default requests;
