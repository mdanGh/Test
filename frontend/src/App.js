import React from 'react';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/chat/Home';
import { SocketContext, socket } from './socket';

function App() {

    return (
        <SocketContext.Provider value={socket}>
            <BrowserRouter>
                <Routes>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/' element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </SocketContext.Provider>
    )
}

export default App; 