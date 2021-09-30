import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__backdrop">
        <div className="loader__animation">
          <div className="loader__circle loader__circle--1">
            <div className="loader__circle loader__circle--2">
              <div className="loader__circle loader__circle--3">
                <div className="loader__circle loader__circle--4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
