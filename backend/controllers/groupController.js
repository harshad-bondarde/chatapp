const Conversation = require("../models/conversationModel");

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
            participants:[userId]
        }).select("_id").select("groupInfo.groupName")
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
        const { conversationId }=req.body
        const gotConversation=Conversation.findById({conversationId})
        if(gotConversation){
            return res.status(200).json({
                conversationInfo:gotConversation
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

const addUserToGroup=async(req,res)=>{
    try {
        const {conversationId,userToAdd}=req.body;
        const gotConversation=await Conversation.findById({conversationId})
        if(!gotConversation){
            return res.status(404).json({
                message:"Couldn't get the conversation"
            })
        }
        gotConversation.participants.push(userToAdd)
        gotConversation.save()
        return res.status(200).json({
            conversationInfo:gotConversation,
            message:"User Added"
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
        const gotConversation=await Conversation.findById({conversationId})
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

module.exports={
    createGroup,
    addUserToGroup,
    RemoveUser,
    getGroupInfo,
    getAllGroups
}


