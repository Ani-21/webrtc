import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { LoginFull } from './components/Login/LoginFull';
import { Room } from './components/Room/Room';
import { AuthGuard } from './containers/AuthGuard';
import { useSocketContext } from './contexts/socketContext';

export const App = () => {
  const { connect } = useSocketContext();

  useEffect(() => {
    connect();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/full" element={<LoginFull />} />
      <Route element={<AuthGuard />}>
        <Route path="/room" element={<Room />} />
      </Route>
    </Routes>
  );
};
