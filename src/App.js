import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import Dashboard from './views/Dashboard/Dashboard';
import { UserProvider } from './context/UserProvider';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
