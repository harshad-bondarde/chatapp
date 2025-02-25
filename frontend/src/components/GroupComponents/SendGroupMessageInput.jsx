import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { BsFillImageFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { addNewGroupMessage } from '../../Redux/userSlice';
import url from '../../url/url'

const SendGroupMessageInput = () => {
  const dispatch=useDispatch()
  const [ message,setMessage]=useState("") 
  const [image,setImage]=useState("")
  const [loading,setLoading]=useState(false)
  const {selectedGroup , selectedGroupInfo , authUser}=useSelector(state=>state.user)
  const messages=selectedGroupInfo?.groupMessages

  const handleImageChange=(e)=>{
    e.preventDefault()
    const file=e.target.files[0]
    if(file){
        const reader=new FileReader()
        reader.onloadend=()=>{
            setImage(reader.result)
        }
        reader.readAsDataURL(file)
    }
  }

  useEffect(()=>{
          setImage("")
          setMessage("")
  },[selectedGroup])

  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    if(message=="" && image==""){
      toast.error("Enter valid message")
      return;
    }

    try {
      setLoading(true)
      console.log("HIasd")
      const response=await axios.post(`${url}/api/v1/group/sendGroupMessage`,{
        conversationId:selectedGroup.conversationId,
        message,
        image,
        senderId:authUser._id
      })
      console.log(response)
      dispatch(addNewGroupMessage(response.data.message))

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ||"Error while sending Message")
    }finally{
      setLoading(false)
      setMessage("")
      setImage("")
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
                    
                    { 
                        <div>
                            {!image ?
                                <div>
                                    <input type="file" id="image" accept='image/*' disabled={loading} className='hidden' onChange={handleImageChange}/>
                                    <label 
                                        htmlFor='image'
                                        className='absolute flex inset-y-0 end-0 items-center pr-14 cursor-pointer'>
                                        <BsFillImageFill/>
                                    </label>
                                </div>
                                :
                                <div>
                                    <img src={image} className='object-cover h-9 w-9 absolute flex inset-y-1 end-12 items-center pr-1 '>
                                    </img>
                                    <MdOutlineCancel onClick={()=>setImage(null)} className='absolute text-red-600 flex inset-y-0 h-6 w-6 end-10 items-center pr-1 bottom-5 cursor-pointer'/>
                                </div>
                            }
                        </div>
                    }
    
                    <button disabled={loading} type='submit' className='absolute flex inset-y-0 end-0 items-center pr-5'>
                        {   !loading ?
                                <div className='flex gap-2'>
                                    {  
                                        <IoSend />
                                    }        
                                </div>
                                :
                            <span className="loading loading-spinner loading-xs"></span>  
                        }
                    </button>
                </div>
            </form>
  )
}

export default SendGroupMessageInput
