import { CustomPaper } from "../custom/Paper";
import styles from "./Login.module.scss";

import cat_4 from "../../assets/cat_4.svg";
import { CustomButton } from "../custom/Button";

export const LoginFull = () => (
  <CustomPaper className={styles.container}>
    <form className={styles.content}>
      <img src={cat_4} />
      <h1 className={styles.title}>Room is full</h1>
      <CustomButton className={styles.button} variant="contained">
        Back
      </CustomButton>
    </form>
  </CustomPaper>
);
