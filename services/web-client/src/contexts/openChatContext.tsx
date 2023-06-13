import { createContext, useContext, ReactElement, useState, Dispatch, SetStateAction, useEffect } from 'react';

interface IOpenChatContext {
  openChat: boolean;
  setOpenChat: Dispatch<SetStateAction<boolean>>;
}

const OpenChatContext = createContext({} as IOpenChatContext);

interface IProps {
  children: ReactElement;
}

const OpenChatContextProvider = ({ children }: IProps) => {
  const [openChat, setOpenChat] = useState(false);

  return <OpenChatContext.Provider value={{ openChat, setOpenChat }}>{children}</OpenChatContext.Provider>;
};

const useOpenChatContext = () => useContext(OpenChatContext);

export { useOpenChatContext, OpenChatContextProvider };
