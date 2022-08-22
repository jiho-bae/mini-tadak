import { useNavigate } from 'react-router';

import AuthFormLayout from 'src/components/layout/AuthFormLayout';
import RectButton from 'src/components/common/RectButton';

import useInput from 'src/hooks/useInput';
import { userBaseJoinOptions } from 'src/apis/options';
import { postJoin } from 'src/apis';
import { isEmpty } from 'src/utils/utils';
import { useToast } from 'src/hooks/useToast';
import afterFetcher from 'src/apis/afterFetcher';
import { TOAST_MESSAGE, PATH } from 'src/utils/constant';
import { ErrorResponse } from 'src/types';
import { redirectPage } from 'src/utils/history';

const linkOption = {
  to: PATH.login,
  text: '로그인 하러가기',
};

export default function Join() {
  const navigate = useNavigate();
  const toast = useToast();
  const [userId, onChangeUserId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const redirectLoginPage = redirectPage({ navigate, path: PATH.login, replace: true, state: userId });

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty(userId)) {
      return;
    }
    if (isEmpty(password)) {
      return;
    }

    const baseOption = userBaseJoinOptions(userId, password);
    const fetchResult = await postJoin(baseOption);

    await afterFetcher({
      fetchResult,
      onSuccess: () => {
        redirectLoginPage();
        toast.successToast(TOAST_MESSAGE.joinSuccess);
      },
      onError: (errorData: ErrorResponse) => {
        toast.errorToast(errorData.message);
      },
    });
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
      <RectButton buttonName="회원가입" w="70" h="70" />
    </AuthFormLayout>
  );
}
