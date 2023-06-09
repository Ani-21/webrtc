import { useLoginContext } from "@/contexts/loginContext";
import { useOpenChatContext } from "@/contexts/openChatContext";
import { ButtonsMenu } from "../ButtonsMenu/ButtonsMenu";
import { Chat } from "../Chat/Chat";
import { Login } from "../Login/Login";
import { VideoContainer } from "../VideoContainer/VideoContainer";
import styles from "./Room.module.scss";

export const Room = () => {
  const { isLoggedIn } = useLoginContext();
  const { openChat } = useOpenChatContext();

  if (isLoggedIn) {
    return (
      <div className={styles.roomContainer}>
        <div className={styles.sectionContainer}>
          <VideoContainer />
          <ButtonsMenu />
        </div>
        {openChat && <Chat />}
      </div>
    );
  } else {
    return <Login />;
  }
};
