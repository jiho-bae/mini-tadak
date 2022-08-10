import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import MiniTadak from '../pages/MiniTadak';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/room/:uuid" element={<MiniTadak />} />
      </Routes>
    </BrowserRouter>
  );
}
