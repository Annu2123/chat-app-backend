const express=require('express')
const userRouter=express.Router()
const messageCntrl=require('../../app/controllers/messageController')
const userCntrl=require('../../app/controllers/userController')
const { authencateUser } = require('../../app/middlewares/auth')
userRouter.get('/getSideBarUser',authencateUser,userCntrl.getSideBarUser)
module.exports=userRouter