import { useVideoChatContext } from '@/contexts/videoChatContext';
import { ParticipantRenderer } from '../ParticipantRenderer/ParticipantRenderer';
import { AudioRenderer } from '@livekit/react-components';

import styles from './ParticipantsContainer.module.scss';

export const ParticipantsContainer = () => {
  const { users, audioTracks } = useVideoChatContext();

  const isTheOnly = users.length === 1;

  return (
    <div className={styles.container}>
      {users?.map((participant) => (
        <ParticipantRenderer key={participant.identity} participant={participant} isTheOnly={isTheOnly} />
      ))}
      {audioTracks.map((audioTrack) => (
        <AudioRenderer key={audioTrack.sid} isLocal={false} track={audioTrack} />
      ))}
    </div>
  );
};
