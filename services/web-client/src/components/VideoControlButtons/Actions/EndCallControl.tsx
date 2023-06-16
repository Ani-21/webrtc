import { useLoginContext } from '@/contexts/loginContext';
import { useTranslation } from 'react-i18next';
import { CallIcon } from '../../icons/Call';
import { VideoControlButton } from '../VideoControlButton';
import { useVideoChatContext } from '@/contexts/videoChatContext';
import { useNavigate } from 'react-router-dom';

export const EndCallControl = () => {
  const { t } = useTranslation('translation');
  const { leaveRoom, setIsLoggedIn } = useLoginContext();
  const { room } = useVideoChatContext();
  const navigate = useNavigate();

  const onLeave = () => {
    leaveRoom();
    setIsLoggedIn(false);
    navigate('/');
    room?.disconnect();
  };

  return (
    <VideoControlButton handleClick={onLeave} tooltip={`${t('endCall')}`} color="danger">
      <CallIcon />
    </VideoControlButton>
  );
};
