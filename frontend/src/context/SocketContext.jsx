import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import url from "../url/url";

export const SocketContext=createContext()

export const SocketContextProvider=({ children })=>{
    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const {authUser}=useSelector(state=>state.user)

    useEffect(()=>{
        if(authUser){
            const socket=io(`${url}`,{
                query:{
                    userId:authUser._id
                }
            })
            // console.log(socket)
            setSocket(socket)

            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users)
            })
            return ()=>socket.close()
        }else{
            if(socket){
                socket.close();
                setSocket(null)
            }
        }
        console.log(socket)
        console.log(onlineUsers)
        return ()=>{
            socket?.close()
        }
    },[authUser])

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}