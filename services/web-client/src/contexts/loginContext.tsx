import {
  createContext,
  useContext,
  useState,
  ReactElement,
  useEffect,
} from "react";
import { useSocketContext } from "./socketContext";
import { Event, Error } from "../const/socketEvents";

interface ILoginContext {
  isValidName: boolean;
  isFull: boolean;
  isLoggedIn: boolean;
  joinRoom: (name: string) => void;
}

const LoginContext = createContext({} as ILoginContext);

const LoginContextProvider = ({ children }: { children: ReactElement }) => {
  const [isValidName, setIsValidName] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { emit, subscribe, unsubscribe } = useSocketContext();

  const joinRoom = (name: string) => {
    emit(Event.userLogin, { name });
  };

  useEffect(() => {
    subscribe(Event.userValidateEnter, (msg: string) => {
      if (msg === Error.userInvalidNameError) {
        setIsValidName(false);
      } else if (msg === Error.userFullRoomError) {
        setIsFull(true);
      } else {
        setIsLoggedIn(true);
      }
    });

    return () => unsubscribe(Event.userValidateEnter);
  }, [subscribe]);

  return (
    <LoginContext.Provider
      value={{
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
