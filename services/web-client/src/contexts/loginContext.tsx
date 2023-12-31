import { createContext, useContext, useState, ReactElement, useEffect, useCallback } from 'react';
import { useSocketContext } from './socketContext';
import { SocketEvent, SocketError } from '../const/socketEvents';
import { IData, IMessage, IUser } from '@/models';
import { useVideoChatContext } from './videoChatContext';
import { useRoom } from '@livekit/react-components';

interface ILoginContext {
  userData: IUser;
  isValidName: boolean;
  isFull: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFull: React.Dispatch<React.SetStateAction<boolean>>;
  joinRoom: (name: string) => void;
  leaveRoom: () => void;
  messageHistory: IMessage[];
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
  const { setUsers } = useVideoChatContext();
  const { participants } = useRoom();

  console.log('LOGIN CONTEXT', isLoggedIn);

  const joinRoom = useCallback(
    (name: string) => {
      emit(SocketEvent.userLogin, { name });
    },
    [emit]
  );

  const leaveRoom = useCallback(() => {
    emit(SocketEvent.userLogout, userData.userId);
    console.log('USER LEFT', userData.userId);
  }, [userData.userId, emit]);

  useEffect(() => {
    subscribe(SocketEvent.userValidateEnter, (data: IData) => {
      if (data.error === SocketError.userInvalidNameError) {
        setIsValidName(false);
      } else if (data.error === SocketError.userFullRoomError) {
        setIsFull(true);
      } else {
        const { userData: userInfo } = data;
        setMessageHistory(data.messages);
        setUserData({
          name: userInfo.name,
          userId: userInfo.userId,
          token: userInfo.token,
        });
        setIsLoggedIn(true);
        setUsers(participants);
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
        setIsLoggedIn,
        joinRoom,
        leaveRoom,
        messageHistory,
        setIsFull,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);
export { LoginContextProvider, useLoginContext };
