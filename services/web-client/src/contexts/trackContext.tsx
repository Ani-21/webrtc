import { useState, createContext, useContext, useCallback } from 'react';
import { useVideoChatContext } from './videoChatContext';

interface ITrackContext {
  audioEnabled: boolean | undefined;
  videoEnabled: boolean | undefined;
  handleAudioEnabled: () => void;
  handleVideoEnabled: () => void;
}

const TrackContext = createContext({} as ITrackContext);

const TrackContextProvider = ({ children }: { children: React.ReactElement }) => {
  const { room } = useVideoChatContext();
  let isCameraEnabled = room?.localParticipant.isCameraEnabled;
  let isMicEnabled = room?.localParticipant.isMicrophoneEnabled;

  const [audioEnabled, setAudioEnabled] = useState(isMicEnabled);
  const [videoEnabled, setVideoEnabled] = useState(isCameraEnabled);

  const handleAudioEnabled = useCallback(() => {
    setAudioEnabled((prev) => !prev);
    room?.localParticipant.setMicrophoneEnabled(!audioEnabled);
  }, [audioEnabled]);

  const handleVideoEnabled = useCallback(() => {
    setVideoEnabled((prev) => !prev);
    room?.localParticipant.setCameraEnabled(!videoEnabled);
  }, [videoEnabled]);

  return (
    <TrackContext.Provider
      value={{
        audioEnabled,
        videoEnabled,
        handleAudioEnabled,
        handleVideoEnabled,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

const useTrackContext = () => useContext(TrackContext);
export { TrackContextProvider, useTrackContext };
