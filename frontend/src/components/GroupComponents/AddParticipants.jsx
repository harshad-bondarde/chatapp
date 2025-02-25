import React, { useState } from 'react'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { deselectMember, addSelectedMembers, setSelctedGroupInfo, setAllowewdToAddMembers, setSelectedMembers, addNewParticipants } from '../../Redux/userSlice'
import toast from 'react-hot-toast'
import axios from 'axios'
import url from '../../url/url'

const AddParticipants = () => {
    const [loading,setLoading]=useState(false)
    const {otherUsers , selectedGroupInfo , selectedGroup , selectedMembers}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    
    const AddParticipants=async()=>{
        if(selectedMembers.length==0){
            toast.error("Select atleast one user")
            return
        }
        try {
            setLoading(true)
            const response=await axios.post(`${url}/api/v1/group/addParticipants`,{
                conversationId:selectedGroup.conversationId,
                usersToAdd:selectedMembers
            })
            console.log(response.data)
            await dispatch(addNewParticipants(response.data.participantsInfo))
            await dispatch(setAllowewdToAddMembers(false))
            await dispatch(setSelectedMembers([]))
            toast.success(response.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Error while adding participants")
        }finally{
            setLoading(false)
        }
    }
    const MapParticipants=({otherUsers})=>{

        return otherUsers.map((user,key)=>(
            <>  {   
                    !selectedGroupInfo?.participants?.find(added=>{
                                                        return added._id==user._id
                                                    }) &&
                    <div key={key} className='border p-1 w-full'>
                            
                                <div  onClick={()=>{}} className={`bg-zinc-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 text-black flex justify-between items-center hover:text-zinc-800 rounded-xl p-2 cursor-pointer`}> 
                                    <div className='flex items-center'>        
                                        <div className={``}>
                                            <div className='w-8 rounded-full'>
                                                <img src={user?.profilePhoto} alt="user-profile" />
                                            </div>
                                        </div>

                                        <div className='mx-2'>
                                            <div className=''>
                                                {user?.fullName}
                                            </div>
                                        </div>
                                    </div>
                                    {   !selectedMembers?.includes(user._id) ?
                                            <div onClick={()=>{
                                                dispatch(addSelectedMembers(user._id))
                                            }}>
                                                <CiCirclePlus size={25} className=''/>
                                            </div>
                                        :
                                        <>
                                            <div onClick={()=>{
                                                console.log(user._id)
                                                dispatch(deselectMember(user._id))
                                            }}>
                                                <CiCircleMinus size={25} className=''/>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className='divider my-0 py-0 h-1'></div>
                            
                    </div>
                }
            </>
            
        )
    )

    }
    return (
    <div className='absolute top-16 right-36 flex flex-col items-center z-10 max-h-96 w-60 rounded-xl p-2 overflow-auto bg-zinc-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30'>
        <div className='overflow-auto w-full'>
            <MapParticipants otherUsers={otherUsers}/>
        </div>

        <button disabled={loading} onClick={()=>AddParticipants()} className='btn btn-ghost bg-gray-200 btn-sm w-20 m-1'>
            {   !loading ? 
                   'Add'
                   :
                <>
                    <span className="loading loading-spinner loading-xs text-slate-600"></span>
                </>
            }
        </button>
    </div>
  )
}

export default AddParticipants
