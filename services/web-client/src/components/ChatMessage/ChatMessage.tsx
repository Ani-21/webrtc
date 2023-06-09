import { useLoginContext } from "@/contexts/loginContext";
import { cnb } from "cnbuilder";
import { formatDate } from "@/helpers/date/formatDate";
import styles from "./ChatMessage.module.scss";
import { IMessage } from "../models/IMessage";

interface ChatMessageProps {
  messageData: IMessage
}

export const ChatMessage = ({ messageData }: ChatMessageProps) => {
  const { userData } = useLoginContext();
  const { name, userId, message, timestamp } = messageData;

  return (
    <div className={styles.parentContainer}>
      <div
        className={cnb(styles.wrapper, {
          [styles.wrapperRight]: userData.userId === userId,
        })}
      >
        <div className={cnb(styles.username, {
          [styles.usernameRight]: userData.userId === userId,
        })}>{name}</div>
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          <p className={styles.time}>{formatDate(timestamp)}</p>
        </div>
      </div>
    </div>
  );
};
