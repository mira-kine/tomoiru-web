import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EatingAnimation from '../../components/EatingAnimation/EatingAnimation';

export default function Eating() {
  const [showEating, setShowEating] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    setInterval(() => {
      setShowEating(false);
      navigateTo('/dashboard');
    }, 2700);
    // clearTimeout(timer);
  }, []);

  return <div>{showEating && <EatingAnimation />}</div>;
}
