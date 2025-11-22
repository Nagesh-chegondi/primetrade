const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true


    },
    password:{
        type:String,
        required:true
    }
})

const Usermodel =  mongoose.model('User',UserSchema)
module.exports = {
    User:Usermodel
}