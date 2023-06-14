import { useLoginContext } from '@/contexts/loginContext';
import { cnb } from 'cnbuilder';
import { formatDate } from '@/helpers/date/formatDate';
import styles from './ChatMessage.module.scss';
import { IMessage } from '../models/IMessage';
import { useTranslation } from 'react-i18next';

interface ChatMessageProps {
  messageData: IMessage;
}

export const ChatMessage = ({ messageData }: ChatMessageProps) => {
  const { userData } = useLoginContext();
  const { name, userId, message, timestamp } = messageData;
  const { t } = useTranslation('translation');
  const isLocalUser = userData.userId === userId;

  return (
    <div className={styles.parentContainer}>
      <div
        className={cnb(styles.wrapper, {
          [styles.wrapperRight]: isLocalUser,
        })}
      >
        <div
          className={cnb(styles.username, {
            [styles.usernameRight]: isLocalUser,
          })}
        >
          {isLocalUser ? `${t('you')}` : name}
        </div>
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          <p className={styles.time}>{formatDate(timestamp)}</p>
        </div>
      </div>
    </div>
  );
};
