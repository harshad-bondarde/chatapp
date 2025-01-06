const mongoose=require('mongoose')
const userModel=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        anum:['male','female'],
        required:true
    },
    contacts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"        
    }]
},{
    timestamps:true
})

const User=mongoose.model('User',userModel)
module.exports=User