import { createContext, useContext, useState, ReactElement } from "react";
import { useSocket } from "../hooks/useSocket";

interface ILoginContext {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  joinRoom: () => void;
}

const LoginContext = createContext({} as ILoginContext);

const params = {
  url: "http://localhost:3000",
};

const LoginContextProvider = ({ children }: { children: ReactElement }) => {
  const [name, setName] = useState("");
  const { subscribe } = useSocket(params);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(name);
  };
  const joinRoom = () => {
    console.log("clicked");
    // subscribe("login", name);
  };

  return (
    <LoginContext.Provider
      value={{
        name,
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
