import { useOpenChatContext } from '@/contexts/openChatContext';
import { IconButton } from '../IconButton/IconButton';
import { ChatIcon } from '../icons/Chat';
import { ChatOpenedIcon } from '../icons/ChatOpened';
import { AudioControl } from '../VideoControlButtons/Actions/AudioControl';
import { VideoControl } from '../VideoControlButtons/Actions/VideoControl';
import { EndCallControl } from '../VideoControlButtons/Actions/EndCallControl';

import styles from './ButtonsMenu.module.scss';

export const ButtonsMenu = () => {
  const { openChat, setOpenChat } = useOpenChatContext();
  const handleClose = () => setOpenChat(false);

  const handleOpen = () => setOpenChat(true);

  return (
    <div className={styles.buttonsContainer}>
      <div className={styles.mainButtons}>
        <AudioControl />
        <VideoControl />
        <EndCallControl />
      </div>
      {openChat ? (
        <IconButton handleClick={handleClose}>
          <ChatOpenedIcon />
        </IconButton>
      ) : (
        <IconButton handleClick={handleOpen}>
          <ChatIcon />
        </IconButton>
      )}
    </div>
  );
};
