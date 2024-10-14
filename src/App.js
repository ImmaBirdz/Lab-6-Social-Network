import './App.css';
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { LoginContext } from './variable/LoginContext';
import Login from './component/Login';
import Page from './component/Page';
import Profile from './component/Profile';
import Message from './component/Message';
import NavBar from './component/NavBar';
import SideBarLeft from './component/SideBarLeft';
import SideBarRight from './component/SideBarRight';
import Post from './component/Post';
import NotFound from './component/NotFound';

function ProfileWrapper() {
  const { profileID, setProfileID, contextProfileID } = useContext(LoginContext);
  // set tempProfileID to the profileID in the URL
  const { profileID: tempProfileID } = useParams();

  console.log('Context Profile ID: ' + contextProfileID);

  // Redirect to NotFound if the profileID in the URL doesn't match the one in the context
  for (let i = 0; i < contextProfileID.length; i++) {
    if (tempProfileID === contextProfileID[i]) { // if the profileID in the URL matches the one in the context
      setProfileID(tempProfileID);
      console.log('Profile ID: ' + profileID);
      return <Profile />;
    }
  }
  // if (tempProfileID !== contextProfileID) {
  //   return <NotFound />;
  // }
  // window.location.href = '/notfound'; // redirect to NotFound if the profileID in the URL doesn't match the one in the context
}

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
          <Route path="/page" element={<Page />} />
          <Route path={`/profile/:profileID`} element={<ProfileWrapper  />} /> {/* profileID is a URL parameter */}
          <Route path="/message" element={<Message />} />
          <Route path="/post" element={<Post />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<Page />} />
        </Routes>
        <SideBarRight />
      </BrowserRouter>
    )
  );
}

export default App;