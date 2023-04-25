import React, { useState } from 'react';
import './Carousel.css';
import '../Buttons/HomeButton/HomeButton';

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0 || newIndex > children.length - 1) {
      newIndex = 0;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1;
    }
    setActiveIndex(newIndex);
  };

  return (
    <>
      <div className="carousel">
        <div
          className="inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { width: '100%' });
          })}
        </div>
        <div className="indicators">
          <div className="button__wrapper" id="wrapper--carousel--prev">
            <button
              className="button button--piyo"
              onClick={() => {
                updateIndex(activeIndex - 1);
              }}
            >
              <span className="button__text">Previous Tomo</span>
            </button>
          </div>
          <div className="button__wrapper" id="wrapper--carousel--next">
            <button
              className="button button--piyo"
              onClick={() => updateIndex(activeIndex + 1)}
            >
              <span className="button__text">Next Tomo</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
