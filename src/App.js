import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import Dashboard from './views/Dashboard/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import { UserProvider } from './context/UserProvider';
import Welcome from './views/Welcome/Welcome';
import FoodRecs from './views/FoodRecs/FoodRecs';
import SelectedFood from './views/SelectedFood/SelectedFood';
import Eating from './views/Eating/Eating';
import NavBar from './components/NavBar/NavBar';
import BlockSignUpRoute from './utils/BlockSignUp';

function App() {
  const isLoggedIn = localStorage.getItem('authenticated');

  return (
    <UserProvider isLoggedIn={isLoggedIn}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Auth />} />
        <Route
          path="/signup"
          element={
            <BlockSignUpRoute>
              <Auth isSigningUp />
            </BlockSignUpRoute>
          }
        />
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
        <Route
          path="/eating"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Eating />
            </PrivateRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
