import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetGroupMessages from '../../hooks/useGetGroupMessages'
import GroupMessage from './GroupMessage'
import AddParticipants from './AddParticipants'

const GroupMessages = ({messages}) => {
    const dispatch=useDispatch()
    const {selectedGroup  , addGroupInfo}=useSelector(state=>state.user)     
    const {loadingMessageContainer}=useSelector(state=>state.message)
    
    useGetGroupMessages()
    return (
      <div className='px-4 flex-1 overflow-auto'>
         {/* {addGroupInfo?.addMembers && <AddParticipants/>} */}
            { !loadingMessageContainer ?
                <div className='flex flex-col gap-5'>  
                  { 
                    messages 
                        &&
                    messages?.map((message)=><GroupMessage key={message._id} message={message}/>) 
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

export default GroupMessages
