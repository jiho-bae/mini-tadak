import { useCallback, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import Router from './components/Router';
import { auth } from './apis/auth';
import { useNavigate } from 'react-router-dom';
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
