'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Dashboard() {
  // option to choose foods - button to direct to food recs
  const [user, setUser] = useState({});

  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('user').select();
      setUser(data);
    };
    fetchData();
  }, []);

  console.log('user', user);

  return (
    <div className="home-container">
      <div className="dashboard-title-container">
        <h1>Your Home</h1>
      </div>
      <div className="home-container-bg">
        <div className="tomomi-house-container">
          <img
            className="tomomi-house-img"
            src={'../assets/tomoiru-room.png'}
            alt="built in spline 3D modeling of a corner of a room"
          />
        </div>
      </div>
    </div>
  );
}

// next attach events to elements on spline model
