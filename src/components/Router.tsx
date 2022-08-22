import { Route, Routes } from 'react-router-dom';

import Login from 'src/pages/Login';
import Join from 'src/pages/Join';
import Main from 'src/pages/Main';
import MiniTadak from 'src/pages/MiniTadak';

import { PATH } from 'src/utils/constant';

export default function Router() {
  return (
    <Routes>
      <Route path={PATH.login} element={<Login />} />
      <Route path={PATH.join} element={<Join />} />
      <Route path={PATH.main} element={<Main />} />
      <Route path={PATH.minitadak} element={<MiniTadak />} />
    </Routes>
  );
}
