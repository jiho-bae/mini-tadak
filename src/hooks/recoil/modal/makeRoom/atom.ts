import { atom } from 'recoil';

const activate = atom({
  key: 'roomModalActivateState',
  default: false,
});

const roomTitle = atom({
  key: 'roomTitleState',
  default: '',
});

const description = atom({
  key: 'descriptionState',
  default: '',
});

const roomType = atom({
  key: 'roomTypeState',
  default: '',
});

const maxHeadCount = atom({
  key: 'maxHeadCountState',
  default: '',
});

const makeRoomState = { activate, roomTitle, description, roomType, maxHeadCount };
export default makeRoomState;
