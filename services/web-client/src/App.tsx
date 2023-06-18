import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { LoginFull } from './components/Login/LoginFull';
import { RoomPage } from './components/Room/RoomPage';
import { useSocketContext } from './contexts/socketContext';

export const App = () => {
  const { connect, disconnect } = useSocketContext();

  useEffect(() => {
    connect();

    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/full" element={<LoginFull />} />
      <Route index path="/room" element={<RoomPage />} />
    </Routes>
  );
};
