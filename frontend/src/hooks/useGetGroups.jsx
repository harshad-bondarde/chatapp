import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch , useSelector } from 'react-redux'
import toast from "react-hot-toast"
import { setGroups } from '../Redux/userSlice'
import url from '../url/url'

const useGetGroups = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const getAllGroups=async()=>{
            const response=await axios.get(`${url}/api/v1/group/getAllGroups`)
            if(response.status==200){
                dispatch(setGroups(response.data.groups))
                console.log(response.data.groups)
                console.log("HI")
            }else{
                toast.error("Error while getting groups")
            }
            console.log(response)
        }
        getAllGroups()
    },[])

    return (
        <>
        
        </>
    )
}

export default useGetGroups
