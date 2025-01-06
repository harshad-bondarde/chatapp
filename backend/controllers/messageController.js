const Conversation = require("../models/conversationModel");
const Message=require('../models/messageModel')
const User=require('../models/userModel')
const {io,getReceiverSocketId}=require('../socket/socket')
const dotenv=require("dotenv")
const cloudinary=require("cloudinary").v2

const sendMessage=async(req,res)=>{
    try {
        const senderId=req.userId;
        const receiverId=req.params.id;
        const { message , image }=req.body;
        console.log(message)
        let gotConversation=await Conversation.findOne({
            participants:{
                $all :[senderId,receiverId]
            }
        })
        
        if(!gotConversation){
            gotConversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        let cloudinaryRes=null
        if(image!=""){
            cloudinary.config({
                cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
                api_key:process.env.CLOUDINARY_API_KEY,
                api_secret:process.env.CLOUDINARY_API_SECRET
            })
            cloudinaryRes=await cloudinary.uploader.upload(image,{folder:"chatapp"})
        }

        const newMessage=await Message.create({
            senderId,
            receiverId,
            message,
            image:cloudinaryRes?.secure_url ? cloudinaryRes.secure_url : ""
        })
        console.log(newMessage)
        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }
        
        // await gotConversation.save();
        await Promise.all([gotConversation.save(),newMessage.save()])

       if(newMessage){
            const receiverSocketId=getReceiverSocketId(receiverId)
            if(receiverSocketId){
                io.to(receiverSocketId).emit('newMessage',newMessage)
                console.log("event triggered")
            }
            
       }

        return res.status(200).json({
            newMessage
        })
    } catch (error) {
        console.log(error)
    }
}

const getMessage=async (req,res)=>{
    try {
        const receiverId=req.params.id
        const senderId=req.userId
        const conversation=await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            }
        }).populate("messages")
        // console.log(conversation.messages)
        console.log("hi")
        return res.status(200).json({
            messages:!conversation?.messages ? [] : conversation.messages
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error
        })
    }
}

const deleteMessage=async (req,res)=>{
    const { messageId }=req.body;
    const senderId=req.userId
    const receiverId=req.params.id
    const conversation=await Conversation.findOne({
        participants:{
            $all:[senderId,receiverId]
        }
    })
    if(!conversation){
        return res.status(404).json({
            message:"Conversation doesn't exists"
        })
    }
    
    const messageIndex=conversation.messages.indexOf(messageId)
    if(!messageIndex){
        return res.status(404).json({
            message:"Message not found..."
        })
    }
    conversation.messages.splice(messageIndex,1);
    await conversation.save();
    // in progress ....
    if(messageIndex){
        const receiverSocketId=getReceiverSocketId(receiverId)
        io.to(receiverSocketId).emit('deleteMessageInConversation',{ senderId , messageId })
    }

    return res.status(200).json({
        message:"Message Deleted"
    })
}

module.exports={
    sendMessage,
    getMessage ,
    deleteMessage
}