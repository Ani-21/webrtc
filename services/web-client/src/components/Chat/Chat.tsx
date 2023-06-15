import { useChatContext } from '@/contexts/chatProvider';
import { useChatScroll } from '@/hooks/useChatScroll';
import { CloseChatIcon } from '../icons/CloseChat';
import { ChatFooter } from '../ChatFooter/ChatFooter';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { useTranslation } from 'react-i18next';
import { IconButton } from '../IconButton/IconButton';
import { IMessage } from '../models/IMessage';

import styles from './Chat.module.scss';

export const Chat = () => {
  const { messages, setOpenChat } = useChatContext();
  const { t } = useTranslation('translation');
  const ref = useChatScroll(messages);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <IconButton handleClick={() => setOpenChat(false)}>
          <CloseChatIcon />
        </IconButton>
        <h2>{t('chat')}</h2>
      </div>
      <div className={styles.chatWrapper} ref={ref}>
        {messages?.map((msg: IMessage) => (
          <ChatMessage key={msg.id} messageData={msg} />
        ))}
      </div>
      <ChatFooter />
    </div>
  );
};
