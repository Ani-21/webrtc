import { useCallback, useState } from 'react';
import { SendIcon } from '../icons/Send';
import { CustomInput } from '../custom';
import { useChatContext } from '@/contexts/chatProvider';
import { IconButton } from '../IconButton/IconButton';
import { useTranslation } from 'react-i18next';

import styles from './ChatFooter.module.scss';

export const ChatFooter = () => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation('translation');
  const { sendMessage } = useChatContext();

  const clearInput = () => setMessage('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        sendMessage(message, clearInput);
      }
    },
    [message]
  );

  return (
    <div className={styles.inputContainer}>
      <CustomInput
        myheight="small"
        myColor="dark"
        disableUnderline
        endAdornment={
          <IconButton handleClick={() => sendMessage(message, clearInput)}>
            <SendIcon />
          </IconButton>
        }
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={message}
        name="message"
        autoComplete="off"
        placeholder={`${t('message')}`}
      />
    </div>
  );
};
