import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Redirect to="/" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
