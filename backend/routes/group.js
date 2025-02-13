const express=require('express')
const router=express.Router()
const isAuthenticated=require('../middleware/isAuthenticated')
const { getAllGroups, createGroup, getGroupInfo }=require('../controllers/groupController')
 
router.get('/getAllGroups',isAuthenticated,getAllGroups)
router.post('/createGroup',isAuthenticated,createGroup)
router.get('/getGroupInfo/:conversationId',isAuthenticated,getGroupInfo)


module.exports=router