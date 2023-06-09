import React, { ReactElement, useContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { publicConfig } from "../config/publicConfig";

const DEFAULT_SOCKET_STATE = {};

interface IUserManagementContext {
  children?: any;
  connect: () => void;
  disconnect: () => void;
  subscribe: (event: string, handler?: any) => void;
  unsubscribe: (event: string, handler?: any) => void;
  emit: (event: string, data?: any) => void;
  emitAnyway: (event: string, data?: any) => void;
  isConnected: boolean;
}

interface IProps {
  children: ReactElement;
}

const SocketContext = React.createContext(
  DEFAULT_SOCKET_STATE as IUserManagementContext
);

const SocketContextProvider: React.FC<IProps> = (props) => {
  const { children } = props;

  const actions = useSocket({
    url: publicConfig.socketUrl,
  });

  return (
    <SocketContext.Provider
      value={{
        ...actions,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocketContext = () => useContext(SocketContext);
export { useSocketContext, SocketContextProvider };
