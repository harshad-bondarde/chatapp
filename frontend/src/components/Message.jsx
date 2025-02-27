import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import { useDispatch , useSelector } from 'react-redux'
import { deleteMessage } from '../Redux/messageSlice'
import url from '../url/url'

const Message = ({ message }) => {
  const [showOption,setShowOption]=useState(false)
  const [loading,setLoading]=useState(false)
  const userId=useSelector(state=>state.user.authUser._id)
  const {authUser,selectedUser}=useSelector(state=>state.user) 
  const dispatch=useDispatch()
  const { messages }=useSelector(state=>state.message)
  const scroll=useRef()
  
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[message])


  const deleteThisMessage=async ()=>{
    try{  
      await setLoading(true)
      await setShowOption(true)  
      const response=await axios.post(`${url}/api/v1/message/delete`,{
          message,
          authUser
        })
        if(response.status==200){
          dispatch(deleteMessage(message._id))
          toast.success(response.data.message)
        }else if(response.status==404){
          toast.error(response.data.message)
        }
      }catch(e){
        console.log(e);
        toast.error("Couldn't delete the message")
        return;
      }finally{
        setLoading(false)
        setShowOption(false)
      }
  }
  return (
    <div ref={scroll} className='relative' onClick={()=>{setShowOption(e=>!e)}}>
      { 
        // message.senderId!=userId?
        message.receiverId!=selectedUser._id ?
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={selectedUser?.profilePhoto} />
            </div>
          </div>
          <div className="font-medium">
            {selectedUser?.fullName}
          </div>
          <div className='flex items-center'>
            <div className='flex flex-col max-w-80 items-start'>
              { message.image ?
                    <img className='object-cover w-44 h-44 rounded-lg' src={`${message.image}`}></img>
                    :
                    null
                  }
              {message?.message!="" && <div className="chat-bubble mt-1">{message?.message}</div>}
            </div>
            { showOption?
                <div className='flex mr-3 space-y-1 mb-1 mt-1 ml-3 items-center space-x-1'>
                  <button disabled={loading} onClick={()=>deleteThisMessage()} className='cursor-pointer p-2 border-red-400 hover:shadow-red-500 hover:shadow-md rounded-lg bg-red-500 text-center font-medium text-white text-sm'>
                        { !loading ?
                          <>
                            Delete
                          </>
                          :
                          <span className="loading loading-spinner loading-xs"></span>
                        }
                  </button>           
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
          
          
          <div className='flex items-center '>
            { showOption?
                <div className='flex mr-3 mt-9 space-y-1 mb-1 items-center space-x-1 '>
                    <div onClick={()=>deleteThisMessage()} className='cursor-pointer p-2 border-red-400 hover:shadow-red-500 hover:shadow-md rounded-lg bg-red-500 text-center font-medium text-white text-sm'>
                        { !loading ?
                          <>
                            Delete
                          </>
                          :
                          <span className="loading loading-spinner loading-xs"></span>
                        }
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
              {message?.message!="" && <div className="chat-bubble mt-1">{message?.message}</div>}
            </div>
          </div>
        </div>
      }  
  
   </div>
  )
}
export default Message
