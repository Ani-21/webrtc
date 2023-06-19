import { useNavigate } from 'react-router-dom';
import { CustomPaper } from '../custom/Paper';
import { CustomButton } from '../custom/Button';
import { FourthCatIcon } from '../icons/FourthCat';
import { useTranslation } from 'react-i18next';

import styles from './Login.module.scss';

export const LoginFull = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLeave = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <CustomPaper className={styles.container}>
      <form className={styles.content}>
        <FourthCatIcon />
        <h1 className={styles.title}>{t('roomIsFull')}</h1>
        <CustomButton className={styles.buttonFull} variant="contained" onClick={onLeave}>
          {t('back')}
        </CustomButton>
      </form>
    </CustomPaper>
  );
};
