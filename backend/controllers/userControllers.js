const User=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")

const register=async(req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender}=req.body;

        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        if(password != confirmPassword){
            return res.status(400).json({
                message:"Password does not match"
            })
        }

        const user=await User.findOne({
            username
        })
        if(user){
            return res.json(400).json({
                message:"Username already exists"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10)
        
        const maleProfilePhoto=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePhoto=`https://avatar.iran.liara.run/public/girl?username=${username}`
        
        await User.create({
            fullName,
            username,
            password:hashedPassword,
            profilePhoto:gender=='male'?maleProfilePhoto:femaleProfilePhoto,
            gender,
        })

        return res.status(201).json({
            message:"Account created Successfully",
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}


const login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        
        const user=await User.findOne({username})
        if(!user){
            return res.status(400).json({
                message:"Incorrect Username or Password",
                success:false
            })
        }
        
        const isPassowrdMatched=await bcrypt.compare(password,user.password)
        if(!isPassowrdMatched){
            return res.status(400).json({
                message:"Incorrect Username or Password",
                success:false
            })
        }

        const token=await jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET_KEY,{expiresIn:'1d'})

        return res.status(200).cookie("token",token,
                                      {
                                        maxAge:1*24*60*60*1000,
                                        httpOnly:true,
                                      })
                                    .json({
                                        _id:user._id,
                                        username:user.username,
                                        fullName:user.fullName,
                                        profilePhoto:user.profilePhoto
                                    })

    } catch (error) {
        console.log(error)   
    }
}

const logout=(req,res)=>{
    
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged out successfully"
        })
}

const getOtherUsers=async(req,res)=>{
    try {
        const loggedInUserId=req.userId;
        const otherUsers=await User.find(
            {
                _id:{
                    $ne:loggedInUserId
                }
            }
        ).select("-contacts").select("-password")

        return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        })
    }
}



const addToContacts=async(req,res)=>{
    const senderId=req.userId
    const { userToAdd }=req.body
    try {
        const user=await User.findById(senderId)
        user.contacts.push(userToAdd._id)
        await user.save()
        const returnUser=await User.findById(userToAdd._id).select("-password").select("-contacts")
        return res.status(200).json({
            returnUser,
            message:"User added to Contacts"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Error while Adding to Contacts"
        })
    }    
}

const deleteFromContacts=async(req,res)=>{
    const userId=req.userId
    const { userToDelete }=req.body;
    try {
        const user=await User.findById(userId)
        user.contacts=user.contacts.filter(user=>user._id!=userToDelete._id)
        await user.save()
        return res.status(200).json({
            message:"user deleted"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Error while Removing from Contacts"
        })    
    }
}   
const getContacts=async(req,res)=>{
    const userId=req.userId;
    try {
        const user=await User.findById(userId)
        const contactUsers=user.contacts
        const contactUsersInfo=await User.find({
            _id:{
                $in:contactUsers
            }
        }).select("-password").select("-contacts")
        return res.status(200).json({
            contactUsersInfo
        })
    } catch (error) {
        console.log(error)
        return res.json(500).json({
            message:"Error while getting contacts "+error
        })
        
    }

}

module.exports={
    register,
    login,
    logout,
    getOtherUsers,
    addToContacts,
    getContacts,
    deleteFromContacts
}