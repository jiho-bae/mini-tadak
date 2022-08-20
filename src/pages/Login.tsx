import { useNavigate, useLocation } from 'react-router';
import { useSetRecoilState } from 'recoil';

import AuthFormLayout from 'src/components/layout/AuthFormLayout';
import RectButton from 'src/components/common/RectButton';

import { userBaseLoginOptions } from 'src/apis/options';
import { isEmpty } from 'src/utils/utils';
import useInput from 'src/hooks/useInput';
import { postLogin, PostLoginResponse } from 'src/apis';
import afterFetcher from 'src/apis/afterFetcher';
import { auth } from 'src/apis/auth';
import { userState } from 'src/hooks/recoil/user/atom';
import { useToast } from 'src/hooks/useToast';
import { TOAST_MESSAGE } from 'src/utils/constant';
import { ErrorResponse } from 'src/types';

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
  const { successToast, errorToast } = useToast();

  const goToMain = () => navigate('/main');

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty(userId)) {
      errorToast(TOAST_MESSAGE.invalidFormatUserId);
      return;
    }
    if (isEmpty(password)) {
      errorToast(TOAST_MESSAGE.invalidFormatPwd);
      return;
    }

    const baseOption = userBaseLoginOptions(userId, password);

    const fetchResult = await postLogin(baseOption);
    await afterFetcher({
      fetchResult,
      onSuccess: (data: PostLoginResponse) => {
        auth.setAccessToken(data.token);
        setUser(data.userInfo);
        successToast(TOAST_MESSAGE.loginSuccess);
        goToMain();
      },
      onError: (errorData: ErrorResponse) => {
        errorToast(errorData.message ?? TOAST_MESSAGE.loginConfirm);
      },
    });
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
