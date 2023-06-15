import { useVideoChatContext } from '@/contexts/videoChatContext';
import { ParticipantRenderer } from '../ParticipantRenderer/ParticipantRenderer';
import { AudioRenderer } from '@livekit/react-components';

import styles from './ParticipantsContainer.module.scss';

export const ParticipantsContainer = () => {
  const { participants, audioTracks } = useVideoChatContext();

  return (
    <div className={styles.container}>
      {participants?.map((participant) => (
        <ParticipantRenderer participant={participant} />
      ))}
      {audioTracks.map((audioTrack) => (
        <AudioRenderer isLocal={false} track={audioTrack} />
      ))}
    </div>
  );
};
