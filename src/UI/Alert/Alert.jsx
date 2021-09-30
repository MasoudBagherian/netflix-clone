import React from 'react';
import { MdError as ErrorIcon } from 'react-icons/md';
const Alert = ({ message }) => {
  return (
    <div className="alert">
      <div className="alert__icon">
        <ErrorIcon />
      </div>
      <div className="alert__content">
        <div className="alert__type">error</div>
        <div className="alert__text">{message}</div>
      </div>
    </div>
  );
};

export default Alert;
