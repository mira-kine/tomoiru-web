import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import Dashboard from './views/Dashboard/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import { UserProvider } from './context/UserProvider';
import { TomoProvider } from './context/TomoProvider';
import Welcome from './views/Welcome/Welcome';
import FoodRecs from './views/FoodRecs/FoodRecs';

function App() {
  const isLoggedIn = localStorage.getItem('authenticated');

  return (
    <UserProvider>
      <TomoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/signup" element={<Auth isSigningUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Welcome />
              </PrivateRoute>
            }
          />
          <Route
            path="/food-recs"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <FoodRecs />
              </PrivateRoute>
            }
          />
        </Routes>
      </TomoProvider>
    </UserProvider>
  );
}

export default App;
