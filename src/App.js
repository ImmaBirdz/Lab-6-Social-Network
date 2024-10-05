import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Page from './component/Page';
import Profile from './component/Profile';
import Message from './component/Message';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/page" element={<Page />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Page />} /> */}
        <Route path="/message" element={<Message />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
