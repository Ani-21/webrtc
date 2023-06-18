import { useState, createContext, useContext, useCallback, useEffect } from 'react';
import { useLoginContext } from './loginContext';
import { useVideoChatContext } from './videoChatContext';

interface ITrackContext {
  audioEnabled: boolean;
  videoEnabled: boolean;
  handleAudioEnabled: () => void;
  handleVideoEnabled: () => void;
}

const LocalTrackContext = createContext({} as ITrackContext);

const LocalTracksContextProvider = ({ children }: { children: React.ReactElement }) => {
  const { userData } = useLoginContext();
  const { room } = useVideoChatContext();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const { token } = userData;

  const handleAudioEnabled = useCallback(async () => {
    setAudioEnabled((prev) => !prev);
  }, []);

  const handleVideoEnabled = useCallback(() => {
    setVideoEnabled((prev) => !prev);
  }, []);

  useEffect(() => {
    if (token) {
      room?.localParticipant.setMicrophoneEnabled(audioEnabled);
    }
  }, [token, audioEnabled, room?.localParticipant]);

  useEffect(() => {
    if (token) {
      room?.localParticipant.setCameraEnabled(videoEnabled);
    }
  }, [token, videoEnabled, room?.localParticipant]);

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
