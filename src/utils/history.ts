import { NavigateFunction } from 'react-router-dom';

import { RoomType } from '../types';

export function enterRoom(uuid: string, roomInfo: RoomType, navigate: NavigateFunction) {
  navigate(`/room/${uuid}`, { state: roomInfo });
}
