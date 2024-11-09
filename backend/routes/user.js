const express=require("express")
const routes=express.Router()
const { register , login ,logout , getOtherUsers }=require("../controllers/userControllers")
const isAuthenticated = require("../middleware/isAuthenticated")

routes.post("/register",register)
routes.post("/login",login)
routes.get("/logout",logout)
routes.get("/",isAuthenticated,getOtherUsers)

routes.get("/",(req,res)=>{
    console.log("hi")
})
module.exports=routes