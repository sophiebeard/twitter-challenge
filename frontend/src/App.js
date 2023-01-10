import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import Home from './components/Home';
import Register from './components/Authorisation/Register';
import Login from './components/Authorisation/Login';
import Logout from './components/Logout';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import PostPeep from './components/PostPeep';

function App() {

  const [peeps, setPeeps] = useState([]);
  const [getError, setGetError] = useState({ message: `` });
  const [user, setUser] = useState({});
  const url = process.env.REACT_APP_PEEPS_API;

  useEffect(() => {
    const getData = async () => {
      setPeeps(await getPeeps());
    }
    getData();
  }, []);

  const getPeeps = async () => {
    try {
      const res = await axios.get(url);
      return res.data.length ? res.data : new Error(`No peeps yet!`);
    } catch (err) {
      setGetError({ message: `Error returning peeps from the server: ${err.message}` });
      return [];
    }
  };

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Home peepData={{ peeps, getError }} />} />
        <Route path='/post' element={
          user && user._id ? <PostPeep setPeeps={setPeeps} getPeeps={getPeeps} user={user} url={url} /> :
            <Login url={url} setUser={setUser} />} />
        <Route path='/login' element={<Login url={url} setUser={setUser} />} />
        <Route path='/register' element={<Register url={url} />} />
        <Route path='/logout' element={<Logout setUser={setUser} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
