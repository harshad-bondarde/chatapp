const Conversation = require("../models/conversationModel");
const Message=require('../models/messageModel')
const {io,getReceiverSocketId}=require('../socket/socket')
const sendMessage=async(req,res)=>{
    try {
        const senderId=req.userId;
        const receiverId=req.params.id;
        const { message }=req.body;
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

        const newMessage=await Message.create({
            senderId,
            receiverId,
            message
        })

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
            messages:conversation?.messages
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
            message:"conversation doesn't exists"
        })
    }
    
    const messageIndex=conversation.messages.indexOf(messageId)
    if(!messageIndex){
        return res.status(404).json({
            message:"message not found..."
        })
    }
    conversation.messages.splice(messageIndex,1);
    conversation.save();

    return res.status(200).json({
        message:"message deleted"
    })
}

module.exports={
    sendMessage,
    getMessage ,
    deleteMessage ,
}