const User=require("../models/userModel")
const userValidation={
    userName:{
        notEmpty:{
            errorMessage:"username is require"
        },
        isLength:{
            options:{min:2,max:30},
            errorMessage:"username minimum length should be 2 and maximum should be 30"
        }
    },
    email:{
        isEmail:{
            errorMessage:"should be email formt"
        },
        notEmpty:{
            errorMessage:"email is required "
        },
        custom:{
            options: async function (value){
             const user =await User.findOne({email:value})
             if(!user){
                return true
             }else{
                throw new Error ("email already exist please new email")
             }
            }
        }
    },
    password:{
        notEmpty:{
            errorMessage:"password is required"
        },
        isLength:{
            options:{min:8,max:20},
            errorMessage:"password length should 8 maxumum should be 20"
        }
    }
}
module.exports={userValidation}