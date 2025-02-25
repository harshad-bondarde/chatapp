import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setContacts } from '../Redux/userSlice'
import axios from "axios"
import url from '../url/url'

const useGetContacts = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        axios.defaults.withCredentials=true
        const fetchContacts=async()=>{
            try {
                const response=await axios.get(`${url}/api/v1/user/getContacts`)
                if(response.status==200){
                    dispatch(setContacts(response.data.contactUsersInfo))
                }else{
                    console.log(response)
                    toast.error("Error While getting Contacts")
                }
            } catch (error) {
                console.log(error)
                toast.error("Error While getting Contacts")
            }
        }
        fetchContacts()
    },[])
}

export default useGetContacts
