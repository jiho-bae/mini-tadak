import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RectButton from './common/RectButton';
import Select from './common/Select';
import ModalLayout from './layout/ModalLayout';

import useInput from 'src/hooks/useInput';
import { INPUT, PLACEHOLDER_TXT, SELECT_TEXT, RoomNames } from 'src/utils/constant';
import { enterRoom } from 'src/utils/history';
import { postRoom } from 'src/apis';

type OptionType = {
  value: number;
  label: string;
};

export const adminOptions = new Array(8).fill(0).map((_, i) => ({ value: i + 2, label: i + 2 }));

export const roomOptions: OptionType[] = [
  { value: 1, label: RoomNames.tadak },
  { value: 2, label: RoomNames.campfire },
];

type MakeRoomProps = {
  userId: number;
  onClickBlackBackground: () => void;
};

const MakeRoom = (props: MakeRoomProps): JSX.Element => {
  const { userId, onClickBlackBackground } = props;
  const navigate = useNavigate();
  const [roomTitle, onChangeRoomTitle] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [roomType, setRoomType] = useState('');
  const [maxHeadcount, setMaxHeadcount] = useState('');

  const onChangeRoomType = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setRoomType((e.target[e.target.selectedIndex] as HTMLOptionElement).text);
  const onChangeAdminNumber = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setMaxHeadcount((e.target[e.target.selectedIndex] as HTMLOptionElement).value);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomTitle || !description || !roomType || !maxHeadcount) return alert('칸을 다 채우세요.');

    const requestBody = {
      userId,
      title: roomTitle,
      description,
      maxHeadcount: Number(maxHeadcount),
      roomType,
    };

    const { isOk, data } = await postRoom(requestBody);
    if (isOk && data) {
      enterRoom(data.uuid, data, navigate);
    }
  };

  return (
    <ModalLayout onClickBlackBackground={onClickBlackBackground}>
      <div className="w(100%) bg(white) p(10) r(10)">
        <h4 className="font(24) bold text-center">방 만들기</h4>
        <form className="hbox" onSubmit={onSubmitForm}>
          <div className="w(80%) p(10) vbox gap(10)">
            <input
              type="text"
              placeholder={PLACEHOLDER_TXT.roomTitle}
              onChange={onChangeRoomTitle}
              maxLength={INPUT.roomTitleMaxLen}
              autoComplete="new-password"
            />
            <input
              type="text"
              placeholder={PLACEHOLDER_TXT.roomDiscrpt}
              onChange={onChangeDescription}
              maxLength={INPUT.roomDescMaxLen}
              autoComplete="new-password"
            />
            <Select name={SELECT_TEXT.roomType} options={roomOptions} onChange={onChangeRoomType} />
            <Select name={SELECT_TEXT.headCount} options={adminOptions} onChange={onChangeAdminNumber} />
          </div>
          <div className="space(30)"></div>
          <RectButton buttonName="생성" w="15%" h="150" />
        </form>
      </div>
    </ModalLayout>
  );
};

export default MakeRoom;
