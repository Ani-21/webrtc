import { useLoginContext } from "@/contexts/loginContext";
import { useMemo } from "react";
import styles from "./ChatMessage.module.scss";

type ChatMessageProps = {
  userId: string;
  message: string;
  time: string;
};

export const ChatMessage = ({ userId, message, time }: ChatMessageProps) => {
  const { userData } = useLoginContext();

  const style = useMemo(() => {
    if (userData.userId === userId) {
      return `${styles.wrapper} ${styles.wrapperRight}`;
    } else {
      return styles.wrapper;
    }
  }, []);

  return (
    <div className={styles.parentContainer}>
      <div className={style}>
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          <p className={styles.time}>{time}</p>
        </div>
      </div>
    </div>
  );
};
