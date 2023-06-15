import { useTranslation } from 'react-i18next';
import { Participant } from 'livekit-client';
import { VideoRenderer, useParticipant } from '@livekit/react-components';
import { MicroIcon } from '../icons/Micro';
import { MicroSmIcon } from '../icons/MicroSm';

import styles from './ParticipantRenderer.module.scss';

interface IProps {
  participant: Participant;
}

export const ParticipantRenderer = ({ participant }: IProps) => {
  const { cameraPublication } = useParticipant(participant);
  const { t } = useTranslation('translation');

  if (cameraPublication?.isMuted) {
    return (
      <div className={styles.containerMuted}>
        <div className={styles.participantMuted}>
          <MicroIcon width={34} height={34} isActive={participant.isMicrophoneEnabled} />
          <span>{participant.isLocal ? `${participant.name} (${t('you')})` : participant.name}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {cameraPublication?.isSubscribed && cameraPublication?.track && !cameraPublication?.isMuted && (
        <VideoRenderer className={styles.container} track={cameraPublication?.track} isLocal={participant.isLocal} />
      )}
      <div className={styles.participant}>
        <MicroSmIcon isActive={participant.isMicrophoneEnabled} />
        <span>{participant.isLocal ? `${participant.name}(you)` : participant.name}</span>
      </div>
    </div>
  );
};
