const { Server }=require("socket.io")
const http=require("http")
const express=require('express')

const app=express()
const server=http.createServer(app)
// const io=new Server(server,{
//     cors:{
//         origin:['http://localhost:5173' , 'http://localhost:5174'],
//         methods:['GET','POST'],
//     }
// })
const io=new Server(server,{cors:{}});
const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap={}  //{userid:socketId}
io.on('connection',(socket)=>{
    console.log('user connected...',socket.id)

    const userId=socket.handshake.query.userId
    if(userId!=undefined){
        userSocketMap[userId]=socket.id
    }
    // console.log(userSocketMap)

    io.emit('getOnlineUsers',Object.keys(userSocketMap))
    
    socket.on('disconnect',()=>{
        console.log('user disconnetcted',socket.id)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
        // console.log(userSocketMap)
    })
})  

module.exports= {
    app,
    io,
    server,
    getReceiverSocketId
}