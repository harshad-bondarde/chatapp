const mongoose=require('mongoose')
const messageModel=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
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

const Message=mongoose.model("Message", messageModel)
module.exports=Message