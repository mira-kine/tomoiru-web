// import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import Welcome from './views/Welcome';
import Chat from './views/Chat';
import { AuthProvider } from './context/AuthProvider';
import { UserProvider } from './context/UserProvider';
import NavBar from './components/NavBar';
import About from './views/About';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NavBar />
        <Routes>
          {/* {isLoggedIn === true && <NavBar />} */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/signup" element={<Auth isSigningUp />} />
          <Route
            path="/welcome"
            element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/dashboard/food-recs"
            element={
              <PrivateRoute>
                <FoodRecs />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/food-recs/:id"
            element={
              <PrivateRoute>
                <SelectedFood />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
