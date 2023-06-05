import { CustomPaper } from "../custom";
import styles from "./VideoContainer.module.scss";

import cat_3 from "@/assets/cat_3.svg";

export const VideoContainer = () => {
  const empty = Array(4).fill("");

  return (
    <>
      <div className={styles.container}>
        {empty.map((_, i) => (
          <CustomPaper key={i} className={styles.video}>
            <img src={cat_3} alt="cat" />
          </CustomPaper>
        ))}
      </div>
    </>
  );
};
