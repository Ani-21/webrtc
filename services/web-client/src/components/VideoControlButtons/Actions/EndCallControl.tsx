import { useTranslation } from 'react-i18next';
import { CallIcon } from '../../icons/Call';
import { VideoControlButton } from '../VideoControlButton';

export const EndCallControl = () => {
  const { t } = useTranslation('translation');

  return (
    <VideoControlButton tooltip={`${t('endCall')}`} color="danger">
      <CallIcon />
    </VideoControlButton>
  );
};
