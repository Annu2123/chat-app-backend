const {Schema,model, default: mongoose}=require('mongoose')
const messageSchema=new Schema ({
     senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
     },
     message:String
},{timestamps:true})
const Message=model("Message",messageSchema)
module.exports=Message