import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const SocketContext=createContext()

export const SocketContextProvider=({ children })=>{
    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const {authUser}=useSelector(state=>state.user)

    useEffect(()=>{
        if(authUser){
            const socket=io("http://localhost:3000",{
                query:{
                    userId:authUser._id
                }
            })
            setSocket(socket)

            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users)
                console.log(onlineUsers)
            })
            return ()=>socket.close()
        }else{
            if(socket){
                socket.close();
                setSocket(null)
            }
        }
    },[authUser])

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}