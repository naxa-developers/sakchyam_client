import React from 'react';

export default function NewLoader() {
  return (
    <>
      <div className="cssload-dots">
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
      </div>

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="12"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
