import { NavigateFunction } from 'react-router-dom';

import { RoomType } from '../types';
import { PATH } from './constant';

type EnterRoomArgs = {
  uuid: string;
  roomInfo: RoomType;
  navigate: NavigateFunction;
};

export function enterRoom({ uuid, roomInfo, navigate }: EnterRoomArgs) {
  navigate(`/room/minitadak/${uuid}`, { state: roomInfo });
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

export function isAuthPage(pathname: string) {
  const authPage = [PATH.login, PATH.join];

  return authPage.includes(pathname);
}
