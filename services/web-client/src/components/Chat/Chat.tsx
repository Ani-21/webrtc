import { useContextChat } from "@/contexts/chatProvider";

import { CloseChatIcon } from "../icons/CloseChat";

import { ChatFooter } from "../ChatFooter/ChatFooter";
import styles from "./Chat.module.scss";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { useTranslation } from "react-i18next";
import { useOpenChatContext } from "@/contexts/openChatContext";
import { IconButton } from "../IconButton/IconButton";
import { IMessage } from "../models/IMessage";


export const Chat = () => {
  const { messages } = useContextChat();
  const { t } = useTranslation("translation");
  const { setOpenChat } = useOpenChatContext();

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <IconButton handleClick={() => setOpenChat(false)}>
          <CloseChatIcon />
        </IconButton>
        <h2>{t("chat")}</h2>
      </div>
      <div className={styles.chatWrapper}>
        {messages?.map((msg: IMessage) => (
          <ChatMessage key={msg.id} messageData={msg} />
        ))}
      </div>
      <ChatFooter />
    </div>
  );
};
