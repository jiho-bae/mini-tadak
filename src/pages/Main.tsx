import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoomType } from '../types';

export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginUser = location.state;
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const getRoom = useCallback(async () => {
    const res = await fetch('/api/room?type=타닥타닥&search=&page=1&take=15');
    const resData = await res.json();
    const { results } = resData.data;

    setRooms([...results]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loginUser) {
      navigate('/', { replace: true });
      return;
    }
  }, [loginUser, navigate]);

  useEffect(() => {
    getRoom();
  }, [getRoom]);

  if (loading) return <div>loading...</div>;

  return (
    <main>
      <section className="pack gap(10)">
        {rooms.map((room) => {
          const { id, title, description, nowHeadcount, maxHeadcount, owner } = room;

          return (
            <div
              className="room-card w(250) h(150) vbox bg(white) r(15) p(15) cursor(pointer) hover:bg(#74b9ff)"
              key={id}>
              <h4 className="bold font(18)">{title}</h4>
              <p>{description}</p>
              <div className="flex"></div>
              <p>주인장 : {owner.nickname}</p>
              <p>
                <span className="c(blue)">{nowHeadcount}</span>명 / <span className="c(red)">{maxHeadcount}</span>명
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
