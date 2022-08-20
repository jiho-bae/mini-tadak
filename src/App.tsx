import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import MainLayout from 'src/components/layout/MainLayout';
import Router from 'src/components/Router';

import { auth } from 'src/apis/auth';
import { LocalStorage } from 'src/utils/localStorage';
import { getUserByToken } from 'src/apis';
import { userState } from 'src/hooks/recoil/user/atom';
import Toast from 'src/components/Toast';

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
