import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Header from 'src/components/Header';
import RoomCard from 'src/components/RoomCard';
import Tab from 'src/components/common/Tab';

import { userState } from 'src/hooks/recoil/user/atom';
import { useToast } from 'src/hooks/useToast';
import { enterRoom, redirectPage } from 'src/utils/history';
import { ErrorResponse, RoomType } from 'src/types';
import { auth } from 'src/apis/auth';
import { getRoom, getRoomByUuid, postLogout, ResponseGetRoomData } from 'src/apis';
import { TOAST_MESSAGE } from 'src/utils/constant';
import afterFetcher from 'src/apis/afterFetcher';
import { TAB_NAME } from 'src/utils/constant';
import { getRoomQueryObj } from 'src/apis/apiUtils';
import useInput from 'src/hooks/useInput';

const tabWrapperStyle = 'pack mt(1.8rem) w(100%) relative mb(1.8rem)';

export default function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [tabState, setTabState] = useState({ minitadak: true, campfire: false });
  const [searchStr, onChangeSearchStr] = useInput('');
  const [user, setUser] = useRecoilState(userState);
  const currentPage = useRef(1);
  const { errorToast } = useToast();

  const onClickMiniTadakTab = () => setTabState({ minitadak: true, campfire: false });
  const onClickCampfireTab = () => setTabState({ minitadak: false, campfire: true });

  const redirectLoginPage = redirectPage({ navigate, path: '/', replace: true });

  const onClickLogOut = useCallback(() => {
    postLogout();
    auth.clearAccessToken(true);
    setUser({});
    redirectLoginPage();
  }, [redirectLoginPage, setUser]);

  const getRoomList = useCallback(
    async (search: string) => {
      setLoading(true);

      const roomType = tabState.minitadak ? '타닥타닥' : '캠프파이어';
      const { current: page } = currentPage;
      const queryObj = getRoomQueryObj({ type: roomType, search, page });
      const fetchResult = await getRoom(queryObj);

      await afterFetcher({
        fetchResult,
        onSuccess: (data: ResponseGetRoomData) => {
          if (page === 1) setRooms([...data.results]);
          else setRooms((preRooms) => [...preRooms, ...data.results]);
          currentPage.current += 1;

          setLoading(false);
        },
        onError: (errorData: ErrorResponse) => {
          errorToast(errorData.message ?? TOAST_MESSAGE.fetchError);
          setLoading(false);
        },
      });
    },
    [tabState, errorToast],
  );

  const canIEnterRoom = useCallback((roomData: RoomType) => {
    const { nowHeadcount, maxHeadcount } = roomData;
    return nowHeadcount <= maxHeadcount;
  }, []);

  const onClickRoomCard = useCallback(
    async (e: any) => {
      const roomCard = e.target.closest('.room-card');
      const { cardIdx } = roomCard.dataset;
      const { uuid } = rooms[cardIdx];
      const fetchResult = await getRoomByUuid(uuid);

      await afterFetcher({
        fetchResult,
        onSuccess: (data: RoomType) => {
          if (!canIEnterRoom(data)) {
            errorToast(TOAST_MESSAGE.exceedEntryCapacity);
            return;
          }

          enterRoom({ uuid, roomInfo: data, navigate });
        },
        onError: (errorData: ErrorResponse) => {
          errorToast(errorData.message);
        },
      });
    },
    [rooms, canIEnterRoom, errorToast, navigate],
  );

  useEffect(() => {
    if (!auth.hasAccessToken()) {
      redirectLoginPage();
      return;
    }
  }, [navigate, redirectLoginPage]);

  useEffect(() => {
    if (user.nickname) {
      getRoomList('');
    }
  }, [user, getRoomList]);

  return (
    <main className="vbox w(80%)">
      <Header onClickLogOut={onClickLogOut} userId={user.nickname} />
      <div className={tabWrapperStyle}>
        <Tab text={TAB_NAME.minitadak} isActive={tabState.minitadak} onClick={onClickMiniTadakTab} />
        <Tab text={TAB_NAME.campfire} isActive={tabState.campfire} onClick={onClickCampfireTab} />
      </div>
      <section className="hbox gap(10) flex-wrap @w(~450):vpack" onClick={onClickRoomCard}>
        {rooms.map((room, idx) => (
          <RoomCard key={room.id} cardIdx={idx} {...room} />
        ))}
        {!loading && (
          <div className="w(100%) pack mt(10)">
            <div>loading......</div>
          </div>
        )}
      </section>
    </main>
  );
}
