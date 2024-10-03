const jwt=require('jsonwebtoken')
const authencateUser=async (req,res,next)=>{
    const token=req.headers['authorization']
    if(!token){
        return res.status(401).json({errors:"token is require"})
    }
    try{
        const tokenData=jwt.verify(token,process.env.SECRET_JWT)
        req.user={
            id:tokenData.id
        }
        next()

    }catch(err){
      return res.status(500).json({errors:"internal server error token not matched"})
    }

}
module.exports={authencateUser}