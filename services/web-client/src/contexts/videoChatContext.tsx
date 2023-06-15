import { createContext, useCallback, useContext, useEffect } from 'react';
import { VideoPresets, Participant, RoomOptions, Room, AudioTrack } from 'livekit-client';
import { useRoom } from '@livekit/react-core';
import { useLoginContext } from './loginContext';
import { publicConfig } from '@/config/publicConfig';

interface IVideoChatContextProps {
  handleConnect: () => void;
  token: string;
  participants: Participant[];
  room: Room | undefined;
  audioTracks: AudioTrack[];
}

interface IProps {
  children: React.ReactElement;
}

const VideoChatContext = createContext({} as IVideoChatContextProps);

const VideoChatContextProvider = ({ children }: IProps) => {
  const { userData } = useLoginContext();

  const roomOptions: RoomOptions = {
    dynacast: true,
    videoCaptureDefaults: {
      resolution: VideoPresets.h720.resolution,
    },
    stopLocalTrackOnUnpublish: true,
    publishDefaults: {
      videoCodec: 'vp8',
    },
  };
  const { connect, room, participants, audioTracks } = useRoom(roomOptions);

  const token = userData.token;

  const handleConnect = useCallback(async () => {
    try {
      await connect(publicConfig.livekitUrl, token);
      await room?.localParticipant.enableCameraAndMicrophone();
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    handleConnect();
  }, []);

  return (
    <VideoChatContext.Provider value={{ handleConnect, token, participants, room, audioTracks }}>
      {children}
    </VideoChatContext.Provider>
  );
};

const useVideoChatContext = () => useContext(VideoChatContext);
export { VideoChatContextProvider, useVideoChatContext };
