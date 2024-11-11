import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../Redux/messageSlice"
import { SocketContext } from "../context/SocketContext"

const useGetRealTimeMessage = () => {
  const {socket}=useContext(SocketContext)

  const {messages}=useSelector(state=>state.message)
  const dispatch=useDispatch() 

  useEffect(()=>{

    socket?.on('newMessage',(newMessage)=>{
        dispatch(setMessages([...messages,newMessage]))
    })
    return ()=>socket.off("newMessage")

  },[socket,setMessages,messages])
}

export default useGetRealTimeMessage
