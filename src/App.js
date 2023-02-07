import './App.css';
import Home from './views/Home/Home';
import SignIn from './views/Auth/SignIn';
import Dashboard from './views/Dashboard/Dashboard';
import { AuthContextProvider } from './context/AuthContext';
import { Route, Switch } from 'react-router-dom';
import SignUp from './views/Auth/SignUp';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
