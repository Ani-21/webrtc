import { useEffect } from 'react';
import { useChatContext } from '@/contexts/chatProvider';
import { useLoginContext } from '@/contexts/loginContext';
import { useVideoChatContext } from '@/contexts/videoChatContext';
import { Chat } from '../Chat/Chat';
import styles from './Room.module.scss';
import { VideoPage } from '../VideoPage/VideoPage';

export const RoomPage = () => {
  const { openChat } = useChatContext();
  const { handleConnect } = useVideoChatContext();
  const { userData } = useLoginContext();

  useEffect(() => {
    if (userData.token) {
      handleConnect();
    }
  }, [userData.token]);

  return (
    <div className={styles.roomContainer}>
      <VideoPage />
      {openChat && <Chat />}
    </div>
  );
};
