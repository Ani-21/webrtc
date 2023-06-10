import { useOpenChatContext } from '@/contexts/openChatContext';
import { ButtonsMenu } from '../ButtonsMenu/ButtonsMenu';
import { Chat } from '../Chat/Chat';
import { VideoContainer } from '../VideoContainer/VideoContainer';
import styles from './Room.module.scss';

export const Room = () => {
  const { openChat } = useOpenChatContext();

  return (
    <div className={styles.roomContainer}>
      <div className={styles.sectionContainer}>
        <VideoContainer />
        <ButtonsMenu />
      </div>
      {openChat && <Chat />}
    </div>
  );
};
