const Message=require('../models/messageModel')
const Conversation=require('../models/conversationModel')
const messageCntrl={}
messageCntrl.sendMessage=async (req,res)=>{
const body=req.body
const {message}=req.body
try{
    const {id:recieverId}=req.params
    const senderId=req.user.id
    let conversation =await Conversation.findOne({
        participants:{$all:[senderId,recieverId]}
    })
    if(!conversation){
        conversation=await Conversation.create({
     participants:[senderId,recieverId],
        })
    }
    const newMessage=new Message({
    senderId:senderId,
    receiverId:recieverId,
    message:message
    })
    const savedMessage= await newMessage.save()
    if (newMessage){
        conversation.messages.push(savedMessage._id)
    }
    await conversation.save()
    //optimisation
    //await Promise.all([conversation.save(),newMessage.save()])
res.status(200).json(savedMessage)
    
}catch(err){
    return res.status(500).json({errors:"internal server error"})
}
}

messageCntrl.getMessage=async (req,res)=>{
   try{
    const {id:userToChatId}=req.params
    const senderId=req.user.id
    const conversation=await Conversation.findOne({
        participants:{$all:[senderId,userToChatId]},
    }).populate("messages")
       if(!conversation){
        return res.status(404).json([])
       }
       res.status(200).json(conversation.messages)
   }catch(err){
    res.status(500).json({errors:"internal serve error"})
   }
}
module.exports=messageCntrl