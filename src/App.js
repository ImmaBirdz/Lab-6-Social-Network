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
  let found = false;

  // Redirect to NotFound if the profileID in the URL doesn't match the one in the context
  for (let i = 0; i < contextProfileID.length; i++) {
    if (tempProfileID === contextProfileID[i]) { // if the profileID in the URL matches the one in the context
      found = true;
      setProfileID(tempProfileID);
      return <Profile />;
    }
  }
  // if not found and no profile id in context (preventing contextProfile unfinished or not load) then redirect to NotFound
  if (!found && contextProfileID.length > 0) {
    return <NotFound />;
  }
}

function PostWrapper() {
  const { setPostID, contextPostID } = useContext(LoginContext);
  // set tempPostID to the postID in the URL
  const { postID: tempPostID } = useParams();
  let found = false;

  // Redirect to NotFound if the postID in the URL doesn't match the one in the context
  for (let i = 0; i < contextPostID.length; i++) {
    if (tempPostID === contextPostID[i]) { // if the postID in the URL matches the one in the context
      found = true;
      setPostID(tempPostID);
      return <Post />;
    }
  }
  // if not found and no post id in context (preventing contextPost unfinished or not load) then redirect to NotFound
  if (!found && contextPostID.length > 0) {
    return <NotFound />;
  }
}

function App() {
  const { isLogin, isLoaded } = useContext(LoginContext);
  
  return (
    <>
      {isLoaded ?
        <BrowserRouter>
          {isLogin && (
            <>
              <NavBar />
              <SideBarLeft />
              <SideBarRight />
            </>
          )}
          <Routes>
            {isLogin ? (
              <>
                <Route path="/" element={<Page />} />
                <Route path="/page" element={<Page />} />
                <Route path="/:profileID" element={<ProfileWrapper />} />
                <Route path="/message" element={<Message />} />
                <Route path="/post" element={<Post />} />
                <Route path="/post/:postID" element={<PostWrapper />} />
                <Route path="*" element={<NotFound />} />
              </>
            ) : (
              <>
                <Route path="*" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Login />} />
              </>
            )
          }
          </Routes>
        </BrowserRouter>
      :
      <>Loading...</>}
    </>
  );
}

export default App;