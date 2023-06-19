import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton, CustomInput, CustomPaper } from '@/components/custom';
import { useLoginContext } from '@/contexts/loginContext';
import { FirstCatIcon } from '@/components/icons/FirstCat';
import { CustomInputTypes } from '@/const/customInputTypes';

import styles from './Login.module.scss';

export const Login = () => {
  const [name, setName] = useState('');
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  const { isValidName, joinRoom, isLoggedIn } = useLoginContext();

  console.log('LOGIN COMPONENT:', isLoggedIn);

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
      navigate('/room');
      console.log('CLICK INSIDE ONENTER ROOM:', isLoggedIn);
    },
    [name, joinRoom, navigate]
  );

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        onEnterRoom(e);
      }
    },
    [onEnterRoom]
  );

  return (
    <CustomPaper className={styles.container}>
      <form className={styles.content} onSubmit={onEnterRoom}>
        <FirstCatIcon />
        <h1 className={styles.title}>{t('input')}</h1>
        <div className={styles.inputContainer}>
          <CustomInput
            className={warningStyle}
            myheight="big"
            isfocused="true"
            type={CustomInputTypes.text}
            placeholder="Name"
            disableUnderline
            autoComplete="off"
            value={name}
            name="name"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
