import { useLoginContext } from "@/contexts/loginContext";
import { useMemo } from "react";
import styles from "./ChatMessage.module.scss";

type ChatMessageProps = {
  socketId: string;
  message: string;
  time: string;
};

export const ChatMessage = ({ socketId, message, time }: ChatMessageProps) => {
  const { userData } = useLoginContext();

  const style = useMemo(() => {
    if (userData.userId === socketId) {
      return styles.container;
    } else {
      return `${styles.container} ${styles.containerRight}`;
    }
  }, []);

  return (
    <div className={style}>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        <p className={styles.time}>{time}</p>
      </div>
    </div>
  );
};
