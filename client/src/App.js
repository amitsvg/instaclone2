import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componenets/Navbar';
import Home from "./componenets/Home";
import SignIn from './componenets/SignIn';
import Profile from './componenets/Profile';
import SignUp from './componenets/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './componenets/Createpost';
import { LoginContext } from './context/LoginContext';
import Modal from './componenets/Modal';
import UserProfile from './componenets/UserProfile';
import MyFollowingPost from './componenets/MyFollowingPost';

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin, setModalOpen}}>

          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<Createpost />} />
            <Route path="/profile/:userid" element={<UserProfile />} />
            <Route path="/myfollowingpost" element={<MyFollowingPost />} />

          </Routes>

          <ToastContainer theme='dark' />
          {modalOpen && <Modal setModalOpen={setModalOpen} setUserLogin={setUserLogin}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
