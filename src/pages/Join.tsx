import { useNavigate } from 'react-router';
import AuthFormLayout from '../components/layout/AuthFormLayout';
import RectButton from '../components/common/RectButton';
import useInput from '../hooks/useInput';

const linkOption = {
  to: '/',
  text: '로그인 하러가기',
};

export default function Join() {
  const navigate = useNavigate();
  const [userId, onChangeUserId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const isEmpty = (input: string) => {
    if (input === '') {
      alert('빈칸을 모두 채워주세요.');
      return true;
    }

    return false;
  };

  const redirectLoginPage = (userId: string) => {
    navigate('/', { state: { userId } });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty(userId)) {
      return;
    }
    if (isEmpty(password)) {
      return;
    }

    const userBaseJoinOption = {
      email: `${userId}@mini.tadak`,
      password: `${password}1234@`,
      nickname: userId,
      devField: 1,
    };
    const res = await fetch('/api/auth/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userBaseJoinOption),
    });
    const { statusCode } = await res.json();
    if (statusCode === 201) redirectLoginPage(userId);
    else alert('회원가입 오류');
  };

  return (
    <AuthFormLayout title={'미니타닥 회원가입'} link={linkOption} onSubmitForm={onSubmitForm}>
      <div className="vbox(right) gap(10)">
        <div>
          <label htmlFor="user_id">아이디</label>
          <input value={userId} onChange={onChangeUserId} id="user_id" className="m(0/5/0/5)" maxLength={12} />
        </div>
        <div>
          <label htmlFor="user_password">비밀번호</label>
          <input
            type="current-password"
            value={password}
            onChange={onChangePassword}
            id="user_password"
            className="m(0/5/0/5)"
            maxLength={12}
          />
        </div>
      </div>
      <RectButton buttonName="로그인" w="70" h="70" />
    </AuthFormLayout>
  );
}
