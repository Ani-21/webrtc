import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Login.module.scss';
import { useLoginContext } from '@/contexts/loginContext';

export const NoLogin = () => {
  const { t } = useTranslation('translation');
  const { isLoggedIn } = useLoginContext();

  console.log('NOLOGIN COMPONENT:', isLoggedIn);
  return (
    <div className={styles.container}>
      <h1>{t('You are not logged in')}</h1>
      <h2>
        {t('go')}
        <NavLink to="/" className={styles.link}>
          {t('login')}
        </NavLink>
      </h2>
    </div>
  );
};
