import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    number:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    accountType:{
        type:String,
        require:true
    },
    profileImage:{
        type:String,
        default:null
    },
    notification:Array
})

export const User  = model('users',userSchema)