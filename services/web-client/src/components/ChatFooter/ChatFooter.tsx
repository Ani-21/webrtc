import { useSocketContext } from "@/contexts/socketContext";
import { useState } from "react";
import { SendIcon } from "../icons/Send";
import { CustomInput } from "../custom";
import { SocketEvent } from "@/const/socketEvents";
import styles from "./ChatFooter.module.scss";
import { useLoginContext } from "@/contexts/loginContext";

export const ChatFooter = () => {
  const [message, setMessage] = useState("");
  const { emit } = useSocketContext();
  const { userData } = useLoginContext();

  const data = {
    message,
    userId: userData.userId,
    timestamp: new Date().toLocaleString("ru"),
  };

  const sendMessage = () => {
    if (message.length) {
      emit(SocketEvent.sendMessage, data);
      setMessage("");
    } else {
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatForm}>
      <form onKeyDown={handleKeyPress}>
        <CustomInput
          myHeight="small"
          disableUnderline
          endAdornment={<SendIcon handleClick={sendMessage} />}
          onChange={handleChange}
          value={message}
          name="message"
          autoComplete="off"
        />
      </form>
    </div>
  );
};
