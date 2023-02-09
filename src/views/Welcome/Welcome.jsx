import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTomo } from '../../api/tomos';
import { useUser } from '../../context/UserProvider';

export default function Welcome() {
  return <div>Welcome!</div>;
}
