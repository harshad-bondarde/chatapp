const express=require('express')
const routes=express.Router()
const user=require('./user')
const message=require('./message')

routes.use("/user",user)
routes.use("/message",message)

module.exports=routes 