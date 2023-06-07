import {
  createContext,
  useContext,
  useState,
  ReactElement,
  useEffect,
  useCallback,
} from "react";
import { useSocketContext } from "./socketContext";
import { SocketEvent, SocketError } from "../const/socketEvents";

interface IData {
  name: string;
  userId: string;
  error?: string;
}

interface ILoginContext {
  userData: IData;
  isValidName: boolean;
  isFull: boolean;
  isLoggedIn: boolean;
  joinRoom: (name: string) => void;
}

const LoginContext = createContext({} as ILoginContext);

const LoginContextProvider = ({ children }: { children: ReactElement }) => {
  const [userData, setUserData] = useState<IData>({
    name: "",
    userId: "",
  });
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
        setUserData({
          name: data.name,
          userId: data.userId,
        });
        setIsLoggedIn(true);
      }
    });

    return () => unsubscribe(SocketEvent.userValidateEnter);
  }, [subscribe, unsubscribe]);

  return (
    <LoginContext.Provider
      value={{
        userData,
        isValidName,
        isFull,
        isLoggedIn,
        joinRoom,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);
export { LoginContextProvider, useLoginContext };
