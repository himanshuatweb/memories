import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Container } from '@material-ui/core';

import PostState from './context/post/postState';
import AuthState from './context/auth/authState';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log('In app js 20 ', user);

  return (
    <AuthState>
      <PostState>
        <Router>
          <Container maxWidth='xl'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Navigate to='/posts' replace />} />
              <Route path='/posts' element={<Home />} />
              <Route path='/posts/search' element={<Home />} />
              <Route path='/posts/:id' element={<PostDetails />} />
              <Route
                path='/auth'
                element={
                  <>{!user ? <Auth /> : <Navigate to='/posts' replace />}</>
                }
              />
            </Routes>
          </Container>
        </Router>
      </PostState>
    </AuthState>
  );
};
export default App;

/*
  https://gist.github.com/adrianhajdin/bbe19d3a3055e3c7b66b0bfac25c5c49
  https://www.youtube.com/watch?v=VsUzmlZfYNg&t=208s
  https://github.com/himanshuatweb/github-finder/blob/main/src/App.js
  https://github.com/adrianhajdin/project_mern_memories/blob/PART_3/client/src/components/Auth/Auth.js

  https://github.com/IamUjju/Memories
  00:00:00 Intro
00:10:03 Setup
00:19:00 MongoDB
00:50:33 Redux
01:17:30 Create a Post
02:32:55 Authentication
04:55:08 Pagination Feature
05:08:50 Search
06:10:12 Details Page
06:24:30 Recommended Posts
06:36:13 Comments Feature 
07:20:38 Deployment
  */
