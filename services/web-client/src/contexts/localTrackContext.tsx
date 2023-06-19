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

  const localUser = room?.localParticipant;

  const { token } = userData;

  const handleAudioEnabled = useCallback(async () => {
    setAudioEnabled((prev) => !prev);
  }, []);

  const handleVideoEnabled = useCallback(() => {
    setVideoEnabled((prev) => !prev);
  }, []);

  useEffect(() => {
    if (token) {
      localUser?.setMicrophoneEnabled(audioEnabled);
    }
  }, [token, audioEnabled, localUser]);

  useEffect(() => {
    if (token) {
      localUser?.setCameraEnabled(videoEnabled);
    }
  }, [token, videoEnabled, localUser]);

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
