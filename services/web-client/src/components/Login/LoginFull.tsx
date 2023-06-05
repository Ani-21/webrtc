import { CustomPaper } from "../custom/Paper";
import { CustomButton } from "../custom/Button";
import { ForthCatIcon } from "../icons/ForthCat";
import { useTranslation } from "react-i18next";
import styles from "./Login.module.scss";

export const LoginFull = () => {
  const { t } = useTranslation();

  return (
    <CustomPaper className={styles.container}>
      <form className={styles.content}>
        <ForthCatIcon />
        <h1 className={styles.title}>{t("roomIsFull")}</h1>
        <CustomButton className={styles.button} variant="contained">
          {t("back")}
        </CustomButton>
      </form>
    </CustomPaper>
  );
};
