const express=require("express")
const routes=express.Router()
const { register , login ,logout , getOtherUsers, getContacts, deleteFromContacts }=require("../controllers/userControllers")
const isAuthenticated = require("../middleware/isAuthenticated")
const { addToContacts } = require("../controllers/userControllers")

routes.post("/register",register)
routes.post("/login",login)
routes.get("/logout",logout)
routes.get("/",isAuthenticated,getOtherUsers)
routes.post("/addToContact",isAuthenticated,addToContacts)
routes.get("/getContacts",isAuthenticated,getContacts)
routes.post("/deleteFromContacts",isAuthenticated,deleteFromContacts)

routes.get("/",(req,res)=>{
    console.log("hi")
})
module.exports=routes