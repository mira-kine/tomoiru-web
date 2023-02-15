// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import Dashboard from './views/Dashboard/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import { useStateWithStorage } from './hooks/useStateWithStorage';
// import { UserProvider } from './context/UserProvider';
import Welcome from './views/Welcome/Welcome';
import FoodRecs from './views/FoodRecs/FoodRecs';
import SelectedFood from './views/SelectedFood/SelectedFood';
import Eating from './views/Eating/Eating';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './api/users';

function App() {
  const [authToken, setAuthToken] = useStateWithStorage(false, 'authenticated');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
      } else {
        return;
      }
    };
    fetchUser();
  }, []);

  return (
    // <UserProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/signin"
        element={
          <Auth
            authToken={authToken}
            setAuthToken={setAuthToken}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        }
      />
      <Route path="/signup" element={<Auth isSigningUp />} />
      <Route
        path="/welcome"
        element={
          <PrivateRoute isLoggedIn={authToken}>
            <Welcome />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isLoggedIn={authToken}>
            <Dashboard currentUser={currentUser} />
          </PrivateRoute>
        }
      />
      <Route
        path="/food-recs"
        element={
          <PrivateRoute isLoggedIn={authToken}>
            <FoodRecs />
          </PrivateRoute>
        }
      />
      <Route
        path="/food-recs/:id"
        element={
          <PrivateRoute isLoggedIn={authToken}>
            <SelectedFood />
          </PrivateRoute>
        }
      />
      <Route
        path="/eating"
        element={
          <PrivateRoute isLoggedIn={authToken}>
            <Eating />
          </PrivateRoute>
        }
      />
    </Routes>
    // </UserProvider>
  );
}

export default App;
