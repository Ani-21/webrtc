import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton, CustomInput, CustomPaper } from "@/components/custom";
import { useLoginContext } from "@/contexts/loginContext";
import { FirstCatIcon } from "@/components/icons/FirstCat";
import { CustomInputTypes } from "@/const/customInputTypes";
import { LoginFull } from "./LoginFull";
import styles from "./Login.module.scss";

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
        <h1 className={styles.title}>{t("input")}</h1>
        <div className={styles.inputContainer}>
          <CustomInput
            className={warningStyle}
            myHeight="big"
            isFocused="true"
            type={CustomInputTypes.text}
            placeholder="Name"
            disableUnderline
            autoComplete="off"
            value={name}
            name="name"
            onChange={handleChange}
          />
          {!isValidName && <span>* {t("repeat")}</span>}
        </div>
        <CustomButton
          className={styles.button}
          onClick={() => joinRoom(name)}
          variant="contained"
        >
          {t("joinRoom")}
        </CustomButton>
      </form>
    </CustomPaper>
  );
};
