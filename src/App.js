import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/Login.css'
import Login from './component/Login';
import Page from './component/Page';
import Profile from './component/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/page" element={<Page />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
