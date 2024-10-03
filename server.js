 require('dotenv').config()
const express=require('express')
const cors=require('cors')
const port=3002
const app=express()
const authRoutes=require('./routers/userRoutes/userAuth')
const messageRoutes=require('./routers/messageroutes')
const userRouter=require('./routers/userRoutes/userRoutes')

app.use(express.json())
app.use(cors())
const configDB=require('./db/config')
const { checkSchema } = require('express-validator')
const { userValidation } = require('./app/validations/userValidation')
const userCntrl = require('./app/controllers/userController')
configDB()
 
app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)
app.use('/api',userRouter)

app.listen(port,()=>{
    console.log("server is runnig on port" , port)
})
