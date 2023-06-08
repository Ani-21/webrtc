import { useLoginContext } from "@/contexts/loginContext";
import { MessageContextProvider } from "@/contexts/messageProvider";
import { useState } from "react";
import { ButtonsMenu } from "../ButtonsMenu/ButtonsMenu";
import { Chat } from "../Chat/Chat";
import { Login } from "../Login/Login";
import { VideoContainer } from "../VideoContainer/VideoContainer";
import styles from "./Room.module.scss";

export const Room = () => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useLoginContext();

  if (isLoggedIn) {
    return (
      <div className={styles.roomContainer}>
        <div className={styles.sectionContainer}>
          <VideoContainer />
          <ButtonsMenu setOpen={setOpen} open={open} />
        </div>
        {open && (
          <MessageContextProvider>
            <Chat />
          </MessageContextProvider>
        )}
      </div>
    );
  } else {
    return <Login />;
  }
};
