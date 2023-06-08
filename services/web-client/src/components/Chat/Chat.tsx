import { useContextMessage } from "@/contexts/messageProvider";

import { CloseChatIcon } from "../icons/CloseChat";

import { ChatFooter } from "../ChatFooter/ChatFooter";
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
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            userId={msg.userId}
            message={msg.message}
            time={formatDate(msg.timestamp)}
          />
        ))}
      </div>
      <ChatFooter />
    </div>
  );
};
