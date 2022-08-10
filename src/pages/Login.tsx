import { useNavigate } from 'react-router';
import RectButton from '../components/common/RectButton';
import AuthFormLayout from '../components/layout/AuthFormLayout';
import useInput from '../hooks/useInput';
import { UserType } from '../types';

type LoginProps = {};

const linkOption = {
  to: '/join',
  text: '회원가입 하러가기',
};

export default function Login({}: LoginProps) {
  const navigate = useNavigate();
  const [userId, onChangeUserId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const goToMain = (userData: UserType) => {
    navigate('/main', { state: { userData } });
  };

  const isEmpty = (userId: string) => {
    if (userId === '') {
      return true;
    }

    return false;
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty(userId)) {
      return;
    }
    if (isEmpty(password)) {
      return;
    }

    const userBaseLoginOption = {
      email: `${userId}@mini.tadak`,
      password: `${password}1234@`,
    };

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userBaseLoginOption),
    });
    const { statusCode, data } = await res.json();

    if (statusCode === 201) {
      goToMain(data);
    }
  };

  return (
    <AuthFormLayout title={'미니타닥 로그인'} link={linkOption} onSubmitForm={onSubmitForm}>
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
