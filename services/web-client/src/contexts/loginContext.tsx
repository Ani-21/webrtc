import { createContext, useContext, useState, ReactElement, useEffect, useCallback } from 'react';
import { useSocketContext } from './socketContext';
import { SocketEvent, SocketError } from '../const/socketEvents';

interface IUser {
  name: string;
  userId: string;
}

interface IData {
  userData: IUser;
  messages: IMessage[];
  error?: string;
}

interface ILoginContext {
  userData: IUser;
  isValidName: boolean;
  isFull: boolean;
  isLoggedIn: boolean;
  joinRoom: (name: string) => void;
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
  });
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);
  const [isValidName, setIsValidName] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { emit, subscribe, unsubscribe } = useSocketContext();

  const joinRoom = useCallback((name: string) => {
    emit(SocketEvent.userLogin, { name });
  }, []);

  useEffect(() => {
    subscribe(SocketEvent.userValidateEnter, (data: IData) => {
      if (data.error === SocketError.userInvalidNameError) {
        setIsValidName(false);
      } else if (data.error === SocketError.userFullRoomError) {
        setIsFull(true);
      } else {
        const { userData } = data;
        setUserData({
          name: userData.name,
          userId: userData.userId,
        });
        setMessageHistory(data.messages);
        setIsLoggedIn(true);
      }
    });

    return () => {
      unsubscribe(SocketEvent.userValidateEnter);
    };
  }, [subscribe, unsubscribe]);

  return (
    <LoginContext.Provider
      value={{
        userData,
        isValidName,
        isFull,
        isLoggedIn,
        joinRoom,
        messageHistory,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);
export { LoginContextProvider, useLoginContext };
