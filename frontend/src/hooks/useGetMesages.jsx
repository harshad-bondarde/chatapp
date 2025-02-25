import React, { useEffect } from 'react'
import axios from "axios"
import  { useDispatch, useSelector }  from 'react-redux'
import { setMessages } from '../Redux/messageSlice'
import { setLoadingMessageContainer } from '../Redux/messageSlice'
import url from '../url/url'
const useGetMessages = () => { 

    const {selectedUser}=useSelector(state=>state.user)

    const dispatch=useDispatch()
    
    useEffect(() => {
        dispatch(setLoadingMessageContainer(true))
        const fetchMessages=async ()=>{
            if(!selectedUser)
                return
        
            try {
                const res=await axios.get(`${url}/api/v1/message/${selectedUser?._id}`)  
    
                // console.log(res.data)          
                dispatch(setMessages(res.data.messages))  
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
