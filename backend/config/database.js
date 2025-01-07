const mongoose=require('mongoose')
const connectDB=async()=>{
    console.log("1")
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('database connected...')
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports=connectDB