import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton, CustomInput, CustomPaper } from "@/components/custom";
import { LoginFull } from "./LoginFull";
import { useLoginContext } from "@/contexts/loginContext";
import { FirstCatIcon } from "@/components/icons/FirstCat";
import styles from "./Login.module.scss";
import { en } from "@/locales/en";
import { CustomInputTypes } from "@/const/customInputTypes";

export const Login = () => {
  const [name, setName] = useState("");
  const { t } = useTranslation("translation");

  const { isValidName, isFull, joinRoom } = useLoginContext();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const warningStyle = useMemo(() => {
    return !isValidName ? styles.inputWarning : styles.input;
  }, [isValidName]);

  if (isFull) {
    return <LoginFull />;
  }

  return (
    <CustomPaper className={styles.container}>
      <form className={styles.content}>
        <FirstCatIcon />
        <h1 className={styles.title}>{t("loginPage.input")}</h1>
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
          {!isValidName && <span>* {t("loginPage.repeat")}</span>}
        </div>
        <CustomButton
          className={styles.button}
          onClick={() => joinRoom(name)}
          variant='contained'
        >
          {t("loginPage.joinRoom")}
        </CustomButton>
      </form>
    </CustomPaper>
  );
};
