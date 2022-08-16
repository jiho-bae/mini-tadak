import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Header from '../components/Header';
import RoomCard from '../components/RoomCard';

import { userState } from '../hooks/recoil/user/atom';
import { enterRoom } from '../utils/history';
import { RoomType } from '../types';
import { auth } from '../apis/auth';
import { postLogout } from '../apis';

export default function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [user, setUser] = useRecoilState(userState);

  const redirectLoginPage = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

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

  const fetchClickedRoomInfoByUuid = useCallback(async (uuid: string) => {
    const res = await fetch(`/api/room/${uuid}`);
    const resData = await res.json();
    const { data } = resData;
    return data;
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
      const clickedRoomInfo = await fetchClickedRoomInfoByUuid(uuid);
      if (!canIEnterRoom(clickedRoomInfo)) {
        return;
      }

      enterRoom(uuid, clickedRoomInfo, navigate);
    },
    [rooms, fetchClickedRoomInfoByUuid, canIEnterRoom, navigate],
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
    <main className="vbox">
      <Header onClickLogOut={onClickLogOut} userId={user.nickname} />
      <div className="space(30)"></div>
      <hr className="b(1/solid/white)" />
      <div className="space(30)"></div>
      <section className="pack gap(10)" onClick={onClickRoomCard}>
        {rooms.map((room, idx) => (
          <RoomCard key={room.id} cardIdx={idx} {...room} />
        ))}
      </section>
    </main>
  );
}
