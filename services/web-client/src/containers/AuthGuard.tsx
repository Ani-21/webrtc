import { Navigate, Outlet } from 'react-router-dom';
import { useLoginContext } from '@/contexts/loginContext';

export const AuthGuard = () => {
  const { isLoggedIn } = useLoginContext();

  return !isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};
