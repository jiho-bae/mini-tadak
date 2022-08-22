import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import MainLayout from 'src/components/layout/MainLayout';
import Router from 'src/components/Router';
import Toast from 'src/components/Toast';

import { auth } from 'src/apis/auth';
import { LocalStorage } from 'src/utils/localStorage';
import { getUserByToken, PostLoginResponse } from 'src/apis';
import { userState } from 'src/hooks/recoil/user/atom';
import afterFetcher from './apis/afterFetcher';
import { useToast } from './hooks/useToast';
import { TOAST_MESSAGE } from './utils/constant';

function App() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const { errorToast } = useToast();

  const getUser = useCallback(async () => {
    const fetchResult = await getUserByToken();

    await afterFetcher({
      fetchResult,
      onSuccess: (data: PostLoginResponse) => {
        auth.setAccessToken(data.token);
        setUser(data.userInfo);
        navigate('/main');
      },
      onError: () => {
        errorToast(TOAST_MESSAGE.invalidToken);
        navigate('/');
      },
    });
  }, [navigate, setUser, errorToast]);

  useEffect(() => {
    if (!LocalStorage.validateAuthFlag()) {
      navigate('/');
      return;
    }

    if (!auth.hasAccessToken()) {
      getUser();
    }
  }, [getUser, navigate]);

  return (
    <div className="App">
      <MainLayout>
        <Router />
      </MainLayout>
      <Toast />
    </div>
  );
}

export default App;
