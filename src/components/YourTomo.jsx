import React from 'react';
import { useTomo } from '../context/TomoProvider';

export default function YourTomo() {
  const { tomo } = useTomo();
  return (
    <>
      <img id="tomo-img" src={tomo.avatar} alt="your tomo img" />
    </>
  );
}
