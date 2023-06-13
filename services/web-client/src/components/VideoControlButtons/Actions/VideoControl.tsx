import { CameraIcon } from '@/components/icons/Camera';
import { useTranslation } from 'react-i18next';
import { VideoControlButton } from '../VideoControlButton';

export const VideoControl = () => {
  const isVideoActive = true;
  const { t } = useTranslation('translation');

  return (
    <VideoControlButton tooltip={isVideoActive ? `${t('videoOff')}` : `${t('videoOn')}`} color="light">
      <CameraIcon isActive={isVideoActive} />
    </VideoControlButton>
  );
};
