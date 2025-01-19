import { BrowserRouter, Routes , Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import SigunUp from './components/SigunUp'
import Login from './components/Login'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { io  } from "socket.io-client"
import { setOnlineUsers } from './Redux/userSlice'  


function App() {
  axios.defaults.withCredentials=true
  
  const {authUser}=useSelector(state=>state.user)
  // console.log(authUser)

  const dispatch=useDispatch();



  // useEffect(()=>{
  //   if(authUser){
  //       const socket=io('http://localhost:3000',{  
  //          query:{
  //           userId:authUser._id
  //          } 
  //       }) 
  //       dispatch(setSocket(socket)) 
        
  //       socket.on('getOnlineUsers',(onlineUsers)=>{
  //         dispatch(setOnlineUsers(onlineUsers))
  //       })
  //       console.log(socket) 
        
  //       return ()=>socket.close()
  //   }
  //   else{
  //     if(socket){
  //       socket.close();
  //       dispatch(setSocket(null))
  //     }
  //   }
  // },[authUser]) //wrote in context 
  
  
  return (
    <>
      <div className='p-4 h-screen flex justify-center items-center'>
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/register' element={<SigunUp/>}/>
            <Route path='/' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

