import React from 'react';
import Carousel, { CarouselItem } from './CarouselItem';
import { tomoOptions } from '../../data/tomos';
import './TomoCarousel.css';

export default function TomoCarousel({ handleClick, toggle }) {
  // try using useReducer() in the future

  return (
    <>
      <Carousel>
        {tomoOptions.map((img, index) => {
          return (
            <CarouselItem handleClick={handleClick}>
              <img
                className="tomo-option"
                id={index}
                key={img.id}
                src={require(`../../assets/${img.path}`)}
                alt={img.name}
                style={{ border: toggle ? '2px solid white' : 'none' }}
              />
              <button
                className="button button--option"
                onClick={handleClick(index)}
              >
                <span className="button__text">
                  {toggle ? 'Nevermind' : 'Select'}
                </span>
              </button>
            </CarouselItem>
          );
        })}
      </Carousel>
    </>
  );
}
