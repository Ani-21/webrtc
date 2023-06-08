import { CameraIcon } from "../icons/Camera";
import { ChatIcon } from "../icons/Chat";
import { ChatOpenedIcon } from "../icons/ChatOpened";
import { EndCallIcon } from "../icons/EndCall";
import { MicroIcon } from "../icons/Micro";

import styles from "./ButtonsMenu.module.scss";

type ButtonsMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ButtonsMenu = ({ open, setOpen }: ButtonsMenuProps) => {
  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);
  return (
    <div className={styles.buttonsContainer}>
      <div className={styles.mainButtons}>
        <MicroIcon />
        <CameraIcon />
        <EndCallIcon />
      </div>
      {open ? (
        <ChatOpenedIcon handleClick={handleClose} />
      ) : (
        <ChatIcon handleClick={handleOpen} />
      )}
    </div>
  );
};
