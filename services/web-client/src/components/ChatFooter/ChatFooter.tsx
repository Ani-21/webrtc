import { useCallback, useState } from "react";
import { SendIcon } from "../icons/Send";
import { CustomInput } from "../custom";
import styles from "./ChatFooter.module.scss";
import { useContextChat } from "@/contexts/chatProvider";
import { IconButton } from "../IconButton/IconButton";

export const ChatFooter = () => {
  const [message, setMessage] = useState("");

  const { sendMessage } = useContextChat();

  const clearInput = () => setMessage("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage(message, clearInput);
      }
    },
    []
  );

  return (
    <div className={styles.chatForm}>
      <form onKeyDown={handleKeyPress}>
        <CustomInput
          myHeight="small"
          disableUnderline
          endAdornment={
            <IconButton handleClick={() => sendMessage(message, clearInput)}>
              <SendIcon />
            </IconButton>
          }
          onChange={handleChange}
          value={message}
          name="message"
          autoComplete="off"
        />
      </form>
    </div>
  );
};