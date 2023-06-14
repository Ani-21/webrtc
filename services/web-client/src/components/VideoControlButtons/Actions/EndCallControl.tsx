import { useLoginContext } from '@/contexts/loginContext';
import { useTranslation } from 'react-i18next';
import { CallIcon } from '../../icons/Call';
import { VideoControlButton } from '../VideoControlButton';

export const EndCallControl = () => {
  const { t } = useTranslation('translation');
  const { setIsLoggedIn } = useLoginContext();

  return (
    <VideoControlButton handleClick={() => setIsLoggedIn(false)} tooltip={`${t('endCall')}`} color="danger">
      <CallIcon />
    </VideoControlButton>
  );
};
