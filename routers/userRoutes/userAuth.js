const { checkSchema } = require('express-validator')
const express=require('express')
const {authentiCateUser}=require('../../app/middlewares/auth')
const router = express.Router();
const {userValidation}=require('../../app/validations/userValidation')
const {authencateUser}=require('../../app/middlewares/auth')

//controllers
const userCntrl=require('../../app/controllers/userController')
const messageCntrl=require('../../app/controllers/messageController')
console.log("routes")
router.post("/user-register",checkSchema(userValidation),userCntrl.register)
router.post('/user-login',userCntrl.login)

module.exports=router