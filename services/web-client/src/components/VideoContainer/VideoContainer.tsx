import { CustomPaper } from "../custom";
import { Cat3Icon } from "../icons/Cat3";
import styles from "./VideoContainer.module.scss";

export const VideoContainer = () => {
  const empty = Array(4).fill("");

  return (
      <div className={styles.container}>
        {empty.map((_, i) => (
          <CustomPaper key={i} className={styles.video}>
            <Cat3Icon/>
          </CustomPaper>
        ))}
      </div>
  );
};
