import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../Redux/messageSlice"
import { SocketContext } from "../context/SocketContext"

const useGetRealTimeMessage = () => {
  const {socket}=useContext(SocketContext)

  const {messages}=useSelector(state=>state.message)
  console.log(messages)
  const dispatch=useDispatch() 

  useEffect(()=>{

    socket?.on('newMessage',(newMessage)=>{
        console.log(newMessage +" this is new message") 
        dispatch(setMessages([...messages,newMessage]))
    })
    return ()=>socket.off("newMessage")

  },[socket,setMessages,messages])
}

export default useGetRealTimeMessage
