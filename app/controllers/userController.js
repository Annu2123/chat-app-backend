const { validationResult } = require("express-validator")
const User=require("../models/userModel")
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { response } = require("express")
const userCntrl={}
userCntrl.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
    const body=req.body
    const user=new User(body)
    const salt=await bcryptjs.genSalt()
    const hashedPassword= await bcryptjs.hash(user.password,salt)
    user.password=hashedPassword
    console.log("before save")
    const boyAvatar=`https://avatar.iran.liara.run/public/boy?username=${user.userName}`
    const girlAvatar=`https://avatar.iran.liara.run/public/girl?username=${user.userName}`
    if(user.gender == "male"){
        user.profilePicture=boyAvatar
    }else{
        user.profilePicture=girlAvatar
    }
    await user.save()
    return res.status(200).json(user)

    }catch(err){
        return res.status(500).json({errors:"internaal server error"})
    }
}
userCntrl.login=async (req,res)=>{
    const body=req.body
    try{
        const user=await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({errors:"email or password is wrong"})
        }
        const comparePassword=await bcryptjs.compare(body.password,user.password)
        if(!comparePassword){
            return res.status(404).json({errors:"password or email is wrong"})
        }
      const tokenData={
        id:user._id
      }
      const token =await jwt.sign(tokenData,process.env.SECRET_JWT,{expiresIn:'15d'})
     // user.token=token
      console.log(user)
      return res.status(202).json({user,token})

    }catch(err){
        console.log(err)
       return res.status(500).json({errors:"internal server error"})
    }
}

userCntrl.getSideBarUser=async(req,res)=>{
    try{
  const userId=req.user.id
  const allUser=await User.find({_id:{$ne:userId}}).select("-password")
  res.status(200).json(allUser)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"internal servr error"})
    }
}
module.exports=userCntrl
