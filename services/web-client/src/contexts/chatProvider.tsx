import { SocketEvent } from "@/const/socketEvents";
import {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useLoginContext } from "./loginContext";
import { useSocketContext } from "./socketContext";
import { v4 as uuidv4 } from "uuid";

interface ChatContextProps {
  messages: IMessage[];
  sendMessage: (message: string, callback: VoidFunction) => void;
}

interface chatProviderProps {
  children: React.ReactElement;
}

interface IMessage {
  id: string;
  name: string
  userId: string;
  timestamp: string;
  message: string;
}

const ChatContext = createContext({} as ChatContextProps);

const ChatContextProvider = ({ children }: chatProviderProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { emit, subscribe, unsubscribe } = useSocketContext();
  const { userData, isLoggedIn, messageHistory } = useLoginContext();

  const sendMessage = useCallback(
    (message: string, callback: VoidFunction) => {
      if (message.trim().length) {
        const data: IMessage = {
          id: uuidv4(),
          name: userData.name,
          message,
          userId: userData.userId,
          timestamp: new Date().toLocaleString("ru"),
        };
        emit(SocketEvent.sendMessage, data);
        callback();
      }
    },
    [userData.userId]
  );

  const updateMessages = useCallback((messageData: IMessage) => {
    setMessages((prev) => [...prev, messageData]);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setMessages(messageHistory);
      subscribe(SocketEvent.recieveMessage, updateMessages);

      return () => {
        unsubscribe(SocketEvent.recieveMessage);
      };
    }

  }, [subscribe, unsubscribe, isLoggedIn, updateMessages]);

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

const useContextChat = () => useContext(ChatContext);
export { useContextChat, ChatContextProvider };
