import { useOpenChatContext } from '@/contexts/openChatContext';
import { IconButton } from '../IconButton/IconButton';
import { CameraIcon } from '../icons/Camera';
import { ChatIcon } from '../icons/Chat';
import { ChatOpenedIcon } from '../icons/ChatOpened';
import { EndCallIcon } from '../icons/EndCall';
import { MicroIcon } from '../icons/Micro';

import styles from './ButtonsMenu.module.scss';

export const ButtonsMenu = () => {
  const { openChat, setOpenChat } = useOpenChatContext();
  const handleClose = () => setOpenChat(false);

  const handleOpen = () => setOpenChat(true);

  return (
    <div className={styles.buttonsContainer}>
      <div className={styles.mainButtons}>
        <MicroIcon />
        <CameraIcon />
        <EndCallIcon />
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
