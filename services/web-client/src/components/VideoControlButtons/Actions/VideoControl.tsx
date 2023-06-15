import { CameraIcon } from '@/components/icons/Camera';
import { useTranslation } from 'react-i18next';
import { VideoControlButton } from '../VideoControlButton';
import { useTrackContext } from '@/contexts/trackContext';

export const VideoControl = () => {
  const { t } = useTranslation('translation');
  const { videoEnabled, handleVideoEnabled } = useTrackContext();

  return (
    <VideoControlButton
      handleClick={handleVideoEnabled}
      tooltip={videoEnabled ? `${t('videoOff')}` : `${t('videoOn')}`}
      color="light"
    >
      <CameraIcon isActive={videoEnabled} />
    </VideoControlButton>
  );
};
