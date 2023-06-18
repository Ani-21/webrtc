import { useVideoChatContext } from '@/contexts/videoChatContext';
import { ParticipantRenderer } from '../ParticipantRenderer/ParticipantRenderer';

import styles from './ParticipantsContainer.module.scss';
import { memo } from 'react';
import { AudioTrack } from './AudioTrack';

export const ParticipantsContainer = memo(() => {
  const { users } = useVideoChatContext();

  const isTheOnly = users.length === 1;

  return (
    <div className={styles.container}>
      {users?.map((participant) => (
        <ParticipantRenderer key={participant.identity} participant={participant} isTheOnly={isTheOnly} />
      ))}
      <AudioTrack />
    </div>
  );
});
