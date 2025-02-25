import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingMessageContainer } from '../Redux/messageSlice'
import { setSelctedGroupInfo } from '../Redux/userSlice'
import axios from "axios"
import toast from 'react-hot-toast'
import url from '../url/url'

const useGetGroupMessages = () => {
    const {selectedGroup}=useSelector(state=>state.user)
    const dispatch=useDispatch()

    useEffect(()=>{
        if(!selectedGroup)  return;
        dispatch(setLoadingMessageContainer(true))
        const getMessages=async()=>{
            try {
                const response=await axios.get(`${url}/api/v1/group/getGroupInfo/${selectedGroup.conversationId}`)
                console.log(response)
                if(response.status==200){
                    dispatch(setSelctedGroupInfo(response.data.conversationInfo))
                }else{
                    toast.error("Error while getting Group Info")
                }
                
            } catch (error) {
                console.log(error)
                toast.error("Error while getting Group Info")
            }finally{
                dispatch(setLoadingMessageContainer(false))
            }
        }
        getMessages()

    },[selectedGroup])
    

    return (
        <div>
        
        </div>
    )
}

export default useGetGroupMessages
