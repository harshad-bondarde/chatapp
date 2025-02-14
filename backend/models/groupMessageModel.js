const mongoose=require('mongoose')
const GroupMessageModel=new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
    },
    image:{
        type:String
    }
},{
    timestamps:true
})

const Message=mongoose.model("GroupMessage", GroupMessageModel)
module.exports=Message
