// import './App.css';
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
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
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
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/dashboard/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          /> */}
          <Route
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
          />
          <Route
            path="/eating"
            element={
              <PrivateRoute>
                <Eating />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
