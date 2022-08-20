import { Route, Routes } from 'react-router-dom';

import Login from 'src/pages/Login';
import Join from 'src/pages/Join';
import Main from 'src/pages/Main';
import MiniTadak from 'src/pages/MiniTadak';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/main" element={<Main />} />
      <Route path="/room/:uuid" element={<MiniTadak />} />
    </Routes>
  );
}
