import { CustomButton, CustomInput, CustomPaper } from "@/components/custom";
import { LoginFull } from "./LoginFull";
import { useLoginContext } from "@/contexts/loginContext";

import styles from "./Login.module.scss";
import cat_1 from "@/assets/cat_1.svg";

export const Login = () => {
  const { name, isFull, handleChange, joinRoom } = useLoginContext();

  if (isFull) return <LoginFull />;

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
          autoComplete="off"
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
