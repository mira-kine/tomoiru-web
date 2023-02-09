import { Route, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserProvider';

export default function ProtectedRoute({ children, ...rest }) {
  const { currentUser } = useUser();
  const navigateTo = useNavigate();

  console.log('currentUser', currentUser);
  return (
    <Route
      {...rest}
      render={() => (currentUser?.id ? children : navigateTo('/dashboard'))}
    />
  );
}
