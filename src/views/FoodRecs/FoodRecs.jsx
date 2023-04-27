import React, { useEffect, useState } from 'react';
import { getFoods } from '../../api/foods';
import FoodList from '../../components/FoodList';
import { YourTomo } from '../../components/YourTomo/YourTomo';
import { useUser } from '../../context/UserProvider';
import { useTomo } from '../../hooks/useTomo';
import './FoodRecs.css';
import '../Dashboard/Dashboard.css';
import NavBar from '../../components/NavBar/NavBar';

export default function FoodRecs() {
  const { currentUser } = useUser();
  const tomo = useTomo({ currentUser });
  const [foodsList, setFoodsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      const resp = await getFoods();
      setFoodsList(resp);
    };
    fetchFoods();
    setLoading(false);
  }, []);

  if (loading) {
    <h1>Loading...</h1>;
  }

  return (
    <div className="home-container">
      <NavBar />
      <div id="dashboard-title-container">
        <h1>What shall we do today?</h1>
      </div>
      <div className="home-container-bg">
        <div className="user-container">
          <div className="tomo-container">
            <div className="tomo-div">
              <YourTomo tomo={tomo} />
            </div>
          </div>
          <div className="interactive-box">
            <FoodList foodsList={foodsList} />
          </div>
        </div>
      </div>
    </div>
  );
}
