import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center align-center items-center w-full h-full">
      <img
        className="w-3/4"
        src={'../../assets/loading.png'}
        alt="loading acorn png"
      />
    </div>
  );
}
