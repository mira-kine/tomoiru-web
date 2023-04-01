import React, { useEffect, useState } from 'react';
import { getFoods } from '../../api/foods';
import FoodList from '../../components/FoodList';
import { YourTomo } from '../../components/YourTomo/YourTomo';
import { useUser } from '../../context/UserProvider';
import { useTomo } from '../../hooks/useTomo';
import './FoodRecs.css';
import '../Dashboard/Dashboard.css';
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

export default function FoodRecs() {
  const { currentUser } = useUser();
  const tomo = useTomo({ currentUser });
  const [foodsList, setFoodsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      const resp = await getFoods();
      setFoodsList(resp);
      setLoading(false);
    };
    fetchFoods();
  }, []);

  const handleHome = () => {
    navigateTo('/dashboard');
  };

  if (loading) {
    <h1>Loading...</h1>;

    return (
      <div class="home-container">
        <NavBar />
        <div id="dashboard-title-container">
          <h1>What shall we do today?</h1>
        </div>
        <div class="home-container-bg">
          <div class="user-container">
            <div class="tomo-container">
              <div class="tomo-div">
                <YourTomo tomo={tomo} handleHome={handleHome} />
              </div>
            </div>
            <div class="interactive-box">
              <FoodList foodsList={foodsList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
