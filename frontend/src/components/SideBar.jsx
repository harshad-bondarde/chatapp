import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { setAuthUser, setSearchedUsers ,setSelectedUser} from '../Redux/userSlice';
import { useDispatch,useSelector } from 'react-redux';


const SideBar = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate();

    const [loading,setLoading]=useState(false)
    const {otherUsers}=useSelector(state=>state.user)
    const [search,setSearch]=useState('')
    const [showContacts,setShowContacts]=useState(false)

    const logOutHandler=async ()=>{
        setLoading(true)
        try {
            const res=await axios.get("http://localhost:3000/api/v1/user/logout")
            if(res){
                setLoading(false)
            }
            dispatch(setAuthUser(null))
            dispatch(setSelectedUser(null))
            
            toast.success(res.data.message);
            navigate("/login")
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const searchHandler=async (e)=>{
        e.preventDefault();
        let searchResult=otherUsers.filter((user)=>{
            if(user.fullName.toLowerCase().includes(search.toLowerCase()))
                {return user}
        })
        if(search!='')
            dispatch(setSearchedUsers(searchResult))
        setSearch('')
    }
    return (
        <div className='relative border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchHandler} className='flex items-center gap-2 m-2' action="">

                <input
                    className='input input-bordered rounded-md '
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    type="text"
                    placeholder='Search...' />

                <button
                    className='btn btn-circle bg-zinc-500 border-zinc-500 text-white '
                    type='submit'>
                        <BiSearchAlt2 size={'20px'} />
                </button>

            </form>
            <div className='flex justify-center text-sm gap-5 mt-1'>
                <div onClick={()=>setShowContacts(false)} className={`border-2 p-1 cursor-pointer border-slate-500 rounded-lg text-white ${!showContacts ? `bg-gray-500 font-semibold`:``}`}>
                    All Users
                </div>
                <div onClick={()=>{ setShowContacts(true)}} className={`border-2 p-1 cursor-pointer rounded-lg text-white border-slate-500 ${showContacts ? `bg-gray-500 font-semibold`:``}`}>
                    Contacts
                </div>
            </div>

            <hr className='border-slate-400 mt-3 mb-2' />

            <OtherUsers showContacts={showContacts}/>
            
            <div className=''>
                <button onClick={logOutHandler} className='btn btn-sm'>
                    { !loading ?
                        "Logout"
                        :
                       <span className="loading loading-spinner loading-xs"></span>
                    }
                </button>
            </div>

        </div>
    )
}

export default SideBar
