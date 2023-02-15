import React, { useState } from 'react';
import { tomoOptions } from '../../data/tomos';

export default function TomoCarousel({ handleClick }) {
  const [index, setIndex] = useState(0);
  const length = tomoOptions.length;
  // try using useReducer() in the future

  const handlePrev = () => {
    const newIndex = index - 1;
    // if index less than 0, go back to the end of the carousel
    setIndex(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = () => {
    // new index will be the current + 1
    const newIndex = index + 1;
    setIndex(newIndex >= length ? 0 : newIndex);
  };

  return (
    <>
      <div id="options-container">
        {/* {tomoOptions.map((img, index) => {
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
        })} */}

        <button onClick={handlePrev}>Previous Tomo</button>
        <button onClick={handleNext}>Next Tomo</button>
      </div>
    </>
  );
}
