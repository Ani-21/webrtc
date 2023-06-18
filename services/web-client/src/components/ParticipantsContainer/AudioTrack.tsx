import { AudioRenderer } from '@livekit/react-components';
import { useVideoChatContext } from '@/contexts/videoChatContext';

export const AudioTrack = () => {
  const { audioTracks } = useVideoChatContext();

  return (
    <>
      {audioTracks.map((audioTrack) => (
        <AudioRenderer key={audioTrack.sid} isLocal={false} track={audioTrack} />
      ))}
    </>
  );
};
