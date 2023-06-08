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

interface ChatContextProps {
  messages: IMessage[];
  getAllMessages: (data: IMessage[]) => void;
  sendMessage: (message: string, callback: VoidFunction) => void;
}

interface chatProviderProps {
  children: React.ReactElement;
}

interface IMessage {
  id?: string;
  userId: string;
  timestamp: string;
  message: string;
}

const ChatContext = createContext({} as ChatContextProps);

const ChatContextProvider = ({ children }: chatProviderProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { emit, subscribe, unsubscribe } = useSocketContext();
  const { userData, isLoggedIn } = useLoginContext();

  const getAllMessages = useCallback((data: IMessage[]) => {
    setMessages(data);
  }, []);

  const sendMessage = useCallback((message: string, callback: VoidFunction) => {
    if (message.length) {
      const data: IMessage = {
        message,
        userId: userData.userId,
        timestamp: new Date().toLocaleString("ru"),
      };
      emit(SocketEvent.sendMessage, data);
      callback();
    }
  }, []);

  const updateMessages = useCallback((messageData: IMessage) => {
    setMessages((prev) => [...prev, messageData]);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      subscribe(SocketEvent.getMessages, (data: IMessage[]) => {
        getAllMessages(data);
      });
    }

    subscribe(SocketEvent.recieveMessage, updateMessages);

    return () => {
      unsubscribe(SocketEvent.recieveMessage);
      unsubscribe(SocketEvent.getMessages);
    };
  }, [subscribe, unsubscribe]);

  return (
    <ChatContext.Provider value={{ messages, sendMessage, getAllMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

const useContextChat = () => useContext(ChatContext);
export { useContextChat, ChatContextProvider };
