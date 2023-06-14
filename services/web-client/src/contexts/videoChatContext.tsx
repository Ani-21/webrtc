import { createContext, useCallback, useContext } from 'react';
import {
  Room,
  RoomEvent,
  VideoPresets,
  LocalTrackPublication,
  RemoteParticipant,
  RemoteTrackPublication,
} from 'livekit-client';
import { useLoginContext } from './loginContext';
import { publicConfig } from '@/config/publicConfig';

interface IVideoChatContextProps {
  handleConnect: () => void;
  token: string;
}

interface IProps {
  children: React.ReactElement;
}

const VideoChatContext = createContext({} as IVideoChatContextProps);

const VideoChatContextProvider = ({ children }: IProps) => {
  const { userData } = useLoginContext();
  const token = userData.token;

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

  const getTrackInfo = (trackName: string) => {
    const [trackKind, userId, username] = trackName.split(':');

    return { trackKind, userId, username };
  };

  const handleLocalTrackPublished = (localTrackPublication: LocalTrackPublication) => {
    const { userId } = getTrackInfo(localTrackPublication.trackName);
    if (userId) {
      // fn to update user data
      return {
        id: userId,
        ...(localTrackPublication.kind === 'audio'
          ? {
              audioTrack: localTrackPublication.audioTrack?.mediaStreamTrack,
              audioPub: localTrackPublication,
            }
          : {
              videoTrack: localTrackPublication.videoTrack?.mediaStreamTrack,
              videoPub: localTrackPublication,
            }),
      };
    }
  };

  const handleLocalTrackUnpublished = (localTrackPublication: LocalTrackPublication) => {
    const { userId } = getTrackInfo(localTrackPublication.trackName);

    if (userId) {
      return {
        id: userId,
        audioTrack: undefined,
        audioPub: undefined,
        videoTrack: undefined,
        videoPub: undefined,
      };
    }
  };

  const handleParticipantConnected = (participant: RemoteParticipant) => {
    return {
      id: participant.identity,
      isLocalUser: false,
      username: participant.name,
      isCameraActive: true,
      isMicrophoneActive: true,
    };
  };

  const handleRemoteTrackPublished = (remoteTrackPublication: RemoteTrackPublication) => {
    const videoTrack = remoteTrackPublication.videoTrack?.mediaStreamTrack;
    const audioTrack = remoteTrackPublication.audioTrack?.mediaStreamTrack;
  };

  const handleRemoteTrackUnpublished = (
    remoteTrackPub: RemoteTrackPublication,
    remoteParticipant: RemoteParticipant
  ) => {
    console.log(remoteTrackPub, remoteParticipant);
  };

  const handleTrackSubscribed = () => {};

  const handleTrackUnsubscribed = () => {};

  const handleTrackMuted = () => {};

  const handleTrackUnmuted = () => {};

  const handleParticipantDisconnected = () => {};

  const handleConnect = useCallback(async () => {
    await room.connect(publicConfig.livekitUrl, token);
    room
      .on(RoomEvent.LocalTrackPublished, handleLocalTrackPublished)
      .on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished)
      .on(RoomEvent.ParticipantConnected, handleParticipantConnected)
      .on(RoomEvent.TrackPublished, handleRemoteTrackPublished)
      .on(RoomEvent.TrackUnpublished, handleRemoteTrackUnpublished)
      .on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
      .on(RoomEvent.TrackUnpublished, handleTrackUnsubscribed)
      .on(RoomEvent.TrackMuted, handleTrackMuted)
      .on(RoomEvent.TrackUnmuted, handleTrackUnmuted)
      .on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);

    const localUser = room.localParticipant;

    await localUser.setCameraEnabled(true);
    await localUser.setMicrophoneEnabled(true);
  }, [token]);

  return <VideoChatContext.Provider value={{ handleConnect, token }}>{children}</VideoChatContext.Provider>;
};

const useVideoChatContext = () => useContext(VideoChatContext);
export { VideoChatContextProvider, useVideoChatContext };
