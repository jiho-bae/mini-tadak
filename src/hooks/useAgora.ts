import { useCallback, useEffect, useState } from 'react';
import { UserType } from '../types';
import { getClient } from '../agora/config';
import { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { userPublished, userUnpublished, userChanged, muteTrack, publishTrack } from '../agora/util';
import useToggle from './useToggle';

type UseAgoraProps = {
  agoraAppId: string;
  agoraToken: string;
  uuid: string;
  userInfo: UserType;
  agoraType: string;
  ready: boolean;
  track?: IMicrophoneAudioTrack | null;
  tracks?: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
};

type UseAgoraReturns = {
  agoraUsers: IAgoraRTCRemoteUser[];
  isStreaming: boolean;
  toggleIsStreaming: () => void;
};

function useAgora({
  agoraAppId,
  agoraToken,
  uuid,
  userInfo,
  agoraType,
  ready,
  track,
  tracks,
}: UseAgoraProps): UseAgoraReturns {
  const client = getClient();
  const [agoraUsers, setAgoraUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [isStreaming, toggleIsStreaming] = useToggle(false);

  const addUsers = useCallback((user: IAgoraRTCRemoteUser) => {
    setAgoraUsers((prevUsers) => [...new Set([...prevUsers, user])]);
  }, []);

  const removeUsers = useCallback((user: IAgoraRTCRemoteUser) => {
    setAgoraUsers((prevUsers) => {
      return prevUsers.filter((User) => User.uid !== user.uid);
    });
  }, []);

  const listenAgora = useCallback(() => {
    client.on('user-published', userPublished(agoraType, client, addUsers));
    client.on('user-unpublished', userUnpublished(agoraType));
    client.on('user-joined', userChanged(addUsers));
    client.on('user-left', userChanged(removeUsers));
  }, [agoraType, client, addUsers, removeUsers]);

  const startAgora = useCallback(async () => {
    await client.join(agoraAppId, uuid, agoraToken, encodeURI(userInfo.nickname ?? ''));
    await publishTrack(client, track || tracks);
    await muteTrack({ track, tracks });

    toggleIsStreaming();
  }, [uuid, agoraAppId, agoraToken, client, track, tracks, userInfo, toggleIsStreaming]);

  useEffect(() => {
    if (ready && (track || tracks)) {
      listenAgora();
      startAgora();
    }
  }, [listenAgora, startAgora, ready, track, tracks]);

  return { agoraUsers, isStreaming, toggleIsStreaming };
}

export default useAgora;
