import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Router from './components/Router';
import { auth } from './apis/auth';
import { LocalStorage } from './utils/localStorage';
import { getUserByToken } from './apis';

function App() {
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    const { isOk, data } = await getUserByToken();
    if (isOk && data) {
      auth.setAccessToken(data.token);
      navigate('/main');
    }
  }, [navigate]);

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
    </div>
  );
}

export default App;
