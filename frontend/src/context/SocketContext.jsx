import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client'

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser){
            const socketInstance = io("http://localhost:3000",{
                query: { userId: authUser._id },
            });

            setSocket(socketInstance);

            // Listen for online users
            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                socketInstance.close();
            }

        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }

    }, [authUser])

    return(
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}