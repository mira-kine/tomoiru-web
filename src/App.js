import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import Dashboard from './views/Dashboard/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import { UserProvider } from './context/UserProvider';
import Welcome from './views/Welcome/Welcome';
import FoodRecs from './views/FoodRecs/FoodRecs';
import SelectedFood from './components/SelectedFood';

function App() {
  const isLoggedIn = localStorage.getItem('authenticated');

  return (
    <UserProvider>
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
        <Route
          path="/food-recs/:id"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <SelectedFood />
            </PrivateRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
