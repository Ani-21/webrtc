import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton, CustomInput, CustomPaper } from '@/components/custom';
import { useLoginContext } from '@/contexts/loginContext';
import { FirstCatIcon } from '@/components/icons/FirstCat';
import { CustomInputTypes } from '@/const/customInputTypes';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [name, setName] = useState('');
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  const { isValidName, isFull, joinRoom } = useLoginContext();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const warningStyle = useMemo(() => {
    return !isValidName ? styles.inputWarning : styles.input;
  }, [isValidName]);

  const onEnterRoom = useCallback(
    async (e: any) => {
      e.preventDefault();
      joinRoom(name);
      if (isFull) {
        navigate('/full');
      } else {
        navigate('/room');
      }
    },
    [name, isFull]
  );

  return (
    <CustomPaper className={styles.container}>
      <form className={styles.content} onSubmit={onEnterRoom}>
        <FirstCatIcon />
        <h1 className={styles.title}>{t('input')}</h1>
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
          {!isValidName && <span>* {t('repeat')}</span>}
        </div>
        <CustomButton className={styles.button} variant="contained" type="submit">
          {t('joinRoom')}
        </CustomButton>
      </form>
    </CustomPaper>
  );
};
