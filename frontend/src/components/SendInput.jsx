import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../Redux/messageSlice';

const SendInput = () => {
    const dispatch=useDispatch()
    const [ message,setMessage]=useState("") 
    const { selectedUser }=useSelector(state=>state.user)
    const { messages } =useSelector(state=>state.message)
    // console.log(messages )

    const onSubmitHandler=async (e)=>{
        e.preventDefault()
        try {
            const res=await axios.post(`http://localhost:3000/api/v1/message/send/${selectedUser._id}`,{
                message
            },{
                timeout:10000
            })
            // console.log(res)
            dispatch(setMessages([...messages,res?.data?.newMessage]))
            setMessage("")
        } catch (error) {
            console.log(error) 
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    type="text"
                    className='border text-sm rounded-lg block p-3 border-zinc-500 w-full bg-gray-600 text-white'
                    placeholder='Send a message...' />
            
                <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-3'>
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput
