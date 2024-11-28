import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMessage, setMessages } from "../Redux/messageSlice"
import { SocketContext } from "../context/SocketContext"

const useGetRealTimeMessage = () => {
  const {socket}=useContext(SocketContext)
  const {selectedUser , authUser}=useSelector(state=>state.user)
  const {messages}=useSelector(state=>state.message)
  const dispatch=useDispatch() 

  useEffect(()=>{

    socket?.on('newMessage',(newMessage)=>{
        if(newMessage.senderId==selectedUser?._id){
          dispatch(setMessages([...messages,newMessage]))
        }
    })

    socket?.on('deleteMessageInConversation',({senderId,messageId})=>{
      if(selectedUser?._id==senderId)
        console.log(senderId,messageId)
        dispatch(deleteMessage(messageId))
    })
    return ()=>socket.off("newMessage")

  },[socket,setMessages,messages])
}

export default useGetRealTimeMessage
