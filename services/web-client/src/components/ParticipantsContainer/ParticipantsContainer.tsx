import { useVideoChatContext } from '@/contexts/videoChatContext';
import { ParticipantRenderer } from '../ParticipantRenderer/ParticipantRenderer';
import { AudioRenderer } from '@livekit/react-components';

import styles from './ParticipantsContainer.module.scss';
import { memo } from 'react';

export const ParticipantsContainer = memo(() => {
  const { participants, audioTracks } = useVideoChatContext();

  console.log('PARTICIPANTS', participants);

  const isTheOnly = participants.length === 1;

  return (
    <div className={styles.container}>
      {participants?.map((participant) => (
        <ParticipantRenderer key={participant.identity} participant={participant} isTheOnly={isTheOnly} />
      ))}
      {audioTracks.map((audioTrack) => (
        <AudioRenderer key={audioTrack.sid} isLocal={false} track={audioTrack} />
      ))}
    </div>
  );
});
