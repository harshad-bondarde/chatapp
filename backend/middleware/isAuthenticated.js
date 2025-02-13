const jwt=require("jsonwebtoken")

const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        // console.log(req)
        if(!token){
            return res.status(401).json({
                message:"User not logged in"
            })
        }

        const decode=await jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }
        
        req.userId=decode.userId
        // console.log(req.userId)
        next()

    } catch (error) {
        console.log(error)
    }
}

module.exports=isAuthenticated
