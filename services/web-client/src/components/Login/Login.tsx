import { CustomButton } from "../custom/Button";
import { CustomInput } from "../custom/Input";
import { CustomPaper } from "../custom/Paper";
import styles from "./Login.module.scss";

import cat_1 from "../../assets/cat_1.svg";
import {
  LoginContextProvider,
  useLoginContext,
} from "../../contexts/loginContext";

export const Login = () => {
  const { name, handleChange, joinRoom } = useLoginContext();
  console.log(name);

  return (
    <CustomPaper className={styles.container}>
      <form className={styles.content}>
        <img src={cat_1} />
        <h1 className={styles.title}>Enter your name</h1>
        <CustomInput
          className={styles.input}
          type="text"
          placeholder="Name"
          disableUnderline
          value={name}
          name="name"
          onChange={handleChange}
        />
        <CustomButton
          className={styles.button}
          onClick={joinRoom}
          variant="contained"
        >
          Join room
        </CustomButton>
      </form>
    </CustomPaper>
  );
};
