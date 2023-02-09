import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import Dashboard from './views/Dashboard/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import { UserProvider } from './context/UserProvider';
import Welcome from './views/Welcome/Welcome';
import { TomoProvider } from './context/TomoProvider';

function App() {
  const isLoggedIn = localStorage.getItem('authenticated');

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Auth />} />
        {/* <TomoProvider> */}
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
        {/* </TomoProvider> */}
      </Routes>
    </UserProvider>
  );
}

export default App;
