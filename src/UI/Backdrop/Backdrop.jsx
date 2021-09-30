import React from 'react';

const Backdrop = ({ show, handleClick }) => {
  return (
    <div
      className={show ? 'backdrop backdrop--show' : 'backdrop'}
      onClick={handleClick}></div>
  );
};

export default Backdrop;
