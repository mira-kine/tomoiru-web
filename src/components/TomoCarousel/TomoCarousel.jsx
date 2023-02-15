import React from 'react';
import Carousel, { CarouselItem } from './CarouselItem';
import { tomoOptions } from '../../data/tomos';

export default function TomoCarousel({ handleClick }) {
  // try using useReducer() in the future

  return (
    <>
      <Carousel>
        {tomoOptions.map((img, index) => {
          return (
            <CarouselItem>
              <img
                className="tomo-option"
                id={index}
                key={img.id}
                src={require(`../../assets/${img.path}`)}
                alt={img.name}
                onClick={() => handleClick(index)}
              />
            </CarouselItem>
          );
        })}
      </Carousel>
    </>
  );
}
