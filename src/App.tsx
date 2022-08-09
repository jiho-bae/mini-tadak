import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </Router>
      </MainLayout>
    </div>
  );
}

export default App;
