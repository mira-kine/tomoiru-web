import React from 'react';

export default function YourTomo({ tomo }) {
  return (
    <>
      <img id="tomo-img" src={tomo.avatar} alt="your tomo img" />
    </>
  );
}
