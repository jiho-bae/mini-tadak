import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </MainLayout>
    </div>
  );
}

export default App;
