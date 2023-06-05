import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton, CustomInput, CustomPaper } from "@/components/custom";
import { LoginFull } from "./LoginFull";
import { useLoginContext } from "@/contexts/loginContext";
import { Cat1Icon } from "@/components/icons/Cat1";
import styles from "./Login.module.scss";
import { TranslationNamespaces } from "@/const/translationNamespaces";
import { CustomInputTypes } from "@/const/customInputTypes";

export const Login = () => {
  const [name, setName] = useState("");
  const { t } = useTranslation("translation");

  const { isValidName, isFull, joinRoom } = useLoginContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const warningStyle = useMemo(() => {
    return !isValidName ? styles.inputWarning : styles.input;
  }, [isValidName]);

  if (isFull) {
    return <LoginFull />;
  }

  return (
    <CustomPaper className={styles.container}>
      <form className={styles.content}>
        <Cat1Icon />
        <h1 className={styles.title}>Enter your name</h1>
        <div className={styles.inputContainer}>
          <CustomInput
            className={warningStyle}
            type={CustomInputTypes.text}
            placeholder='Name'
            disableUnderline
            autoComplete='off'
            value={name}
            name='name'
            onChange={handleChange}
          />
          {!isValidName && <span>* Please enter your name</span>}
        </div>
        <CustomButton
          className={styles.button}
          onClick={() => joinRoom(name)}
          variant='contained'
        >
          {t(TranslationNamespaces.joinRoom)}
        </CustomButton>
      </form>
    </CustomPaper>
  );
};
