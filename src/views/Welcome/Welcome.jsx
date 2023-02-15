import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadTomo } from '../../api/avatar';
import { createTomo } from '../../api/tomos';
import { useUser } from '../../context/UserProvider';
import TomoCarousel from '../../components/TomoCarousel/TomoCarousel';
import './Welcome.css';

export default function Welcome() {
  // some tomo state
  const [tomo, setTomo] = useState({});
  const { currentUser } = useUser();
  const [pickedTomo, setPickedTomo] = useState('');
  // form to create Tomo
  const navigateTo = useNavigate();

  const updateTomo = (key, value) => {
    tomo[key] = value;
    setTomo({ ...tomo });
  };

  const handleClick = (id) => {
    setPickedTomo(`tomo${id}`);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const publicURL = await uploadTomo(pickedTomo);
      await createTomo(currentUser, tomo, publicURL);
      navigateTo('/dashboard');
    } catch {
      alert('error creating');
    }
  };

  return (
    <div id="welcome-container">
      <h1>Welcome! Let's create a tomo</h1>
      <form onSubmit={handleCreate} id="welcome-form">
        {/* user picks one -> whatever the name is,  */}
        <TomoCarousel handleClick={handleClick} />

        <div id="name-container">
          <input
            placeholder="name"
            value={tomo.name}
            name="name"
            type="text"
            onInput={(e) => updateTomo('name', e.target.value)}
          />
        </div>
      </form>
      <button onClick={handleCreate}>Can't wait to meet you!</button>
    </div>
  );
}
