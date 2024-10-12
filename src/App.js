import './App.css';
import { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContext } from './variable/LoginContext';
import Login from './component/Login';
import Page from './component/Page';
import Profile from './component/Profile';
import Message from './component/Message';
import NavBar from './component/NavBar';
import SideBarLeft from './component/SideBarLeft';
import SideBarRight from './component/SideBarRight';
import Post from './component/Post';
import Notfound from './component/Notfound';

function App() {
  const { isLogin } = useContext(LoginContext);
  
  return (
    !isLogin ? (
      <Login />
    ) : (
      <BrowserRouter>
        <NavBar />
        <SideBarLeft />
        <Routes>
          <Route path="*" element={<Page />} />
          <Route path="/page" element={<Page />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<Message />} />
          <Route path='/post' element={<Post />} />
          <Route path='/notfound' element={<Notfound />} />
        </Routes>
        <SideBarRight />
      </BrowserRouter>
    )
  );
}

export default App;