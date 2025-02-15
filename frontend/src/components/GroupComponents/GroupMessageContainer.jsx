import React from 'react'
import { useSelector } from 'react-redux'
import SendGroupMessageInput from './SendGroupMessageInput'
import GroupMessages from './GroupMessages'

const GroupMessageContainer = () => {
    const {selectedGroup , selectedGroupInfo}=useSelector(state=>state.user)
    // console.log(selectedGroup)
    return (
        <div className='md:min-w-[550px] flex flex-col justify-between'>
            
            <div className='flex justify-between bg-zinc-800 text-white px-4 py-2 items-center'> 
                    <div className='flex items-center py-2'>     
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
            </div>

            <GroupMessages messages={selectedGroupInfo?.groupMessages}/>
            <SendGroupMessageInput/>
        </div>
    )
}

export default GroupMessageContainer
