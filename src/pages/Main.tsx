import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RoomCard from '../components/RoomCard';
import MakeRoom from '../components/MakeRoom';
import { RoomType } from '../types';

type LocationState = {
  userId: string;
};

export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginUser = location.state as LocationState;
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const roomDataRef = useRef<RoomType>();

  const redirectLoginPage = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  const enterClickedRoom = useCallback(() => {
    const { uuid } = roomDataRef.current as RoomType;
    navigate(`/room/${uuid}`);
  }, [navigate]);

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

      roomDataRef.current = clickedRoomInfo;
      enterClickedRoom();
    },
    [rooms, fetchClickedRoomInfoByUuid, canIEnterRoom, enterClickedRoom],
  );

  useEffect(() => {
    if (!loginUser) {
      redirectLoginPage();
      return;
    }
  }, [loginUser, navigate, redirectLoginPage]);

  useEffect(() => {
    fetchRoomList();
  }, [fetchRoomList]);

  if (loading) return <div>loading...</div>;

  return (
    <main className="vbox">
      <Header onClickLogOut={redirectLoginPage} userId={loginUser.userId} />
      <MakeRoom userId={loginUser.userId} />
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
