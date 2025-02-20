import React from 'react'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { deselectMember, addSelectedMembers } from '../../Redux/userSlice'

const AddParticipants = () => {
    const {otherUsers , selectedGroupInfo , selectedMembers}=useSelector(state=>state.user)
    // console.log(selectedMembers)
    const dispatch=useDispatch()
    const MapParticipants=({otherUsers})=>{

        return otherUsers.map((user,key)=>(
            <div key={key} className='border p-1 w-full'>
                {  
                !selectedGroupInfo.participants.includes({_id:user._id}) &&
                    <>
                        <div  onClick={()=>{}} className={`bg-zinc-300 text-black flex justify-between items-center hover:text-zinc-800 rounded-xl p-2 cursor-pointer`}> 
                            <div className='flex items-center'>        
                                <div className={``}>
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
                            {   !selectedMembers?.includes(user._id) ?
                                    <div onClick={()=>{
                                        dispatch(addSelectedMembers(user._id))
                                    }}>
                                        <CiCirclePlus size={25} className=''/>
                                    </div>
                                :
                                <>
                                    <div onClick={()=>{
                                        dispatch(deselectMember(user._id))
                                    }}>
                                        <CiCircleMinus size={25} className=''/>
                                    </div>
                                </>
                            }
                        </div>
                        <div className='divider my-0 py-0 h-1'></div>
                    </>
                }
            </div>)
        )

    }
    return (
    <div className='absolute top-16 right-36 flex flex-col items-center z-10 bg-gray-400 max-h-96 w-72 overflow-auto'>
        <div className='overflow-auto w-full'>
            <MapParticipants otherUsers={otherUsers}/>
        </div>
        <button className='btn btn-ghost bg-gray-200'>
            Add
        </button>
    </div>
  )
}

export default AddParticipants
