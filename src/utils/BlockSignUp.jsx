import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../api/users';

const BlockSignUpRoute = ({ children }) => {
  const user = getCurrentUser();
  const [span, setShowSpan] = useState(true);

  useEffect(() => {
    const fetchingSpan = async () => {
      const timer = await new Promise((r) => setTimeout(r, 1500));
      setShowSpan(false);
      clearTimeout(timer);
    };
    fetchingSpan();
  }, []);

  if (user) {
    return (
      <>
        {span ? (
          <span>You already have an account! Navigating you to sign in...</span>
        ) : (
          <Navigate to="/signin" replace={true} />
        )}
      </>
    );
  }
  return children;
};

export default BlockSignUpRoute;
