import { memo } from 'react';
import { RoomType } from '../types';

type RoomCardProps = RoomType & {
  cardIdx: number;
};

export default memo(function RoomCard({
  title,
  description,
  nowHeadcount,
  maxHeadcount,
  owner,
  cardIdx,
}: RoomCardProps) {
  return (
    <div
      className="room-card w(250) h(150) vbox bg(white) r(15) p(15) cursor(pointer) hover:bg(#74b9ff) "
      data-card-idx={cardIdx}>
      <h4 className="bold font(18)">{title}</h4>
      <p>{description}</p>
      <div className="flex"></div>
      <p>주인장 : {owner.nickname}</p>
      <p>
        <span className="c(blue)">{nowHeadcount}</span>명 / <span className="c(red)">{maxHeadcount}</span>명
      </p>
    </div>
  );
});
