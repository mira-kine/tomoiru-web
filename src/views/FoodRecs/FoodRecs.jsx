import React, { useEffect, useState } from 'react';
import { getFoods } from '../../api/foods';
import FoodList from '../../components/FoodList';
import { YourTomo } from '../../components/YourTomo/YourTomo';
import { useUser } from '../../context/UserProvider';
import { useTomo } from '../../hooks/useTomo';
import './FoodRecs.css';
import '../Dashboard/Dashboard.css';

export default function FoodRecs() {
  const { currentUser } = useUser();
  const tomo = useTomo({ currentUser });
  const [foodsList, setFoodsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      const resp = await getFoods();
      setFoodsList(resp);
      setLoading(false);
    };
    fetchFoods();
  }, []);

  if (loading) {
    <h1>Loading...</h1>;
  }

  return (
    <div class="home-container">
      <div class="home-container-bg">
        <div class="tomo-container">
          <div class="tomo-div">
            <YourTomo tomo={tomo} />
          </div>
        </div>
        <div class="interactive-box">
          <FoodList foodsList={foodsList} />
        </div>
      </div>
    </div>
  );
}
