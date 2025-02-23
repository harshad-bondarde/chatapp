import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMessage, setMessages } from "../Redux/messageSlice"
import { SocketContext } from "../context/SocketContext"
import toast from 'react-hot-toast'

import {addNewGroupMessage, deleteGroupMessage} from '../Redux/userSlice'
const useGetRealTimeMessage = () => {
  const {socket}=useContext(SocketContext)
  const {selectedUser , authUser ,selectedGroup ,groups ,otherUsers}=useSelector(state=>state.user)
  const {messages}=useSelector(state=>state.message)
  const dispatch=useDispatch() 

  useEffect(()=>{

    socket?.on('newMessage',(newMessage)=>{
        if(newMessage.senderId==selectedUser?._id){
          dispatch(setMessages([...messages,newMessage]))
        }else{
          const sender=otherUsers.find(user=>user._id==newMessage.senderId)
          toast(`New Message from ${sender?.fullName}`, {
            // icon: '👏',
            icon: '📢',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
            position: 'bottom-right'
          });
          const audio=new Audio('../../livechat-129007.mp3')
          audio.play()
        }
    })

    socket?.on('deleteMessageInConversation',({senderId , receiverId , messageId})=>{
      console.log({senderId,receiverId,messageId})
      if(selectedUser?._id==senderId || selectedUser?._id==receiverId)
        // console.log(senderId,receiverId,messageId)
      console.log({senderId,receiverId,messageId})
        dispatch(deleteMessage(messageId))
    })

    socket?.on('newGroupMessage',(newGroupMessage)=>{
      if(selectedGroup?.conversationId==newGroupMessage?.conversationId){
        console.log(newGroupMessage)
        dispatch(addNewGroupMessage(newGroupMessage))
      }else{
        const group=groups.find(group=>group.conversationId==newGroupMessage.conversationId)
        if(group){
          toast(`New Message in Group ${group.groupName}`, {
            // icon: '👏',
            icon: '📢',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
            position: 'bottom-right'
          });
        }
        const audio=new Audio('../../livechat-129007.mp3')
        audio.play()
      }
    })

    socket?.on('deleteGroupMessage',(groupMessage)=>{
      console.log(groupMessage)
      if(selectedGroup?.conversationId==groupMessage.conversationId){
        dispatch(deleteGroupMessage(groupMessage._id))
      }else{
        
      }
    })
    return () => {
      socket?.off('newGroupMessage');
      socket?.off("newMessage");
      socket?.off("deleteMessageInConversation");
      socket?.off("deleteGroupMessage");

    };

  },[socket,setMessages,messages])
}

export default useGetRealTimeMessage
