const mongoose=require('mongoose')
const configDB=async()=>{
    try{
 const db= mongoose.connect('mongodb+srv://anubrath4994:VWvGrD2bBujI9bOi@cluster0.5ldp0fl.mongodb.net/')
 console.log('server connected successfull ')
    }catch(err){
        console.log(err)
    }
}
module.exports=configDB