import React, {useContext, useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import {AuthContext} from './context/AuthContext';

export const constants = {
    PROJECT_ID: {
        key: 'novi-education-project-id',
        value: 'c0a2656f-ad70-45b7-ba18-5a4c3d923b7e'
    },
    API: 'https://novi-backend-api-wgsgz.ondigitalocean.app/api/',
}

function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <NavBar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
