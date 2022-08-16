import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import MainLayout from './components/layout/MainLayout';
import Router from './components/Router';

import { auth } from './apis/auth';
import { LocalStorage } from './utils/localStorage';
import { getUserByToken } from './apis';
import { userState } from './hooks/recoil/user/atom';
import Toast from './components/Toast';

function App() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const getUser = useCallback(async () => {
    const { isOk, data } = await getUserByToken();
    if (isOk && data) {
      auth.setAccessToken(data.token);
      setUser(data.userInfo);
      navigate('/main');
    }
  }, [navigate, setUser]);

  useEffect(() => {
    if (!LocalStorage.validateAuthFlag()) return;
    if (!auth.hasAccessToken()) {
      getUser();
    }
  }, [getUser]);

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
