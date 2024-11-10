import React, { useEffect } from 'react'
import axios from "axios"
import  { useDispatch, useSelector }  from 'react-redux'
import { setMessages } from '../Redux/messageSlice'
import { setLoadingMessageContainer } from '../Redux/messageSlice'
const useGetMessages = () => { 

    const {selectedUser}=useSelector(state=>state.user)

    const dispatch=useDispatch()
    
    useEffect(() => {
        dispatch(setLoadingMessageContainer(true))
        const fetchMessages=async ()=>{
            try {
                const res=await axios.get(`http://localhost:3000/api/v1/message/${selectedUser?._id}`)  
    
                // console.log(res.data.messages)          
                dispatch(setMessages(res.data.messages))  
                console.log(res.data)
                if(res){
                    dispatch(setLoadingMessageContainer(false))
                }
            } catch (error) {
                dispatch(setLoadingMessageContainer(false))
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