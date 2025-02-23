const Conversation = require("../models/conversationModel");
const GroupMessage=require("../models/groupMessageModel")
const cloudinary=require("cloudinary").v2
const {io , getReceiverSocketId}=require("../socket/socket")
const createGroup=async(req,res)=>{
    try {
        const {groupName}=req.body;
        const conversation=await Conversation.create({
            participants:[req.userId],
            groupInfo:{
                isGroup:true,
                groupName:groupName
            }
        })
        
        // const conversationInfo=conversation.populate("participants")
        return res.status(200).json({
            // conversationInfo
            groupName:groupName,
            conversationId:conversation._id 
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:"Error while creating group "+error.message
        })
    }
}


const getAllGroups=async(req,res)=>{
    const userId=req.userId;
    try{
        const groups=await Conversation.find({
            participants:{ $in: [userId] } ,
            "groupInfo.isGroup":true
        }).select("_id").select("groupInfo.groupName")
        // console.log(groups)
        const finalInfo=groups.map(group=>{
            return {
                groupName:group.groupInfo.groupName,
                conversationId:group._id
            }
        })
        return res.status(200).json({
            groups:finalInfo
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
}


const getGroupInfo=async(req,res)=>{
    try {
        const conversationId=req.params.conversationId
        
        // console.log(conversationId)
        
        const gotConversation=await Conversation.findById(conversationId).populate({
                                                                           path:"participants",
                                                                           select:"-contacts -password"                 
                                                                        }).populate("groupMessages")
        if(gotConversation){
            return res.status(200).json({
                conversationInfo:{
                    participants:gotConversation.participants,
                    groupMessages:gotConversation.groupMessages
                }
            })
        }else{
            return res.json(404).json({
                message:"conversation not found"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"error while getting conversation "+error.message
        })
    }
} 

const addParticipants=async(req,res)=>{
    try {
        const {conversationId,usersToAdd}=req.body;
        const gotConversation=await Conversation.findById(conversationId)
        if(!gotConversation){
            return res.status(404).json({
                message:"Couldn't get the conversation"
            })
        }
        gotConversation.participants=gotConversation.participants.concat(usersToAdd)
        await gotConversation.save()
        
        const updatedConversation=await Conversation.findById(conversationId).populate("participants").select("-password").select("-contacts")
        // console.log(updatedConversation.participants)
        return res.status(200).json({
            participantsInfo : updatedConversation.participants,
            message:"Users Added"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:"Error while adding user to group "+error.message
        })
    }
}

const RemoveUser=async(req,res)=>{
    try {
        const {conversationId,userToDelete}=req.body;
        const gotConversation=await Conversation.findById(conversationId)
        if(!gotConversation){
            return res.status(404).json({
                message:"Couldn't get the conversation"
            })
        }
        gotConversation=gotConversation.participants.filter(user=>user!=userToDelete)
        gotConversation.save()
        return res.status(200).json({
            conversationInfo:gotConversation,
            message:"User Removed"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:"Error while adding user to group "+error.message
        })
    }
}

const sendGroupMessage=async(req,res)=>{
    const userId=req.userId; 
    const {conversationId , message , image , senderId}=req.body;
    try {
        const gotConversation=await Conversation.findById(conversationId)
        if(!gotConversation){
            res.status(404).json({
                message:"Conversation not found"
            })
            return;
        }
        console.log(gotConversation.participants)

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
        
        const newGroupMessage=await GroupMessage.create({
            conversationId,
            senderId,
            message,
            image:cloudinaryRes?.secure_url ? cloudinaryRes.secure_url : ""
        })

        if(newGroupMessage){
            // console.log("sent")
            gotConversation.groupMessages.push(newGroupMessage._id)
            await gotConversation.save()
        }
        const participants=gotConversation.participants
        if(newGroupMessage){
            participants.forEach(user => {
                if(user!=senderId){ 
                    const receiverSocketId=getReceiverSocketId(user);
                    receiverSocketId && io.to(receiverSocketId).emit('newGroupMessage',newGroupMessage)
                }        
            });
        }
        return res.status(200).json({
            message:newGroupMessage
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:"error while sending message "+error.message
        })
    }
}

const deleteGroupMessage=async(req,res)=>{
    const {groupMessage , authUserId}=req.body
    try {
        const conversation=await Conversation.findById(groupMessage.conversationId)
        if(!conversation){
            return res.status(404).json({
                message:"Conversation not found"
            })
        }
        conversation.groupMessages=conversation.groupMessages.filter(message=>message._id!=groupMessage._id)
        await conversation.save()
        const deletedMessage=await GroupMessage.findByIdAndDelete(groupMessage._id)
        console.log(deletedMessage)
        if(deletedMessage){
            conversation.participants.forEach(user => {
                if(user!=authUserId){
                    const receiverSocketId=getReceiverSocketId(user)
                    receiverSocketId && io.to(receiverSocketId).emit('deleteGroupMessage',groupMessage)
                }
            });
            return res.status(200).json({
                message:"Message Deleted"
            })  
        }
        return res.status(404).json({
            message:"Message not found"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:"error while deleting message "+error.message
        })
    }
}



module.exports={
    createGroup,
    RemoveUser,
    getGroupInfo,
    getAllGroups,
    sendGroupMessage ,
    addParticipants ,
    deleteGroupMessage
}


