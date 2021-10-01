import React, { useState, useEffect, useRef, createRef } from 'react';
import { API_INFO as info } from './../../globals';
import { IoIosArrowForward as NextIcon } from 'react-icons/io';
import { IoIosArrowBack as PrevIcon } from 'react-icons/io';
const MovieSlider = ({ title, movies, poster }) => {
  const moviesRef = useRef(movies.map(() => createRef()));
  const containerRef = useRef();
  const [index, setIndex] = useState(0);
  const [itemCount, setItemCount] = useState(null);
  const [moveStep, setMoveStep] = useState(null);
  // touching states
  const [touching, setTouching] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [moveDiff, setMoveDiff] = useState(0);
  const [lastTransform, setLastTransform] = useState(null);
  const maxIndex = movies.length - itemCount;
  const setItemsWidth = (number) => {
    getAllSlides().forEach((slide) => {
      slide.style.width = `${100 / number}%`;
    });
  };
  const getAllSlides = () => {
    return moviesRef.current.map((item) => item.current);
  };
  const move = (moveIndex) => {
    getAllSlides().forEach((slide) => {
      slide.style.transform = `translateX(${moveIndex * -100}%)`;
    });
    updateLastTransform();
  };
  const goForward = (indexCount) => {
    setIndex(indexCount);
  };
  const goBackward = (indexCount) => {
    setIndex(indexCount);
  };
  const configSlider = () => {
    setMoveStep(2);
    setItemCount(2);
    if (window.matchMedia('(min-width: 30em)').matches) {
      setMoveStep(2);
      setItemCount(3);
    }
    if (window.matchMedia('(min-width: 45em)').matches) {
      setMoveStep(3);
      setItemCount(4);
    }
    if (window.matchMedia('(min-width: 60em)').matches) {
      setMoveStep(5);
      setItemCount(6);
    }
    if (window.matchMedia('(min-width: 80em)').matches) {
      setMoveStep(7);
      setItemCount(8);
    }
  };
  const handleWindowResize = () => {
    setIndex(0);
    configSlider();
  };
  const getStartPos = (event) => {
    return event.type.includes('mouse')
      ? event.clientX
      : event.touches[0].clientX;
  };
  const getMoveLength = (event) => {
    return event.type.includes('mouse')
      ? event.clientX - startPos
      : event.touches[0].clientX - startPos;
  };
  const removeTransition = () => {
    getAllSlides().map((slide) => {
      slide.style.transition = 'none';
    });
  };
  const setTransition = () => {
    getAllSlides().map((slide) => {
      slide.style.transition = '.3s linear';
    });
  };
  const moveSlider = (offset) => {
    getAllSlides().map((slide) => {
      slide.style.transform = `translateX(${lastTransform + offset}px)`;
    });
  };
  const updateLastTransform = () => {
    const item = getAllSlides()[0];
    const transformValue = +window
      .getComputedStyle(item)
      .getPropertyValue('transform')
      .split(',')[4]
      .trim();
    setLastTransform(transformValue);
  };
  const handleTouchStart = (e) => {
    setTouching(true);
    const startPos = getStartPos(e);
    setStartPos(startPos);
    removeTransition();
    updateLastTransform();
    // console.log(startPos);
    // console.log(lastTransform);
  };
  const handleTouchMove = (e) => {
    if (!touching) {
      return;
    }
    const moveLength = getMoveLength(e);
    setMoveDiff(moveLength);
    moveSlider(moveLength);
  };
  const handleTouchEnd = (e) => {
    setTouching(false);
    setTransition();
    setMoveDiff(0);
    const itemWidth = getAllSlides()[0].offsetWidth;
    console.log(itemWidth);
    if (moveDiff > 0) {
      if (moveDiff > itemWidth) {
        const shiftCount = Math.floor(moveDiff / itemWidth);
        setIndex(index - shiftCount - 1);
      } else {
        move(index);
      }
    }
    if (moveDiff < 0) {
      if (moveDiff < -itemWidth) {
        const shiftCount = Math.floor(-moveDiff / itemWidth);
        setIndex(index + shiftCount + 1);
      } else {
        move(index);
      }
    }
  };
  useEffect(() => {
    setItemsWidth(itemCount);
  }, [itemCount]);
  useEffect(() => {
    if (index > maxIndex) {
      setIndex(maxIndex);
    }
    if (index < 0) {
      setIndex(0);
    }
    move(index);
  }, [index]);
  useEffect(() => {
    containerRef.current.addEventListener('touchstart', handleTouchStart);
    containerRef.current.addEventListener('mousedown', handleTouchStart);
    containerRef.current.addEventListener('touchmove', handleTouchMove);
    containerRef.current.addEventListener('mousemove', handleTouchMove);
    containerRef.current.addEventListener('touchend', handleTouchEnd);
    containerRef.current.addEventListener('mouseup', handleTouchEnd);
    return () => {
      containerRef.current.removeEventListener('touchstart', handleTouchStart);
      containerRef.current.removeEventListener('mousedown', handleTouchStart);
      containerRef.current.removeEventListener('touchmove', handleTouchMove);
      containerRef.current.removeEventListener('mousemove', handleTouchMove);
      containerRef.current.removeEventListener('touchend', handleTouchEnd);
      containerRef.current.removeEventListener('mouseup', handleTouchEnd);
    };
  }, [touching, startPos, moveDiff, lastTransform]);
  const removeContextMenu = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    configSlider();
    window.addEventListener('resize', handleWindowResize);
    containerRef.current.addEventListener('contextmenu', removeContextMenu);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      containerRef.current.removeEventListener(
        'contextmenu',
        removeContextMenu
      );
    };
  }, []);

  return (
    <div className="movies__slider">
      <h2 className="movies__title">{title}</h2>

      <div className="movies__container" ref={containerRef}>
        <button
          className={`arrow arrow--prev ${index === 0 ? 'arrow--hidden' : ''}`}
          onClick={() => goBackward(index - moveStep)}>
          <PrevIcon />
        </button>
        <button
          className={`arrow arrow--next ${
            index === maxIndex ? 'arrow--hidden' : ''
          }`}
          onClick={() => goForward(index + moveStep)}>
          <NextIcon />
        </button>
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="movies__item"
            ref={moviesRef.current[index]}>
            <img
              draggable="false"
              src={`${info.image_prefix}${
                poster ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
