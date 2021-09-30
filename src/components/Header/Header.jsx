import React, { useRef } from 'react';
import { excerptText } from '../../utils/excerptText';
import { API_INFO as info } from './../../globals';
import NavBar from './../NavBar/NavBar';
import { FaPlay as PlayIcon } from 'react-icons/fa';
import { FaInfoCircle as InfoIcon } from 'react-icons/fa';
const Header = ({ movie }) => {
  const headerRef = useRef();
  return (
    <>
      <NavBar headerRef={headerRef} />
      <header className="header" ref={headerRef}>
        <div className="header__banner">
          <img src={`${info.image_prefix}${movie.backdrop_path}`} alt="" />
        </div>
        <div className="inner-container">
          <div className="header__info">
            <h1 className="header__title">{movie.name || movie.title}</h1>
            <div className="header__controls">
              <button className="header__btn">
                <div className="icon">
                  <PlayIcon />
                </div>
                play
              </button>
              <button className="header__btn">
                <div className="icon">
                  <InfoIcon />
                </div>
                info
              </button>
            </div>
            <p className="header__desc">{excerptText(movie.overview, 30)}</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
