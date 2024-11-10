import React, { useContext } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector } from 'react-redux'
import { SocketContext } from '../context/SocketContext'
const MessageContainer = () => {

  const {selectedUser}=useSelector(state=>state.user)
  const { loadingMessageContainer }=useSelector(state=>state.message)
  const {onlineUsers}=useContext(SocketContext)
  const isOnline=onlineUsers?.includes(selectedUser?._id)
  return (
    <>
      { selectedUser 
          ?
        <div className='md:min-w-[550px] flex flex-col '>
          
          <div className='flex bg-zinc-800 text-white px-4 py-2 items-center'> 
                <div className={`w-12 h-12 avatar ${isOnline}`}>
                    <div className=' rounded-full'>
                        <img src={selectedUser?.profilePhoto} alt="user-profile" />
                    </div>
                </div>

                <div className='mx-2'>
                    <div className=''>
                        {selectedUser?.fullName}
                    </div>
                </div>
          </div>

          <Messages/>
          <SendInput/>
        </div>
        :
        <div className='md:min-w-[550px] flex flex-col items-center mt-60 text-2xl font-medium'> 
          Let's Start Convo...
        </div>
      }
    </>
  )
}

export default MessageContainer
