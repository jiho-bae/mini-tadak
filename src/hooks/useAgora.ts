import { useCallback, useEffect, useState } from 'react';
import { UserType } from '../types';
import { useClient } from '../agora/config';
import { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { userPublished, userUnpublished, userChanged, muteTrack, publishTrack } from '../agora/util';

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
  users: IAgoraRTCRemoteUser[];
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
};

function useTadakAgora({
  agoraAppId,
  agoraToken,
  uuid,
  userInfo,
  agoraType,
  ready,
  track,
  tracks,
}: UseAgoraProps): UseAgoraReturns {
  const client = useClient();
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState(false);

  const addUsers = useCallback((user: IAgoraRTCRemoteUser) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  }, []);

  const removeUsers = useCallback((user: IAgoraRTCRemoteUser) => {
    setUsers((prevUsers) => {
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

    setStart(true);
  }, [uuid, agoraAppId, agoraToken, client, track, tracks, userInfo]);

  useEffect(() => {
    if (ready && (track || tracks)) {
      listenAgora();
      startAgora();
    }
  }, [listenAgora, startAgora, ready, track, tracks]);

  return { users, start, setStart };
}

export default useTadakAgora;
