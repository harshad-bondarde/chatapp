const mongoose=require('mongoose')
const conversationModel=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"        
    }],
    groupInfo:{
        isGroup:{
            type:Boolean,
            default:false
        },
        groupName:{
            type:String,
            default:null
        }
    }
},{
    timestamps:true
})

const Conversation=mongoose.model("Conversation",conversationModel)
module.exports=Conversation