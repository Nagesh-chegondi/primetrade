require('dotenv').config();
const connectDB = require("../config/db");
const {User} = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
exports.userdata = async(req,res)=>{
    try{
     console.log("dashboard");

    const token = req.headers.token;
    console.log("Token:", token);

    await connectDB();
    console.log("DB Connected");

    const verify_token = jwt.verify(token, JWT_SECRET);
    console.log("Token Verified");
    console.log(verify_token)

    const user = await User.findOne({ email: verify_token.email });
    console.log("User Fetched");
    console.log(user)
    if(user){
        return res.status(200).json({data:user})
    }
    else{
        return res.status(400).json({message:"user not found"})
    }
    }
    catch(error){
   return res.status(500).json({message:"some internal error"})
    }
}