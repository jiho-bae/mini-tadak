import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RoomCard from '../components/RoomCard';
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

  const getRoom = useCallback(async () => {
    const res = await fetch('/api/room?type=타닥타닥&search=&page=1&take=15');
    const resData = await res.json();
    const { results } = resData.data;

    setRooms([...results]);
    setLoading(false);
  }, []);

  const redirectLoginPage = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!loginUser) {
      redirectLoginPage();
      return;
    }
  }, [loginUser, navigate, redirectLoginPage]);

  useEffect(() => {
    getRoom();
  }, [getRoom]);

  if (loading) return <div>loading...</div>;

  return (
    <main>
      <Header onClickLogOut={redirectLoginPage} userId={loginUser.userId} />
      <section className="pack gap(10)">
        {rooms.map((room, idx) => (
          <RoomCard key={room.id} cardIdx={idx} {...room} />
        ))}
      </section>
    </main>
  );
}
