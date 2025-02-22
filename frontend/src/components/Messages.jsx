import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMesages'
import { useSelector } from 'react-redux'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage'


const Messages = () => {
  
  useGetMessages()
  // useGetRealTimeMessage()
  const {messages}=useSelector(state=>state.message)
  const { loadingMessageContainer }=useSelector(state=>state.message)

  return (
    <div className='px-4 flex-1 overflow-auto'>
      { !loadingMessageContainer ?
          <div className='flex flex-col gap-5'>  
            { 
              messages 
                  &&
              messages?.map((message)=><Message key={message._id} message={message}/>) 
            }
          </div>
          :
          <div className='flex flex-col items-center mt-44'>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
      }
    </div>
  )
}

export default Messages
