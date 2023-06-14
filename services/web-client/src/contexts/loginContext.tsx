import { createContext, useContext, useState, ReactElement, useEffect, useCallback } from 'react';
import { useSocketContext } from './socketContext';
import { SocketEvent, SocketError } from '../const/socketEvents';
import { useNavigate } from 'react-router-dom';

interface IUser {
  name: string;
  userId: string;
  token: string;
}

interface IData {
  messages: IMessage[];
  userData: IUser;
  token: string;
  error?: string;
}

interface ILoginContext {
  userData: IUser;
  isValidName: boolean;
  isFull: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  joinRoom: (name: string) => void;
  leaveRoom: () => void;
  messageHistory: IMessage[];
}

interface IMessage {
  id: string;
  name: string;
  userId: string;
  timestamp: string;
  message: string;
}

const LoginContext = createContext({} as ILoginContext);

const LoginContextProvider = ({ children }: { children: ReactElement }) => {
  const [userData, setUserData] = useState<IUser>({
    name: '',
    userId: '',
    token: '',
  });
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);
  const [isValidName, setIsValidName] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { emit, subscribe, unsubscribe } = useSocketContext();

  const joinRoom = useCallback((name: string) => {
    emit(SocketEvent.userLogin, { name });
  }, []);

  const leaveRoom = useCallback(() => {
    emit(SocketEvent.userLogout, { id: userData.userId, isLoggedIn });
  }, [isLoggedIn]);

  useEffect(() => {
    subscribe(SocketEvent.userValidateEnter, (data: IData) => {
      if (data.error === SocketError.userInvalidNameError) {
        setIsValidName(false);
      } else if (data.error === SocketError.userFullRoomError) {
        setIsFull(true);
      } else {
        const { userData: userInfo } = data;
        setUserData({
          name: userInfo.name,
          userId: userInfo.userId,
          token: userInfo.token,
        });
        setMessageHistory(data.messages);
        setIsLoggedIn(true);
      }
    });

    subscribe(SocketEvent.userLogin, (res: boolean) => setIsLoggedIn(res));

    return () => {
      unsubscribe(SocketEvent.userValidateEnter);
      unsubscribe(SocketEvent.userLogin);
    };
  }, [subscribe, unsubscribe]);

  return (
    <LoginContext.Provider
      value={{
        userData,
        isValidName,
        isFull,
        isLoggedIn,
        setIsLoggedIn,
        joinRoom,
        leaveRoom,
        messageHistory,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);
export { LoginContextProvider, useLoginContext };
