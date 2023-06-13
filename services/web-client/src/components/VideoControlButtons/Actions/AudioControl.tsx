import { MicroIcon } from '@/components/icons/Micro';
import { useTranslation } from 'react-i18next';
import { VideoControlButton } from '../VideoControlButton';

export const AudioControl = () => {
  const { t } = useTranslation('translation');
  const isMicActive = true;

  return (
    <VideoControlButton tooltip={isMicActive ? `${t('microphoneOff')}` : `${t('microphoneOn')}`} color="light">
      <MicroIcon isActive={isMicActive} />
    </VideoControlButton>
  );
};
