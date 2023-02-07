import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './views/Auth/SignIn';
import Dashboard from './views/Dashboard/Dashboard';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
