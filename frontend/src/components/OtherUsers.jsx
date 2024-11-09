import React from 'react'
import OtherUser from './OtherUser'
import { useSelector , useDispatch } from 'react-redux'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { MdOutlineCancel } from "react-icons/md";
import { setSearchedUsers } from '../Redux/userSlice';

const OtherUsers = () => {
  const dispatch=useDispatch()
  useGetOtherUsers()
  const {otherUsers ,searchedUsers}=useSelector(state=>state.user)
  
  // console.log(otherUsers)
  // console.log(searchedUsers)
  // if(!otherUsers) return;



  return (
    <>  { searchedUsers.length>0
              ?
          <div className='overflow-auto flex-1'>
            <button
              onClick={()=>{
                dispatch(setSearchedUsers([]))
              }} 
                className='w-full text-white flex flex-col items-center mb-2'>
              <div>
                <MdOutlineCancel size={'20px'}/>
              </div>
            </button>
            {
              searchedUsers?.map(user=><OtherUser key={user._id} user={user}/>)
            }
          </div>
            :
          <div className='overflow-auto flex-1'>
            
            {
              otherUsers?.map(user=><OtherUser key={user._id} user={user}/>)
            }
          </div>
            
        }    
    </>
  )
}

export default OtherUsers
