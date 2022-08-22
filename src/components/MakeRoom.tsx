import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import RectButton from './common/RectButton';
import Select from './common/Select';
import ModalLayout from './layout/ModalLayout';
import Input from './common/Input';

import useRecoilInput from 'src/hooks/useRecoilInput';
import makeRoomState from 'src/hooks/recoil/modal/makeRoom/atom';
import { INPUT, PLACEHOLDER_TXT, SELECT_TEXT, RoomNames } from 'src/utils/constant';
import { enterRoom } from 'src/utils/history';
import { postRoom } from 'src/apis';
import { useToast } from 'src/hooks/useToast';
import afterFetcher from 'src/apis/afterFetcher';
import { ErrorResponse, RoomType } from 'src/types';

type OptionType = {
  value: number;
  label: string;
};

export const adminOptions = new Array(8).fill(0).map((_, i) => ({ value: i + 2, label: i + 2 }));

export const roomOptions: OptionType[] = [
  { value: 0, label: RoomNames.tadak },
  { value: 1, label: RoomNames.campfire },
];

type MakeRoomProps = {
  userId: number;
  onClickBlackBackground: () => void;
};

const MakeRoom = (props: MakeRoomProps): JSX.Element => {
  const { userId, onClickBlackBackground } = props;
  const navigate = useNavigate();
  const { errorToast } = useToast();
  const [roomTitle, onChangeRoomTitle] = useRecoilInput(makeRoomState.roomTitle);
  const [description, onChangeDescription] = useRecoilInput(makeRoomState.description);
  const [roomTypeIdx, setRoomTypeIdx] = useRecoilState(makeRoomState.roomType);
  const [maxHeadcount, setMaxHeadcount] = useRecoilState(makeRoomState.maxHeadCount);

  const onChangeRoomType = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setRoomTypeIdx((e.target[e.target.selectedIndex] as HTMLOptionElement).value);
  const onChangeAdminNumber = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setMaxHeadcount((e.target[e.target.selectedIndex] as HTMLOptionElement).value);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomTitle || !description || !roomTypeIdx || !maxHeadcount) return alert('칸을 다 채우세요.');

    const requestBody = {
      userId,
      title: roomTitle,
      description,
      maxHeadcount: Number(maxHeadcount),
      roomType: roomOptions[Number(roomTypeIdx)].label,
    };

    const fetchResult = await postRoom(requestBody);
    await afterFetcher({
      fetchResult,
      onSuccess: (data: RoomType) => {
        enterRoom({ uuid: data.uuid, roomInfo: data, navigate });
      },
      onError: (errorData: ErrorResponse) => {
        errorToast(errorData.message);
      },
    });
  };

  return (
    <ModalLayout onClickBlackBackground={onClickBlackBackground}>
      <div className="w(100%) bg(white) p(10) r(10)">
        <h4 className="font(24) bold text-center">방 만들기</h4>
        <form className="hbox" onSubmit={onSubmitForm}>
          <div className="w(80%) p(10) vbox gap(10)">
            <Input
              name="제목"
              type="text"
              placeholder={PLACEHOLDER_TXT.roomTitle}
              onChange={onChangeRoomTitle}
              maxLength={INPUT.roomTitleMaxLen}
              autoComplete="new-password"
              value={roomTitle}
            />
            <Input
              name="설명"
              type="text"
              placeholder={PLACEHOLDER_TXT.roomDiscrpt}
              onChange={onChangeDescription}
              maxLength={INPUT.roomDescMaxLen}
              autoComplete="new-password"
              value={description}
            />
            <Select
              name={SELECT_TEXT.roomType}
              selected={roomTypeIdx}
              options={roomOptions}
              onChange={onChangeRoomType}
            />
            <Select
              name={SELECT_TEXT.headCount}
              selected={maxHeadcount}
              options={adminOptions}
              onChange={onChangeAdminNumber}
            />
          </div>
          <div className="space(30)"></div>
          <RectButton buttonName="생성" w="15%" h="150" />
        </form>
      </div>
    </ModalLayout>
  );
};

export default MakeRoom;
