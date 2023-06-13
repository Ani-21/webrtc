import { createContext, useCallback, useContext } from 'react';
import { Room, VideoPresets } from 'livekit-client';
import { useLoginContext } from './loginContext';

interface IRoomContextProps {
  handleConnect: () => void;
  token: string;
}

interface IProps {
  children: React.ReactElement;
}

const RoomContext = createContext({} as IRoomContextProps);

const RoomContextProvider = ({ children }: IProps) => {
  const { userData } = useLoginContext();
  const token = userData.token;

  const livekitWssUrl = import.meta.env.VITE_LIVEKIT_WSS;

  const handleConnect = useCallback(async () => {
    const room = new Room({
      dynacast: true,
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
      stopLocalTrackOnUnpublish: true,
      publishDefaults: {
        videoCodec: 'vp8',
      },
    });

    await room.connect(livekitWssUrl, token);

    const localUser = room.localParticipant;
    await localUser.setCameraEnabled(true);
    await localUser.setMicrophoneEnabled(true);
  }, []);

  return <RoomContext.Provider value={{ handleConnect, token }}>{children}</RoomContext.Provider>;
};

const useRoomContext = () => useContext(RoomContext);
export { RoomContextProvider, useRoomContext };
