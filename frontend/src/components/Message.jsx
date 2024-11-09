import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
const Message = ({ message }) => {
  const userId=useSelector(state=>state.user.authUser._id)
  const {authUser,selectedUser}=useSelector(state=>state.user)
  
  const scroll=useRef()
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[message])

  return (
    <div ref={scroll}>
      { message.senderId!=userId?
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={selectedUser?.profilePhoto} />
            </div>
          </div>
          <div className="chat-header">
            {selectedUser?.fullName}
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">{message?.message}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      :
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={authUser?.profilePhoto} />
            </div>
          </div>
          <div className="chat-header text-zinc-200 my-1">
            {authUser?.fullName}
            <time className="text-xs opacity-50 mx-1">12:46</time>
          </div>
          <div className="chat-bubble">{message?.message}</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      }  
   </div>
  )
}

export default Message
