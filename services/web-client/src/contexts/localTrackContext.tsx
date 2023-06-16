import { useState, createContext, useContext, useCallback } from 'react';
import { useVideoChatContext } from './videoChatContext';

interface ITrackContext {
  audioEnabled: boolean;
  videoEnabled: boolean;
  handleAudioEnabled: () => void;
  handleVideoEnabled: () => void;
}

const LocalTrackContext = createContext({} as ITrackContext);

const LocalTracksContextProvider = ({ children }: { children: React.ReactElement }) => {
  const { room } = useVideoChatContext();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const handleAudioEnabled = useCallback(async () => {
    setAudioEnabled((prev) => !prev);
  }, [audioEnabled]);

  const handleVideoEnabled = useCallback(() => {
    setVideoEnabled((prev) => !prev);
  }, [videoEnabled]);

  room?.localParticipant.setMicrophoneEnabled(audioEnabled);
  room?.localParticipant.setCameraEnabled(videoEnabled);

  return (
    <LocalTrackContext.Provider
      value={{
        audioEnabled,
        videoEnabled,
        handleAudioEnabled,
        handleVideoEnabled,
      }}
    >
      {children}
    </LocalTrackContext.Provider>
  );
};

const useTrackContext = () => useContext(LocalTrackContext);
export { LocalTracksContextProvider, useTrackContext };
