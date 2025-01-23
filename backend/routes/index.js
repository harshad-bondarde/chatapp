const express=require('express')
const routes=express.Router()
const user=require('./user')
const message=require('./message')
const group=require('./group') 

routes.use("/user",user)
routes.use("/message",message)
routes.use("/group",group)

module.exports=routes 