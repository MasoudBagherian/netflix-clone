import { instance as axios } from './axios/axiosConfig';
import requests from './axios/requests';
const mkRandom = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};
export const fetchAllMovies = async () => {
  const movies = {};
  try {
    // get trending movies
    const trending = await axios.get(requests.fetchTrending);
    movies.trending = trending.data.results;

    // get netfilx originals
    const netflix = await axios.get(requests.fetchNetflixOriginals);
    movies.netflix = netflix.data.results;
    movies.banner =
      netflix.data.results[mkRandom(0, netflix.data.results.length - 1)];
    // get top rated movies
    const topRated = await axios.get(requests.fetchTopRated);
    movies.topRated = topRated.data.results;

    // get action movies
    const action = await axios.get(requests.fetchActionsMovies);
    movies.action = action.data.results;
    // get comedy movies
    const comedy = await axios.get(requests.fetchComedyMovies);
    movies.comedy = comedy.data.results;
    // get horror movies
    const horror = await axios.get(requests.fetchHorrorMovies);
    movies.horror = horror.data.results;
    // get romance movies
    const romance = await axios.get(requests.fetchRomanceMovies);

    movies.romance = romance.data.results;
    // get documentries
    const documentary = await axios.get(requests.fetchDocumentries);
    movies.documentary = documentary.data.results;

    return movies;
  } catch (err) {
    const error = new Error();
    error.response = err.response;
    throw error;
  }
};
