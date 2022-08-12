import { useCallback, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import Router from './components/Router';
import { auth } from './apis/auth';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    await auth.requestAccessToken();
    navigate('/main');
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
