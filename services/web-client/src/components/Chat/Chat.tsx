import { useContextMessage } from "@/contexts/messageProvider";

import { CloseChatIcon } from "../icons/CloseChat";

import { ChatFooter } from "../ChatFooter.tsx/ChatFooter";
import styles from "./Chat.module.scss";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { formatDate } from "@/helpers";

export const Chat = () => {
  const { messages } = useContextMessage();

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <CloseChatIcon
          handleClick={() => {
            console.log();
          }}
        />
        <h2>Chat</h2>
      </div>
      <div className={styles.chatWrapper}>
        <div className={styles.chatBody}>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              socketId={msg.socketId}
              message={msg.message}
              time={formatDate(msg.timestamp)}
            />
          ))}
        </div>
        <ChatFooter />
      </div>
    </div>
  );
};
