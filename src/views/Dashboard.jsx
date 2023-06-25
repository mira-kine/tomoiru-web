import React, { useState } from 'react';
import '../styles/Dashboard.css';
import Spline from '@splinetool/react-spline';
import Loading from '../components/Reusable/Loading';

export default function Dashboard() {
  // const navigateTo = useNavigate();
  // option to choose foods - button to direct to food recs
  const [modelLoading, setModelLoading] = useState(true);

  return (
    <div className="home-container">
      <div id="dashboard-title-container">
        <h1>Home</h1>
      </div>
      <div className="home-container-bg">
        <div className="tomomi-house-container">
          {modelLoading && (
            <>
              <Loading />
            </>
          )}
          <Spline
            onLoad={() => setModelLoading(false)}
            scene="https://prod.spline.design/kSovaMZ-tN4qcT9P/scene.splinecode"
          />
        </div>
      </div>
    </div>
  );
}

// next attach events to elements on spline model
