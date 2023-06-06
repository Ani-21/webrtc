import { CustomPaper } from "../custom/Paper";
import { CustomButton } from "../custom/Button";
import { FourthCatIcon } from "../icons/FourthCat";
import { useTranslation } from "react-i18next";
import styles from "./Login.module.scss";

export const LoginFull = () => {
  const { t } = useTranslation();

  return (
    <CustomPaper className={styles.container}>
      <form className={styles.content}>
        <FourthCatIcon />
        <h1 className={styles.title}>{t("roomIsFull")}</h1>
        <CustomButton className={styles.button} variant='contained'>
          {t("back")}
        </CustomButton>
      </form>
    </CustomPaper>
  );
};
