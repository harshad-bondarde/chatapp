import React, { useState } from 'react'
import OtherUser from './OtherUser'
import OtherGroup from './GroupComponents/OtherGroup'
import { useSelector , useDispatch } from 'react-redux'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { MdOutlineCancel } from "react-icons/md";
import { setSearchedUsers } from '../Redux/userSlice';
import { addGroup } from '../Redux/userSlice';
import useGetGroups from '../hooks/useGetGroups';
import toast from "react-hot-toast"
import axios from 'axios';
import url from '../url/url'

const OtherUsers = ({thiskey ,setKey}) => {
  // console.log(thiskey)
  const dispatch=useDispatch()
  useGetOtherUsers()
  useGetGroups()

  const {otherUsers ,searchedUsers , contacts , groups}=useSelector(state=>state.user)
  
  const [groupName,setGroupName]=useState("")
  const [createGroup,setCreateGroup]=useState(false)
  const [loading,setLoading]=useState(false)

  const handleGroupCreation=async()=>{
    if(groupName==""){
      toast.error("Please Enter Group Name")
      return 
    }

    try {
      setLoading(true)
      const response=await axios.post(`${url}/api/v1/group/createGroup`,{
        groupName
      })
      console.log(response)
      dispatch(addGroup(response.data))
      toast.success("Group Created Successfully")
      setGroupName("")
    } catch (error) {
      console.log(error)
      toast.error("Error while creating group")
    }finally{
      setCreateGroup(false)
      setLoading(false)
    }

  }

  return (
    <>  { searchedUsers?.length>0
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
                    thiskey=='allUsers' && otherUsers?.map(user=><OtherUser key={user._id} user={user}/>)
                  }
                  { 
                    thiskey=='contacts' && contacts?.map(user=><OtherUser key={user._id} user={user}/>)
                  }
                  {
                    thiskey=='groups' && 
                      <div className='w-full'>
                        <div className='flex justify-center'> 
                            { !createGroup ?
                              <button className='btn btn-sm'
                                onClick={()=>{
                                  setCreateGroup(true)
                                }}
                              >
                                Create New Group
                              </button>
                              :
                              <div className='flex gap-1'>
                                <input placeholder='Enter Group Name' 
                                  onChange={(e)=>{setGroupName(e.target.value)}} 
                                  className='text-center rounded-md '/>
                                <button className='btn btn-sm'
                                  onClick={()=>handleGroupCreation()}>
                                  {!loading ?
                                    "Submit"
                                    :
                                    <span className="loading loading-spinner loading-xs"></span>
                                  }
                                </button>
                              </div>
                            }       
                        </div>

                        <hr className='border-slate-400 mt-3 mb-2 mx-5'/>
                        
                        {groups.length>0 && groups?.map((group,key)=><OtherGroup key={key} group={group}/>)}
                      
                      </div>
                  }
                </div>
            
        }    
    </>
  )
}

export default OtherUsers
