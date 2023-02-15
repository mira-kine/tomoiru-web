import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTomo } from '../../hooks/useTomo';
import NavBar from '../../components/NavBar/NavBar';
import './Dashboard.css';

export default function Dashboard({ currentUser }) {
  // const [loading, setLoading] = useState(false);
  const tomo = useTomo({ currentUser });
  const navigateTo = useNavigate();

  // option to choose foods - button to direct to food recs
  const handleClick = () => {
    navigateTo('/food-recs');
  };

  return (
    <div id="dashboard-view-container">
      <NavBar />
      <div id="title-container">
        <h1>What shall we do today?</h1>
      </div>
      <div id="tomo-container">
        <img id="tomo-img" src={tomo.avatar} alt="your tomo img" />
      </div>
      <button onClick={handleClick}>Feed Me!</button>
    </div>
  );
}
