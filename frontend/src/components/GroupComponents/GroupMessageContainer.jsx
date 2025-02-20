import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SendGroupMessageInput from './SendGroupMessageInput'
import GroupMessages from './GroupMessages'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import { setAllowewdToAddMembers } from '../../Redux/userSlice'
import AddParticipants from './AddParticipants'

const GroupMessageContainer = () => {
    const {selectedGroup , selectedGroupInfo  , addMembers , selectedMembers}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    // console.log(selectedGroup)
    return (
        <div className='relative md:min-w-[550px] flex flex-col justify-between'>
            
            {addMembers && <AddParticipants/>}
            
            <div className='flex justify-between bg-zinc-800 text-white px-4 py-2 items-center'> 
                    <div className='flex items-center py-2 justify-end'>     
                        <div>
                            <div className='w-8 h-8 text-center flex flex-col justify-center rounded-full bg-gray-500'>
                                {selectedGroup?.groupName[0]?.toUpperCase()}
                            </div>
                        </div>

                        <div className='mx-2'>
                            <div className=''>
                                {selectedGroup?.groupName}
                            </div>
                        </div>
                    </div>
                    <button onClick={()=>{
                        const flag=!addMembers ? true : false
                        console.log(flag)
                        dispatch(setAllowewdToAddMembers(flag))
                    }} className='flex text-xs gap-1 items-center bg-gray-600 rounded-lg p-1 hover:bg-gray-700 duration-100 cursor-pointer'>
                        {   
                            !addMembers ? 
                                <>
                                    <CiCirclePlus size={20}/>
                                    <>Add participants</>
                                </>
                            :
                                <>
                                    <CiCircleMinus size={20}/>
                                    <>Disable</>
                                </>
                        }
                    </button>
            </div>

            <GroupMessages messages={selectedGroupInfo?.groupMessages}/>
            <SendGroupMessageInput/>
        </div>
    )
}

export default GroupMessageContainer
