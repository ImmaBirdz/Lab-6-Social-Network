import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Page from './component/Page';
import Profile from './component/Profile';
import Message from './component/Message';
import NavBar from './component/NavBar';
import SideBarLeft from './component/SideBarLeft';
import SideBarRight from './component/SideBarRight';
import Post from './component/Post';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <SideBarLeft />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/page" element={<Page />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/message" element={<Message />} />
        <Route path='/post' element={<Post />} />
        <Route path="*" element={<Page />} />

      </Routes>
      <SideBarRight />
    </BrowserRouter>
  );
}

export default App;
