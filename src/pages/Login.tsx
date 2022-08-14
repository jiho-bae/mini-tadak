import { useNavigate, useLocation } from 'react-router';
import { useSetRecoilState } from 'recoil';

import AuthFormLayout from '../components/layout/AuthFormLayout';
import RectButton from '../components/common/RectButton';

import { userBaseLoginOptions } from '../apis/options';
import { isEmpty } from '../utils/utils';
import useInput from '../hooks/useInput';
import { postLogin } from '../apis';
import { auth } from '../apis/auth';
import { userState } from '../hooks/recoil/atom';

const linkOption = {
  to: '/join',
  text: '회원가입 하러가기',
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedUserId = location.state as string;
  const setUser = useSetRecoilState(userState);
  const [userId, onChangeUserId] = useInput(passedUserId ?? '');
  const [password, onChangePassword] = useInput('');

  const goToMain = () => navigate('/main');

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty(userId)) {
      return;
    }
    if (isEmpty(password)) {
      return;
    }

    const baseOption = userBaseLoginOptions(userId, password);
    const { isOk, data } = await postLogin(baseOption);
    if (isOk && data) {
      auth.setAccessToken(data.token);
      setUser(data.userInfo);
      goToMain();
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
            type="password"
            value={password}
            onChange={onChangePassword}
            id="user_password"
            className="m(0/5/0/5)"
            maxLength={12}
            autoComplete="on"
          />
        </div>
      </div>
      <RectButton buttonName="로그인" w="70" h="70" />
    </AuthFormLayout>
  );
}
