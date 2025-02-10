const express=require('express')
const router=express.Router()
const isAuthenticated=require('../middleware/isAuthenticated')
const { getAllGroups }=require('../controllers/groupController')
 
router.get('/getAllGroups',isAuthenticated,getAllGroups)


module.exports=router