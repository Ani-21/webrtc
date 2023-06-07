import { SocketEvent } from "@/const/socketEvents";
import {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useSocketContext } from "./socketContext";

type MessageContextProps = {
  messages: IMessage[];
};

type messageProvider = {
  children: React.ReactElement;
};

interface IMessage {
  id?: string;
  socketId: string;
  timestamp: string;
  message: string;
}

const MessageContext = createContext({} as MessageContextProps);

const MessageContextProvider = ({ children }: messageProvider) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { subscribe, unsubscribe } = useSocketContext();

  const updateMessages = useCallback((data: IMessage[]) => {
    setMessages(data);
  }, []);

  useEffect(() => {
    subscribe(SocketEvent.recieveMessage, updateMessages);

    return () => unsubscribe(SocketEvent.recieveMessage);
  }, [subscribe, unsubscribe]);

  return (
    <MessageContext.Provider value={{ messages }}>
      {children}
    </MessageContext.Provider>
  );
};

const useContextMessage = () => useContext(MessageContext);
export { useContextMessage, MessageContextProvider };
