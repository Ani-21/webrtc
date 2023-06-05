import { CustomPaper } from "../custom/Paper";
import { CustomButton } from "../custom/Button";
import { Cat4Icon } from "../icons/Cat4";
import styles from "./Login.module.scss";
import { useTranslation } from "react-i18next";
import { TranslationNamespaces } from "@/const/translationNamespaces";

export const LoginFull = () => {
  const { t } = useTranslation();

  return (
    <CustomPaper className={styles.container}>
      <form className={styles.content}>
        <Cat4Icon />
        <h1 className={styles.title}>{t(TranslationNamespaces.roomIsFull)}</h1>
        <CustomButton className={styles.button} variant='contained'>
          {t(TranslationNamespaces.back)}
        </CustomButton>
      </form>
    </CustomPaper>
  );
};
