import { useLoginContext } from "@/contexts/loginContext";
import { cnb } from "cnbuilder";
import { formatDate } from "@/helpers/date/formatDate";
import styles from "./ChatMessage.module.scss";

interface ChatMessageProps {
  messageData: {
    userId: string;
    message: string;
    timestamp: string;
  };
}

export const ChatMessage = ({ messageData }: ChatMessageProps) => {
  const { userData } = useLoginContext();
  const { userId, message, timestamp } = messageData;

  return (
    <div className={styles.parentContainer}>
      <div
        className={cnb(styles.wrapper, {
          [styles.wrapperRight]: userData.userId === userId,
        })}
      >
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          <p className={styles.time}>{formatDate(timestamp)}</p>
        </div>
      </div>
    </div>
  );
};
