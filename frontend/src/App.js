import React from 'react';
import Register from './Auth/Register/Register';
import Login from './Auth/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App; 