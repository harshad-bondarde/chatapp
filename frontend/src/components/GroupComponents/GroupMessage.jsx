import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import { useDispatch , useSelector } from 'react-redux'

const GroupMessage = ({message}) => {
    const [showOption,setShowOption]=useState(false)
    const scroll=useRef()
    const {authUser , selectedGroupInfo}=useSelector(state=>state.user) 
    const dispatch=useDispatch()
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"})
    },[message])

    const sender=selectedGroupInfo.participants.includes({_id:message.senderId})
    // console.log(message)
    
    const deleteThisMessage=async()=>{

    }

  return (
    <div ref={scroll} className='relative' onClick={()=>{setShowOption(e=>!e)}}>
      { 
        // message.senderId!=userId?
        sender?._id==authUser?._id   ?
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={sender?.profilePhoto} />
            </div>
          </div>
          <div className="font-medium">
            {sender?.fullName}
          </div>
          <div className='flex items-center'>
            <div className='flex flex-col max-w-80 items-start'>
              { message.image ?
                    <img className='object-cover w-44 h-44 rounded-lg' src={`${message.image}`}></img>
                    :
                    null
                  }
              {message?.message!="" && <div className="chat-bubble">{message?.message}</div>}
            </div>
            { showOption?
                <div className='flex mr-3 space-y-1 mb-1 ml-3 items-center space-x-1'>
                  <div onClick={()=>deleteThisMessage()} className='cursor-pointer p-2 border-red-400 hover:shadow-red-500 hover:shadow-md rounded-lg bg-red-500 text-center font-medium text-white text-sm'>
                      Delete
                  </div>           
            </div>
              :
                <>
                </>
            }
          </div>
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
          
          
          <div className='flex'>
            { showOption?
                <div className='flex mr-3 space-y-1 mb-1 items-center space-x-1'>
                    <div onClick={()=>deleteThisMessage()} className='cursor-pointer p-2 border-red-400 hover:shadow-red-500 hover:shadow-md rounded-lg bg-red-500 text-center font-medium text-white text-sm'>
                        Delete
                    </div>           
                </div>
              :
                <>
                </>
            }
            <div className='flex flex-col w-fit items-end'>
              <div className="chat-header text-zinc-200 my-1 font-medium">
                {authUser?.fullName}
              </div>

              { message.image ?
                    <img className='object-cover rounded-lg w-44 h-44' src={`${message.image}`}></img>
                    :
                    null
                  }
              {message?.message!="" && <div className="chat-bubble">{message?.message}</div>}
            </div>
          </div>
        </div>
      }  
  
   </div>
  )
}

export default GroupMessage
