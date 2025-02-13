import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setSelectedGroup} from '../../Redux/userSlice'
import { setSelectedUser } from '../../Redux/userSlice'
import toast from 'react-hot-toast'
import axios from 'axios'

const OtherGroup = ({group}) => {
    const dispatch=useDispatch()
    const {selectedGroup}=useSelector(state=>state.user)
    const [loading,setLoading]=useState(false)
    const selectConversationHandler= async ({group})=>{
        
        dispatch(setSelectedUser(null))
        dispatch(setSelectedGroup(group))
    }
    return (
        <div>
            <div onClick={()=>selectConversationHandler({group})} className={` ${selectedGroup?.conversationId==group?.conversationId ? `bg-zinc-200 text-zinc-800`
                :null} flex items-center text-white hover:text-zinc-800 hover:bg-zinc-200 rounded-sm p-2 cursor-pointer`}> 
            
                <div>
                    <div className='w-8 h-8 text-center flex flex-col justify-center rounded-full bg-gray-500'>
                        {group.groupName[0]?.toUpperCase()}
                    </div>
                </div>

                <div className='mx-2'>
                    <div className=''>
                        {group?.groupName}
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </div>
    )
    }

export default OtherGroup
