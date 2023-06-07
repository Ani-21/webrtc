import { useLoginContext } from "@/contexts/loginContext";
import { MessageContextProvider } from "@/contexts/messageProvider";
import { Chat } from "../Chat/Chat";
import { Login } from "../Login/Login";
import { VideoContainer } from "../VideoContainer/VideoContainer";
import styles from "./Room.module.scss";

export const Room = () => {
  const { isLoggedIn } = useLoginContext();

  if (isLoggedIn) {
    return (
      <div className={styles.roomContainer}>
        <VideoContainer />
        <MessageContextProvider>
          <Chat />
        </MessageContextProvider>
      </div>
    );
  } else {
    return <Login />;
  }
};
