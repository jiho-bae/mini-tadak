import { NavigateFunction } from 'react-router-dom';

import { RoomType } from '../types';

type EnterRoomArgs = {
  uuid: string;
  roomInfo: RoomType;
  navigate: NavigateFunction;
};

export function enterRoom({ uuid, roomInfo, navigate }: EnterRoomArgs) {
  navigate(`/room/${uuid}`, { state: roomInfo });
}

type RedirectPageArgs = {
  navigate: NavigateFunction;
  path: string;
  replace?: boolean;
  state?: any;
};

export function redirectPage({ navigate, path, replace = false, state }: RedirectPageArgs): Function {
  return () => navigate(path, { replace, state });
}
