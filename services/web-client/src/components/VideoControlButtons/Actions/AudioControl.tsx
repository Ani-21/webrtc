import { MicroIcon } from '@/components/icons/Micro';
import { useTranslation } from 'react-i18next';
import { VideoControlButton } from '../VideoControlButton';
import { useTrackContext } from '@/contexts/localTrackContext';

export const AudioControl = () => {
  const { t } = useTranslation('translation');
  const { audioEnabled, handleAudioEnabled } = useTrackContext();

  return (
    <VideoControlButton
      handleClick={handleAudioEnabled}
      tooltip={audioEnabled ? `${t('microphoneOff')}` : `${t('microphoneOn')}`}
      color="light"
    >
      <MicroIcon isActive={audioEnabled} width={34} height={34} />
    </VideoControlButton>
  );
};
