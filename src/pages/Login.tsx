import { useState } from 'react';
import { useNavigate } from 'react-router';
import RectButton from '../components/common/RectButton';

type LoginProps = {};

export default function Login({}: LoginProps) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const onChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value);

  const isEmptyUserId = (userId: string) => {
    if (userId === '') {
      alert('아이디를 입력하세요.');
      return true;
    }
    return false;
  };

  const goToMain = (userId: string) => {
    navigate('/main', { state: { userId } });
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmptyUserId(userId)) {
      return;
    }

    goToMain(userId);
  };

  return (
    <div className="@w(~375):w(150) @w(376~):w(360) h(200)  m(auto/auto) p(15) bg(white) r(10) vbox(center) gap(80)">
      <h1 className="font(24) bold">미니타닥 로그인</h1>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="user_id">아이디</label>
        <input value={userId} onChange={onChangeUserId} id="user_id" className="m(0/5/0/5)" maxLength={12} />
        <RectButton buttonName="로그인" />
      </form>
    </div>
  );
}
