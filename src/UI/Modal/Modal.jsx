import React from 'react';
import Backdrop from './../Backdrop/Backdrop';

const Modal = ({ message, show, handleBackdropClick }) => {
  return (
    <>
      <Backdrop show={show} handleClick={handleBackdropClick} />
      <div className={show ? 'modal modal--show' : 'modal'}>{message}</div>
    </>
  );
};

export default Modal;
