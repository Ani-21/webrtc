import { createContext, useCallback, useContext, useState } from 'react';
import {
  Room,
  RoomEvent,
  VideoPresets,
  LocalTrackPublication,
  RemoteParticipant,
  RemoteTrackPublication,
  RemoteTrack,
  Participant,
  TrackPublication,
} from 'livekit-client';
import { useLoginContext } from './loginContext';
import { publicConfig } from '@/config/publicConfig';

interface IVideoChatContextProps {
  handleConnect: () => void;
  token: string;
  participants: IUserMedia[];
}

interface IProps {
  children: React.ReactElement;
}

interface IUserMedia {
  id: string;
  username: string | undefined;
  audioTrack: MediaStreamTrack | undefined | null;
  audioPub: RemoteTrackPublication | LocalTrackPublication | undefined | null;
  videoTrack: MediaStreamTrack | undefined | null;
  videoPub: RemoteTrackPublication | LocalTrackPublication | undefined | null;
  isLocalParticipant: boolean;
  isCameraActive: boolean;
  isMicActive: boolean;
  isLocalUser: boolean;
}

const VideoChatContext = createContext({} as IVideoChatContextProps);

const VideoChatContextProvider = ({ children }: IProps) => {
  const { userData } = useLoginContext();
  const [participants, setParticipants] = useState<IUserMedia[]>([]);

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

  const handleLocalTrackPublished = useCallback(
    (localTrackPublication: LocalTrackPublication, participant: Participant) => {
      const updateParticipants = participants.map((user) => {
        if (user.id === participant.identity) {
          return {
            ...user,
            audioTrack: localTrackPublication.audioTrack?.mediaStreamTrack,
            audioPub: localTrackPublication,
            videoTrack: localTrackPublication.videoTrack?.mediaStreamTrack,
            videoPub: localTrackPublication,
            isLocalParticipant: true,
            isCameraActive: true,
            isMicActive: true,
          };
        } else {
          return user;
        }
      });

      setParticipants(updateParticipants);
    },
    [participants]
  );

  const handleLocalTrackUnpublished = useCallback(
    (localTrackPublication: LocalTrackPublication, participant: Participant) => {
      const updateParticipants = participants.map((user) => {
        if (user.id === participant.identity) {
          return {
            ...user,
            audioTrack: undefined,
            audioPub: undefined,
            videoTrack: undefined,
            videoPub: undefined,
            isCameraActive: false,
            isMicActive: false,
          };
        } else {
          return user;
        }
      });

      setParticipants(updateParticipants);
    },
    [participants]
  );

  const handleParticipantConnected = useCallback(
    (participant: RemoteParticipant) => {
      const participantConnected: IUserMedia = {
        id: participant.identity,
        isLocalUser: false,
        username: participant.name,
        isCameraActive: true,
        isMicActive: true,
        audioTrack: undefined,
        audioPub: undefined,
        videoTrack: undefined,
        videoPub: undefined,
        isLocalParticipant: false,
      };
      setParticipants((prev) => [...prev, participantConnected]);
    },
    [participants]
  );

  const handleRemoteTrackPublished = useCallback(
    (remoteTrackPublication: RemoteTrackPublication, participant: Participant) => {
      const updateParticipants = participants.map((user) => {
        if (user.id === participant.identity) {
          return {
            ...user,
            videoTrack: remoteTrackPublication.videoTrack?.mediaStreamTrack,
            videoPub: remoteTrackPublication,
            audioTrack: remoteTrackPublication.audioTrack?.mediaStreamTrack,
            audioPub: remoteTrackPublication,
          };
        } else {
          return user;
        }
      });

      setParticipants(updateParticipants);
    },
    [participants]
  );

  const handleRemoteTrackUnpublished = useCallback(
    (publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      const updateParticipants = participants.map((user) => {
        if (user.id === participant.identity) {
          return {
            ...user,
            videoTrack: undefined,
            videoPub: undefined,
            audioTrack: undefined,
            audioPub: undefined,
          };
        } else {
          return user;
        }
      });

      setParticipants(updateParticipants);
    },
    [participants]
  );

  const handleTrackSubscribed = useCallback(
    (remoteTrackPublication: RemoteTrackPublication, participant: RemoteParticipant) => {
      const updateParticipants = participants.map((user) => {
        if (user.id === participant.identity) {
          return {
            ...user,
            videoTrack: remoteTrackPublication.videoTrack?.mediaStreamTrack,
            videoPub: remoteTrackPublication,
            audioTrack: remoteTrackPublication.audioTrack?.mediaStreamTrack,
            audioPub: remoteTrackPublication,
          };
        } else {
          return user;
        }
      });

      setParticipants(updateParticipants);
    },
    [participants]
  );

  const handleTrackUnsubscribed = useCallback(
    (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      const updateParticipants = participants.map((user) => {
        if (user.id === participant.identity) {
          return {
            ...user,
            videoTrack: undefined,
            videoPub: undefined,
            audioTrack: undefined,
            audioPub: undefined,
          };
        } else {
          return user;
        }
      });

      setParticipants(updateParticipants);
    },
    [participants]
  );

  const handleTrackMuted = useCallback(
    (track: TrackPublication, participant: Participant) => {
      const updateParticipants = participants.map((user) => {
        if (user.id === participant.identity) {
          if (track.kind === 'video') {
            return {
              ...user,
              isCameraActive: false,
            };
          } else {
            return {
              ...user,
              isMicActive: false,
            };
          }
        } else {
          return user;
        }
      });

      setParticipants(updateParticipants);
    },
    [participants]
  );

  const handleTrackUnmuted = useCallback(
    (track: TrackPublication, participant: Participant) => {
      const updateParticipants = participants.map((user) => {
        if (user.id === participant.identity) {
          if (track.kind === 'video') {
            return {
              ...user,
              isCameraActive: true,
            };
          } else {
            return {
              ...user,
              isMicActive: true,
            };
          }
        } else {
          return user;
        }
      });

      setParticipants(updateParticipants);
    },
    [participants]
  );

  const handleParticipantDisconnected = useCallback(
    (participant: Participant) => {
      const filteredParticipant = participants.filter((user) => user.id !== participant.identity);
      setParticipants(filteredParticipant);
    },
    [participants]
  );

  const handleConnect = useCallback(async () => {
    room
      .on(RoomEvent.LocalTrackPublished, handleLocalTrackPublished)
      .on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished)
      .on(RoomEvent.ParticipantConnected, handleParticipantConnected)
      .on(RoomEvent.TrackPublished, handleRemoteTrackPublished)
      .on(RoomEvent.TrackUnpublished, handleRemoteTrackUnpublished)
      // @ts-ignore
      .on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
      .on(RoomEvent.TrackMuted, handleTrackMuted)
      .on(RoomEvent.TrackUnmuted, handleTrackUnmuted)
      .on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);

    await room.connect(publicConfig.livekitUrl, token);

    const localUser = room.localParticipant;

    setParticipants([
      {
        id: localUser.identity,
        isLocalUser: true,
        username: localUser.name,
        isCameraActive: true,
        isMicActive: true,
        audioTrack: null,
        audioPub: null,
        videoTrack: null,
        videoPub: null,
        isLocalParticipant: false,
      },
    ]);

    await localUser.enableCameraAndMicrophone();
  }, [token]);

  return (
    <VideoChatContext.Provider value={{ handleConnect, token, participants }}>{children}</VideoChatContext.Provider>
  );
};

const useVideoChatContext = () => useContext(VideoChatContext);
export { VideoChatContextProvider, useVideoChatContext };
