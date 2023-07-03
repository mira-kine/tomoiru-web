// Will be rendered as the main component of this page
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';
import Dashboard from './Dashboard';
import PrivateRoute from '../utils/PrivateRoute';
import Welcome from './Welcome';
import Chat from './Chat';
import { AuthProvider } from '../context/AuthProvider';
import { UserProvider } from '../context/UserProvider';
import NavBar from '../components/NavBar';
import About from './About';
// import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NavBar />
        <Router>
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
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}
