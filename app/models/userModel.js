const mongoose=require('mongoose')
const {Schema,model}=require('mongoose')
const userSchema=new Schema({
    userName:String,
    email:String,
    password:String,
    gender:{
        type:String,
        default:null
    },
    profilePicture:{
        type:String,
        default:null
    }
},{timestamps:true})
const User=model('User',userSchema)
module.exports=User