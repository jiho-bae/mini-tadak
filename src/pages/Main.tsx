import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Header from 'src/components/Header';
import RoomCard from 'src/components/RoomCard';
import Tab from 'src/components/common/Tab';
import Loader from 'src/components/Loader';
import SearchBar from 'src/components/SearchBar';

import { userState } from 'src/hooks/recoil/user/atom';
import { useToast } from 'src/hooks/useToast';
import { enterRoom, redirectPage } from 'src/utils/history';
import { ErrorResponse, RoomType } from 'src/types';
import { auth } from 'src/services/auth';
import { getRoom, getRoomByUuid, postEnterRoom, postLogout, ResponseGetRoomData } from 'src/apis';
import { INFINITE_SCROLL, TOAST_MESSAGE } from 'src/utils/constant';
import afterFetcher from 'src/apis/afterFetcher';
import { TAB_NAME } from 'src/utils/constant';
import { getRoomQueryObj } from 'src/apis/apiUtils';
import useInput from 'src/hooks/useInput';
import useDebounce from 'src/hooks/useDebounce';
import socket from 'src/services/socket';
import { SocketEvents } from 'src/services/socket/socketEvents';

const tabWrapperStyle = 'pack mt(1.8rem) w(100%) relative mb(1.8rem) gap(10) @w(~460):vbox';

let roomObserver: IntersectionObserver;

export default function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [tabState, setTabState] = useState({ minitadak: true, campfire: false });
  const [searchStr, onChangeSearch, onResetSearch] = useInput('');
  const debounceSearch = useDebounce({ value: searchStr });
  const [user, setUser] = useRecoilState(userState);
  const { errorToast } = useToast();
  const currentPage = useRef(1);
  const clickedRoomRef = useRef<RoomType>();
  const endRef = useRef<HTMLDivElement>(null);

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

      const roomType = tabState.minitadak ? '????????????' : '???????????????';
      const { current: page } = currentPage;
      const queryObj = getRoomQueryObj({ type: roomType, search, page });
      const fetchResult = await getRoom(queryObj);

      await afterFetcher({
        fetchResult,
        onSuccess: (data: ResponseGetRoomData) => {
          if (page === 1) setRooms([...data.results]);
          else setRooms((preRooms) => [...preRooms, ...data.results]);

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

  const checkAdmissionBySocket = useCallback(
    (uuid: string, nickname: string) => socket.emitEvent(SocketEvents.canIEnter, { uuid, nickname }),
    [],
  );

  const enterClickedRoom = useCallback(
    (isAdmin: boolean) => {
      if (!isAdmin) {
        clickedRoomRef.current = undefined;
        return;
      }
      if (!clickedRoomRef.current) return;

      const roomInfo = clickedRoomRef.current as RoomType;
      const { uuid } = roomInfo;

      postEnterRoom(uuid);
      enterRoom({ uuid, roomInfo, navigate });
    },
    [navigate],
  );

  const onClickRoomCard = useCallback(
    async (e: any) => {
      const roomCard = e.target.closest('.room-card');
      if (!roomCard) return;

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

          clickedRoomRef.current = data;
          checkAdmissionBySocket(data.uuid, user.nickname as string);
        },
        onError: (errorData: ErrorResponse) => {
          errorToast(errorData.message);
        },
      });
    },
    [rooms, user, checkAdmissionBySocket, canIEnterRoom, errorToast],
  );

  const addNewPage = useCallback(() => {
    currentPage.current += 1;
    getRoomList(debounceSearch);
  }, [getRoomList, debounceSearch]);

  useEffect(() => {
    currentPage.current = 1;
    getRoomList(debounceSearch);
  }, [getRoomList, tabState, debounceSearch]);

  useEffect(() => {
    if (endRef.current?.lastElementChild) {
      const { lastElementChild } = endRef.current;

      roomObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && rooms.length === currentPage.current * INFINITE_SCROLL.unit) {
              observer.unobserve(entry.target);
              addNewPage();
            }
          });
        },
        {
          threshold: INFINITE_SCROLL.threshold,
        },
      );
      roomObserver.observe(lastElementChild);
    }

    return () => roomObserver.disconnect();
  }, [addNewPage, rooms]);

  useEffect(() => {
    if (socket.isDisconnected()) socket.init();
    socket.removeListenEvent(SocketEvents.youCanEnter);
    socket.listenEvent(SocketEvents.youCanEnter, enterClickedRoom);
  }, [enterClickedRoom]);

  return (
    <main className="vbox w(80%)">
      <Header onClickLogOut={onClickLogOut} userId={user.nickname} />
      <div className={tabWrapperStyle}>
        <div className="w(50%) pack @w(~450):w(100%) ">
          <Tab text={TAB_NAME.minitadak} isActive={tabState.minitadak} onClick={onClickMiniTadakTab} />
          <Tab text={TAB_NAME.campfire} isActive={tabState.campfire} onClick={onClickCampfireTab} />
        </div>
        <SearchBar search={searchStr} onChange={onChangeSearch} onReset={onResetSearch} />
      </div>
      <section
        ref={endRef}
        className="h(75vh) scroll no-scrollbar hbox(top) gap(30) flex-wrap @w(~450):vpack/h(50vh)"
        onClick={onClickRoomCard}>
        {rooms.length ? (
          rooms.map((room, idx) => <RoomCard key={room.id} cardIdx={idx} {...room} />)
        ) : (
          <div className="w(100%) pack">
            <h2 className="font(2.2rem) c(rgba(0,0,0,0.6))">????????? ?????? ????????????. ????</h2>
          </div>
        )}
        {loading && (
          <div className="w(100%) pack mt(10)">
            <Loader displayText="?????? ???????????? ????????????.." />
          </div>
        )}
      </section>
    </main>
  );
}
