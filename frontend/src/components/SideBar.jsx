import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { setAuthUser, setContacts, setGroups, setOtherUsers, setSearchedUsers ,setSelectedUser} from '../Redux/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import url from '../url/url'


const SideBar = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate();

    const [loading,setLoading]=useState(false)
    const {otherUsers}=useSelector(state=>state.user)
    const [search,setSearch]=useState('')
    // const keys=['allUsers','contacts','groups']
    const [thiskey,setKey]=useState('allUsers')

    const logOutHandler=async ()=>{
        setLoading(true)
        try {
            const res=await axios.get(`${url}/api/v1/user/logout`)
            if(res){
                setLoading(false)
            }
            dispatch(setAuthUser(null))
            dispatch(setSelectedUser(null))
            dispatch(setGroups([]));
            dispatch(setContacts([]))
            dispatch(setOtherUsers([]))
            
            toast.success(res.data.message);
            navigate("/")
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
                <div onClick={()=>{
                    setKey('allUsers')
                }} className={`border-2 p-1 cursor-pointer border-slate-500 rounded-lg text-white ${thiskey=='allUsers' ? `bg-gray-500 font-semibold`:``}`}>
                    All Users
                </div>
                <div onClick={()=>{ 
                    setKey('contacts')
                }} className={`border-2 p-1 cursor-pointer rounded-lg text-white border-slate-500 ${thiskey=='contacts' ? `bg-gray-500 font-semibold`:``}`}>
                    Contacts
                </div>
                <div onClick={()=>{
                    setKey('groups')
                }} className={`border-2 p-1 cursor-pointer rounded-lg text-white border-slate-500 ${thiskey=='groups' ? `bg-gray-500 font-semibold`:``}`} >
                    Groups
                </div>
            </div>

            <hr className='border-slate-400 mt-3 mb-2' />

            <OtherUsers thiskey={thiskey} setKey={setKey}/>
            
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
