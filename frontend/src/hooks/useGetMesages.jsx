import React, { useEffect } from 'react'
import axios from "axios"
import  { useDispatch, useSelector }  from 'react-redux'
import { setMessages } from '../Redux/messageSlice'
const useGetMessages = () => {

    const {selectedUser}=useSelector(state=>state.user)
    // console.log(selectedUser)

    const dispatch=useDispatch()
    
    useEffect(() => {
        const fetchMessages=async ()=>{
            try {
                const res=await axios.get(`http://localhost:3000/api/v1/message/${selectedUser?._id}`,{
                    timeout:10000
                })  
    
                // console.log(res.data.messages)          
                dispatch(setMessages(res.data.messages))  
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        selectedUser?fetchMessages():null
          
    }, [selectedUser])

    return (
        <>

        </>
    )
}

export default useGetMessages
