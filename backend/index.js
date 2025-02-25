const express=require('express')
// const app=express()
const {server ,app}=require('./socket/socket')
const cors=require('cors')

const mainRoutes= require('./routes/index.js')
const dotenv=require('dotenv')
const cookiePareser=require("cookie-parser")
const connectDB=require('./config/database.js')
const path=require("path")

const dir=path.resolve() //get path for root directory
dotenv.config({})
const PORT= process.env.PORT || 3000

const corsOptions = {
    // origin: ['http://localhost:3000', 'http://localhost:5173' , 'http://localhost:5174'],
    origin:true,
    credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json({ limit:'10mb' }))
app.use(cookiePareser())

app.use("/api/v1",mainRoutes)
if(process.env.MODE=='production'){
    app.use(express.static(path.join(dir,"/frontend/dist")))
}
app.get("*",(req,res)=>{
    res.sendFile(path.join(dir,"frontend","dist","index.html"))
})

server.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running at ${PORT}`)
})