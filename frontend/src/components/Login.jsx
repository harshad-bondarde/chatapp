import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { setAllowewdToAddMembers, setAuthUser, setSelectedMembers } from '../Redux/userSlice'
import url from '../url/url'
const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false)
  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(user.username=="" || user.password==""){
      toast.error("Please fill all the fields")
      return
    }
    
    console.log(url)
    setLoading(true)
    try {
        const res=await axios.post(`${url}/api/v1/user/login`,user)
        
        // console.log(res.data)
        dispatch(setAuthUser(res.data))
        if(res.status==200){
            toast.success("Logged in")
            dispatch(setSelectedMembers([]))
            setUser({
                username: "",
                password: "",
            })
            dispatch(setAllowewdToAddMembers(false))
            navigate("/home")
        }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Unknown Error")
    }finally{
      setLoading(false)
    }

}
  return (
    <>
      <div className='min-w-96 mx-auto'>
        <div className='p-6 shadow-md h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
          <h1 className='text-3xl font-bold text-center'>Login</h1>

          <form onSubmit={handleSubmit} action="">

            <div>
              <label className='label p-2 font-semibold'>
                <span className=''>Username</span>
              </label>
              <input
                className='w-full input input-bordered h-10 font-semibold'
                type="text"
                value={user.username}
                onChange={e=>setUser({...user,username:e.target.value})}
                autoComplete='new-username'
                placeholder='Username' />
            </div>
            <div>
              <label className='label p-2 font-semibold'>
                <span className=''>Password</span>
              </label>
              <input
                className='w-full input input-bordered h-10 font-semibold'
                onChange={e=>setUser({...user,password:e.target.value})}
                value={user.password}
                type="password"
                autoComplete='new-password'
                placeholder='Password' />
            </div>

            <div className='flex justify-center my-3 font-semibold'>
              Already have an account ?
              <Link className='mx-2 text-blue-500 underline' to={"/register"}>
                Signup
              </Link>
            </div>

            <div>
                  <button
                    type="submit"
                    className='btn btn-block btn-md mt-2 border-slate-700'
                  > { !loading ? 'Login' : <span className="loading loading-spinner loading-xs"></span>} </button>
                 
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default Login
