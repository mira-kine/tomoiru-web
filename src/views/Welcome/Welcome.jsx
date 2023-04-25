import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadTomo } from '../../api/avatar';
import { createTomo } from '../../api/tomos';
import TomoCarousel from '../../components/TomoCarousel/TomoCarousel';
import { useUser } from '../../context/UserProvider';
import './Welcome.css';
import '../../components/Buttons/HomeButton/HomeButton';

export default function Welcome() {
  // some tomo state
  const [tomo, setTomo] = useState({});
  const [pickedTomo, setPickedTomo] = useState('');
  const navigateTo = useNavigate();
  const { currentUser } = useUser();

  // form to create Tomo
  const handleClick = (id) => () => {
    setPickedTomo((prevState) => {
      return { ...prevState, tomoId: `tomo${id}` };
    });
  };

  const updateTomo = (key, value) => {
    tomo[key] = value;
    setTomo({ ...tomo });
  };

  console.log('pickedTomo', pickedTomo);

  // currying - handler itself is the pointer, not an anonymous function ON the onClick event
  // state rerenders correct data asynchronously

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
      <div id="welcome-title-container">
        <h1>Welcome! Let's create a tomo</h1>
      </div>
      <div className="form-container">
        <TomoCarousel handleClick={handleClick} />
        <form id="welcome-form" onSubmit={(e) => handleCreate(e)}>
          <div id="name-container">
            <input
              placeholder="name"
              value={tomo.name}
              name="name"
              type="text"
              onInput={(e) => updateTomo('name', e.target.value)}
            />
            <button
              className="button button--piyo"
              onClick={(e) => handleCreate(e)}
            >
              <span className="button__text">Thank you!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
