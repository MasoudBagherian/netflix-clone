import React, { useState, useEffect } from 'react';
import { fetchAllMovies } from './utils/fetchAllMovies';
import Loader from './UI/Loader/Loader';
import Modal from './UI/Modal/Modal';
import Alert from './UI/Alert/Alert';
import Header from './components/Header/Header';
import Movies from './components/Movies/Movies';
const App = () => {
  const [fetchEnd, setFetchEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [fetchErr, setFetchErr] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const [movies, setMovies] = useState(null);

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setFetchEnd(false);
    // setFetchErr(false);
    setLoading(true);
    setShowModal(false);
    setFetchSuccess(false);
    fetchAllMovies()
      .then((result) => {
        setLoading(false);
        setMovies(result);
        setFetchSuccess(true);
        setFetchEnd(true);
      })
      .catch((err) => {
        setLoading(false);
        // setFetchErr(true);
        setShowModal(true);
        setFetchEnd(true);
        console.log(err.message);
      });
  }, []);
  const hideModal = () => {
    setShowModal(false);
  };
  let page = null;
  if (fetchEnd) {
    if (fetchSuccess) {
      page = (
        <>
          <Header movie={movies.banner} />
          <Movies movies={movies} />
        </>
      );
    } else {
      page = (
        <Alert message="Fetching movies from TMDB api failed. You probably need to use a VPN to fetch data properly" />
      );
    }
  }

  return (
    <>
      {loading ? <Loader /> : null}
      <Modal
        message="Fetching movies form MTDB api failed."
        show={showModal ? true : false}
        handleBackdropClick={hideModal}
      />
      {page}
    </>
  );
};

export default App;
