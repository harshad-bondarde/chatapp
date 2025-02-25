import React, { useContext, useState } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { SocketContext } from '../context/SocketContext'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import axios from 'axios'
import { deleteFromContact, setContacts } from '../Redux/userSlice'
import toast from 'react-hot-toast'
import GroupMessageContainer from './GroupComponents/GroupMessageContainer'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage'
import url from '../url/url'

const MessageContainer = () => {
  const dispatch=useDispatch()
  const {selectedUser , contacts ,selectedGroup}=useSelector(state=>state.user)
  const { loadingMessageContainer }=useSelector(state=>state.message)
  const {onlineUsers}=useContext(SocketContext)
  const isOnline=onlineUsers?.includes(selectedUser?._id)
  const [changinContacts,setChanagingContacts]=useState(false)
  
  const addToContacts=async(userToAdd)=>{
    try {
      setChanagingContacts(true)
      axios.defaults.withCredentials=true
      const response=await axios.post(`${url}/api/v1/user/addToContact`,{
        userToAdd
      })
      if(response.status==200){
        dispatch(setContacts([...contacts,response.data.returnUser]))
        toast.success("Added to Contacts")
      }else{
        console.log(response)
        toast.error("Error while Adding to contacts")
      }
    } catch (error) {
      console.log(error)
      toast.error("Error while Adding to contacts")
    }finally{
      setChanagingContacts(false)
    }
  }

  const deleteFromContacts=async(userToDelete)=>{
    try {
      setChanagingContacts(true)
      axios.defaults.withCredentials=true
      const response=await axios.post(`${url}/api/v1/user/deleteFromContacts`,{
        userToDelete
      })
      if(response.status==200){
        dispatch(deleteFromContact(userToDelete))
        toast.success("Contact Removed")
      }else{
        console.log(response)
        toast.error("Error while Deleting from contacts")
      }
    } catch (error) {
      console.log(error)
      toast.error("Error while Deleting from contacts")
    }finally{
      setChanagingContacts(false)
    }
  }

  useGetRealTimeMessage()
  return (
    <>
      { selectedUser 
          ?
        <div className='md:min-w-[550px] flex flex-col '>
          
          <div className='flex justify-between bg-zinc-800 text-white px-4 py-2 items-center'> 
                <div className='flex items-center py-2'>     
                  <div className={`w-12 h-12 avatar ${isOnline ? 'online' : ""}`}>
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
                <div>
                  {contacts.find(user=>user._id==selectedUser._id)  ? 
                        <button disabled={changinContacts} onClick={()=>deleteFromContacts(selectedUser)} className='flex text-xs gap-1 items-center bg-gray-600 rounded-lg p-1 hover:bg-gray-700 duration-100 cursor-pointer'>
                        {!changinContacts ?
                            <CiCircleMinus size={20}/>
                          :
                          <span className="loading loading-spinner loading-xs"></span>
                        } Remove From Contacts
                      </button>
                    :
                        <button disabled={changinContacts} onClick={()=>addToContacts(selectedUser)} className='flex text-xs gap-1 items-center bg-gray-600 rounded-lg p-1 hover:bg-gray-700 duration-100 cursor-pointer'>
                          {!changinContacts ?
                              <CiCirclePlus size={20}/>
                            :
                            <span className="loading loading-spinner loading-xs"></span>
                          } Add to Contacts
                        </button>
                  }
                </div>
          </div>

          <Messages/>
          <SendInput/>
        </div>
        :
        <>
          { selectedGroup ?
              <GroupMessageContainer/>
              :
              <div className='md:min-w-[550px] flex flex-col items-center mt-60 text-2xl font-medium'> 
                Let's Start Convo...
              </div>
          }
        </>
      }
    </>
  )
}

export default MessageContainer
