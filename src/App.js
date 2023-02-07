import './App.css';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './views/Auth/SignIn';
import SignUp from './views/Auth/SignUp';

function App() {
  return (
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );
}

export default App;
