require('dotenv').config();
const connectDB = require("../config/db");
const {User} = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET


exports.signup = async(req,res)=>{
    try{
        console.log("beforeconnection")
        await connectDB()
        console.log("DB connected")
    const {name,email,password} = req.body; 
    console.log("got details")   
    console.log("got info")
   
    console.log("db connected")
    const response = await User.findOne({
        email:email
    })
    console.log("got response")
    if(!response){
        const hash_password = await bcrypt.hash(password,10)
       await User.create({
        name:name,
        email:email,
        password: hash_password

       })
       console.log("password hashed")
       return res.status(200).json({
        message:"user registered now signin"
       })
       
    }
    else{
        return res.status(400).json({
            message:"user already found"
        })
    }

    }
    catch(error){
       return res.status(500).json({message:"there is some internam error"})
    }

};
exports.signin = async(req,res)=>{
    try{
      await connectDB()
    const{email,password} = req.body
    const response = await User.findOne({
        email:email
    })
    if(!response){
        return res.status(400).json({
            message:"user not found please enter correct email or password"
        })
    }
    else{
        const hash_response = await bcrypt.compare(password,response.password)
        if(!hash_response){
            return res.status(400).json({
                message:"please enter correct password"
            })
        }
        else{
            const token = jwt.sign({
                email:email
            },JWT_SECRET)
            return res.status(200).json({token:token},
                {
                message:"signed in successfully"
            })
        }
    }
    }
    catch(error){

    }
}

