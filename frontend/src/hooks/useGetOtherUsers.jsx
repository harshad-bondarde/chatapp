import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../Redux/userSlice'
import url from '../url/url'

const useGetOtherUsers = () => {
    const dispatch=useDispatch()

    useEffect(()=>{
        const fetchOtherUsers=async()=>{
            try {
                axios.defaults.withCredentials=true
                const res=await axios.get(`${url}/api/v1/user/`)
                // console.log(res.data.otherUsers)
                dispatch(setOtherUsers(res.data.otherUsers))            
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers()
        
    },[])

  return (
    <>
      
    </>
  )
}

export default useGetOtherUsers
