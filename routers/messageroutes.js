const {checkSchema}=require("express-validator")
const messageCntrl=require('../app/controllers/messageController')
const express=require('express')
const Messagerouter=express.Router()
const {authencateUser}=require('../app/middlewares/auth')
Messagerouter.post('/send/:id',authencateUser,messageCntrl.sendMessage)
Messagerouter.get("/getMessage/:id",authencateUser,messageCntrl.getMessage)
module.exports=Messagerouter