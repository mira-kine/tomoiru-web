import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadTomo } from '../../api/avatar';
import { createTomo, getTomo } from '../../api/tomos';
import { useUser } from '../../context/UserProvider';

export default function Welcome() {
  // some tomo state
  const [tomo, setTomo] = useState({});
  const { currentUser } = useUser();
  // form to create Tomo
  const navigateTo = useNavigate();

  const updateTomo = (key, value) => {
    tomo[key] = value;
    setTomo({ ...tomo });
  };

  const uploadFile = async (e) => {
    await uploadTomo(currentUser.id, e.target.files[0]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTomo(currentUser, tomo);
      navigateTo('/dashboard');
    } catch {
      alert('error creating');
    }
  };

  return (
    <div>
      <h1>Welcome! Let's create a tomo</h1>
      <form onSubmit={handleCreate}>
        <input
          placeholder="name"
          value={tomo.name}
          name="name"
          type="text"
          onInput={(e) => updateTomo('name', e.target.value)}
        />
        <input type="file" onChange={uploadFile} />
      </form>
      <button onClick={handleCreate}>Can't wait to meet you!</button>
    </div>
  );
}
