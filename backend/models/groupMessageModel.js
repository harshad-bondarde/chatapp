const mongoose=require('mongoose')
const GroupMessageModel=new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
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

const Message=mongoose.model("Message", GroupMessageModel)
module.exports=Message