import  { createContext } from 'react';
import { io, Socket } from 'socket.io-client';


const user = JSON.parse(localStorage.getItem('user') || '{}');
const path = window.location.pathname;

const socket = io('http://localhost:3000?userId=' + user._id,);

console.log(path);



const SocketContext = createContext<Socket>(socket);

socket.on('connect', () => console.log('connected to socket'));
socket.on('disconnect', () => console.log('disconnected from socket'));

const SocketProvider = ({ children }: { children: any }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>

    );
};
export { SocketContext, SocketProvider };