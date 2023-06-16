import { useEffect } from 'react';
import { useChatContext } from '@/contexts/chatProvider';
import { useLoginContext } from '@/contexts/loginContext';
import { useVideoChatContext } from '@/contexts/videoChatContext';
import { Chat } from '../Chat/Chat';
import { VideoPage } from '../VideoPage/VideoPage';
import { NoLogin } from '../Login/NoLogin';
import { LoginFull } from '../Login/LoginFull';

import styles from './Room.module.scss';

export const RoomPage = () => {
  const { openChat } = useChatContext();
  const { handleConnect } = useVideoChatContext();
  const { userData, isFull, isLoggedIn } = useLoginContext();

  console.log(isLoggedIn);

  useEffect(() => {
    if (userData.token) {
      handleConnect();
    }
  }, [userData.token]);

  if (!userData.token && !isFull) {
    return <NoLogin />;
  }

  if (isFull) {
    return <LoginFull />;
  }

  return (
    <div className={styles.roomContainer}>
      <VideoPage />
      {openChat && <Chat />}
    </div>
  );
};
