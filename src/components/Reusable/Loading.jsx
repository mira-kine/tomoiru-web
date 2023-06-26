import React from 'react';
import '../../styles/Loading.css';

export default function Loading() {
  return (
    <div className="loading-page">
      <img
        className="spinner"
        src={require('../../assets/loading.png')}
        alt="loading acorn png"
      />
    </div>
  );
}
