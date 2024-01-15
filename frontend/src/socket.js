import { io } from 'socket.io-client';
import React from 'react';
const URL = 'http://localhost:5000/';
export const socket = io.connect(URL);
export const SocketContext = React.createContext();