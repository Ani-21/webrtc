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
  isFull: boolean;
  isLoggedIn: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  joinRoom: () => void;
}

const LoginContext = createContext({} as ILoginContext);

const LoginContextProvider = ({ children }: { children: ReactElement }) => {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { emit, subscribe } = useSocketContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const joinRoom = () => {
    emit(Event.login, name);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    subscribe(Event.isFull, (msg: boolean) => setIsFull(msg));
  }, []);

  return (
    <LoginContext.Provider
      value={{
        name,
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
