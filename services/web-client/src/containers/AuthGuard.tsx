import { Navigate } from 'react-router-dom';
import { useLoginContext } from '@/contexts/loginContext';

interface IProps {
  children: React.ReactElement;
}

export const AuthGuard: React.FC<IProps> = ({ children }) => {
  const { isLoggedIn } = useLoginContext();

  if (!isLoggedIn) return <Navigate to="/" />;

  return children as React.ReactElement;
};
