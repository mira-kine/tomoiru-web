import './App.css';
import Home from './views/Home/Home';
import SignIn from './views/Auth/SignIn';
import Dashboard from './views/Dashboard/Dashboard';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import { Route, Switch } from 'react-router-dom';
import SignUp from './views/Auth/SignUp';

function App() {
  const user = UserAuth();
  console.log('user', user);
  return (
    <div>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/dashboard">
            {user && <Dashboard />}
          </Route>
        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
