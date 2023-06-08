import styles from "./IconButton.module.scss";

interface IconButtonProps {
  handleClick: () => void;
  children: React.ReactElement;
}

export const IconButton = ({ handleClick, children }: IconButtonProps) => {
  return (
    <button className={styles.customButton} onClick={handleClick}>
      {children}
    </button>
  );
};
