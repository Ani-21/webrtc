import { useOpenChatContext } from '@/contexts/openChatContext';
import { useRoomContext } from '@/contexts/roomContext';
import { useEffect } from 'react';
import { ButtonsMenu } from '../ButtonsMenu/ButtonsMenu';
import { Chat } from '../Chat/Chat';
import { VideoContainer } from '../VideoContainer/VideoContainer';
import styles from './Room.module.scss';

export const RoomPage = () => {
  const { handleConnect } = useRoomContext();
  const { openChat } = useOpenChatContext();

  useEffect(() => {
    handleConnect();

    return () => handleConnect();
  }, [handleConnect]);

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
