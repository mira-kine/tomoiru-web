import React from 'react';
import { tomoOptions } from '../../data/tomos';

export default function TomoCarousel({ handleClick }) {
  return (
    <>
      <div id="options-container">
        {tomoOptions.map((img, index) => {
          return (
            <img
              className="tomo-option"
              id={index}
              key={img.id}
              src={require(`../../assets/${img.path}`)}
              alt={img.name}
              onClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    </>
  );
}
