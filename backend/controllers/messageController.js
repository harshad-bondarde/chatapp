const Conversation = require("../models/conversationModel");
const Message=require('../models/messageModel')
const User=require('../models/userModel')
const {io,getReceiverSocketId}=require('../socket/socket')
const dotenv=require("dotenv")
const cloudinary=require("cloudinary").v2

const sendMessage=async(req,res)=>{
    try {
        const senderId=req.body.authUser._id;
        const receiverId=req.params.id;
        const { message , image }=req.body;
        // console.log(message)
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
            if(image!="")
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
    const { message ,authUser}=req.body;
    const senderId=message.senderId
    const receiverId=message.receiverId
    try{    
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
        
        const messageIndex=conversation.messages.indexOf(message._id)
        if(!messageIndex){
            return res.status(404).json({
                message:"Message not found..."
            })
        }
        // console.log(conversation.messages)
        conversation.messages.splice(messageIndex,1);
        await conversation.save();
        const deletedMessage=await Message.findByIdAndDelete(message._id)
        // in progress ....
        if(messageIndex){
            let anotherUserId=null;
            if(authUser._id==senderId){
                anotherUserId=receiverId
            }else{
                anotherUserId=senderId
            }
            const anotherUserSocketId=getReceiverSocketId(anotherUserId)
            console.log("sending to ",anotherUserId)
            io.to(anotherUserSocketId).emit('deleteMessageInConversation',{ senderId , receiverId ,  messageId:message._id })
        }

        return res.status(200).json({
            message:"Message Deleted"
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            error:"Error while deleting message "+error.message
        })  
    }

}

module.exports={
    sendMessage,
    getMessage ,
    deleteMessage
}