import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Header from 'src/components/Header';
import RoomCard from 'src/components/RoomCard';

import { userState } from 'src/hooks/recoil/user/atom';
import { useToast } from 'src/hooks/useToast';
import { enterRoom, redirectPage } from 'src/utils/history';
import { ErrorResponse, RoomType } from 'src/types';
import { auth } from 'src/apis/auth';
import { getRoomByUuid, postLogout } from 'src/apis';
import { TOAST_MESSAGE } from 'src/utils/constant';
import afterFetcher from 'src/apis/afterFetcher';

export default function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [user, setUser] = useRecoilState(userState);
  const { errorToast } = useToast();

  const redirectLoginPage = redirectPage({ navigate, path: '/', replace: true });

  const onClickLogOut = useCallback(() => {
    postLogout();
    auth.clearAccessToken(true);
    setUser({});
    redirectLoginPage();
  }, [redirectLoginPage, setUser]);

  const fetchRoomList = useCallback(async () => {
    const res = await fetch('/api/room?type=타닥타닥&search=&page=1&take=15');
    const resData = await res.json();
    const { results } = resData.data;

    setRooms([...results]);
    setLoading(false);
  }, []);

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
      fetchRoomList();
    }
  }, [fetchRoomList, user]);

  if (loading) return <div>loading...</div>;

  return (
    <main className="vbox w(80%)">
      <Header onClickLogOut={onClickLogOut} userId={user.nickname} />
      <section className="hbox gap(10) flex-wrap @w(~450):vpack" onClick={onClickRoomCard}>
        {rooms.map((room, idx) => (
          <RoomCard key={room.id} cardIdx={idx} {...room} />
        ))}
      </section>
    </main>
  );
}
