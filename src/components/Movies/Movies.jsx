import React from 'react';
import MovieSlider from '../MovieSlider/MovieSlider';

const Movies = ({ movies }) => {
  return (
    <div className="movies">
      <div className="inner-container">
        <MovieSlider title="netflix originals" movies={movies.netflix} poster />
        <MovieSlider title="trending now" movies={movies.trending} />
        <MovieSlider title="top rated" movies={movies.topRated} />
        <MovieSlider title="action movies" movies={movies.action} />
        <MovieSlider title="comedy movies" movies={movies.comedy} />
        <MovieSlider title="horror movies" movies={movies.horror} />
        <MovieSlider title="romance movies" movies={movies.romance} />
        <MovieSlider title="documentaries" movies={movies.documentary} />
      </div>
    </div>
  );
};

export default Movies;
