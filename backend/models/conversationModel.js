const mongoose=require('mongoose')
const conversationModel=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
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
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"        
    }],
    groupMessages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GroupMessage"
    }]
},{
    timestamps:true
})

const Conversation=mongoose.model("Conversation",conversationModel)
module.exports=Conversation