import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { VideoPresets, Participant, RoomOptions, Room, AudioTrack } from 'livekit-client';
import { useRoom } from '@livekit/react-core';
import { useLoginContext } from './loginContext';
import { publicConfig } from '@/config/publicConfig';
import { SocketError, SocketEvent } from '@/const/socketEvents';
import { useSocketContext } from './socketContext';
import { IData } from '@/models';

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
  const { subscribe, unsubscribe } = useSocketContext();
  const { setIsFull } = useLoginContext();

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
  const [users, setUsers] = useState<Participant[]>([]);

  const token = userData.token;

  const handleConnect = useCallback(async () => {
    try {
      await connect(publicConfig.livekitUrl, token);
      await room?.localParticipant.enableCameraAndMicrophone();
      console.log('LOCAL PART:video context', room?.localParticipant);
    } catch (err: any) {
      throw new Error('Something went wrong', { cause: err });
    }
  }, [token, room?.localParticipant, connect]);

  useEffect(() => {
    if (participants) {
      setUsers(participants);
    }

    subscribe(SocketEvent.userValidateEnter, (data: IData) => {
      if (data.error === SocketError.userFullRoomError) {
        setIsFull(true);
      }
    });

    subscribe(SocketEvent.userLogout, (userId: string) => {
      setIsFull(false);
      const remainedUsers = users.filter((participant) => participant.identity !== userId);
      setUsers(remainedUsers);
    });

    return () => {
      unsubscribe(SocketEvent.userLogout), unsubscribe(SocketEvent.userValidateEnter);
    };
  }, [participants, users, subscribe, unsubscribe]);

  return (
    <VideoChatContext.Provider value={{ handleConnect, token, participants, room, audioTracks }}>
      {children}
    </VideoChatContext.Provider>
  );
};

const useVideoChatContext = () => useContext(VideoChatContext);
export { VideoChatContextProvider, useVideoChatContext };
