import {
  createContext,
  useContext,
  useState,
  ReactElement,
  useEffect,
} from "react";
import { useSocketContext } from "./socketContext";
import { Event } from "../const/socketEvents";

interface ILoginContext {
  name: string;
  isValidName: boolean;
  isFull: boolean;
  isLoggedIn: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  joinRoom: () => void;
}

const LoginContext = createContext({} as ILoginContext);

const LoginContextProvider = ({ children }: { children: ReactElement }) => {
  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { emit, subscribe } = useSocketContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const joinRoom = () => {
    emit(Event.login, name);
    subscribe(Event.validateUsername, (msg: boolean) => {
      setIsLoggedIn(msg);
      setIsValidName(msg);
    });
  };

  useEffect(() => {
    subscribe(Event.isFull, (msg: boolean) => setIsFull(msg));
  }, []);
  return (
    <LoginContext.Provider
      value={{
        name,
        isValidName,
        isFull,
        isLoggedIn,
        handleChange,
        joinRoom,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);
export { LoginContextProvider, useLoginContext };
