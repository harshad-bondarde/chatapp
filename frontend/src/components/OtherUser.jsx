import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedGroup, setSelectedUser } from '../Redux/userSlice'
import { SocketContext } from '../context/SocketContext.jsx'

const OtherUser = ({user}) => {
    // console.log(user)
    const dispatch=useDispatch()

    const selectedUserHandler=async({user})=>{
        // console.log(user)
        await dispatch(setSelectedGroup(null))
        dispatch(setSelectedUser(user));
    }

    const { onlineUsers }=useContext(SocketContext)
    
    const { selectedUser } =useSelector(state=>state.user)
    const isOnline=onlineUsers?.includes(user._id)

    // console.log(selectedUser)
  return (
    <>
        <div>
            <div onClick={()=>selectedUserHandler({user})} className={` ${selectedUser?._id===user?._id ? `bg-zinc-200 text-slate-800`
                :null} flex items-center text-white hover:text-zinc-800 hover:bg-zinc-200 rounded-sm p-2 cursor-pointer`}> 
            
                <div className={`avatar ${isOnline?'online':''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>

                <div className='mx-2'>
                    <div className=''>
                        {user?.fullName}
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>

        </div> 
    </>
  )
}

export default OtherUser
