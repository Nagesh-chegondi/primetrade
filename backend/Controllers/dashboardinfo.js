require('dotenv').config();
const connectDB = require("../config/db");
const {User} = require('../models/User');
const {Dashboard} = require('../models/DashboardInfo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.dashboardinfo = async (req, res) => {
  try {
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

    if (!user) {
      console.log("User NOT Found");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("Finding Dashboard Data...");
    console.log(user._id)
    const data = await Dashboard.find({ UserId: user._id });
    console.log(data)

    return res.status(200).json({ data:data });

  } catch (error) {
    console.error("Internal Error:", error);
    return res.status(500).json({ message: "Internal error" });
  }
};
exports.dashboarddata = async(req,res)=>{
    try{
       console.log("dashboard");

    const token = req.headers.token;
    console.log("Token:", token);

    const { title, category, status } = req.body;
    console.log("Body:", req.body);

    await connectDB();
    console.log("DB Connected");

    const verify_token = jwt.verify(token, JWT_SECRET);
    console.log("Token Verified");
    console.log(verify_token)

    const user = await User.findOne({ email: verify_token.email });
    console.log("User Fetched");
    console.log(user)

     if (!user) {
      console.log("User NOT Found");
      return res.status(400).json({ message: "User not found" });
    }
       const response = await Dashboard.create({
        UserId:user._id,
        title:title,
        category:category,
        status:status,

       }) 
       console.log("there is no response")
       if(response){
        return res.status(200).json({message:"data sent succesfully"})
       }
       return res.status(400).json({message:"not able to sent data"})

    }
    
    catch(error){
       return res.status(500).json({message:"some internal error"})
    }

}
exports.dashboarddelete = async(req,res)=>{
    try{
    const token = req.headers.token
    const {_id} = req.body
     await connectDB();
    console.log("DB Connected");

    const verify_token = jwt.verify(token, JWT_SECRET);
    console.log("Token Verified");
    console.log(verify_token)

    const user = await User.findOne({ email: verify_token.email });
    console.log("User Fetched");
     if (!user) {
      console.log("User NOT Found");
      return res.status(400).json({ message: "User not found" });
    }
    const response = await Dashboard.deleteOne({
        _id:_id
    })
    if(response){
        return res.status(200).json({
            message:"deleted succesfully"
        })
    }
    else{
        return res.status(400).json({
            message:"unable to delete"
        })
    }
}
catch(error){
    return res.status(500).json({
        message:"internal error"
    })
}

}
exports.dashboardupdate = async(req,res)=>{
  try{
    console.log("hi nitish")
     console.log("dashboard");

    const token = req.headers.token;
    console.log("Token:", token);

    const { _id,title, category, status } = req.body;
    console.log("Body:", req.body);

    await connectDB();
    console.log("DB Connected");

    const verify_token = jwt.verify(token, JWT_SECRET);
    console.log("Token Verified");
    console.log(verify_token)

    const user = await User.findOne({ email: verify_token.email });
    console.log("User Fetched");
    console.log(user)

     if (!user) {
      console.log("User NOT Found");
      return res.status(400).json({ message: "User not found" });
    }
    const exists = await Dashboard.findById(_id);
    if (!exists) {
      return res.status(404).json({ message: "Document not found" });
    }

    // update and return updated doc
    const updated = await Dashboard.findByIdAndUpdate(
      _id,
      { title, category, status },
      { new: true }
    );

    return res.status(200).json({
      message: "Updated successfully",
      data: updated
    });
  }
  catch(error){
   return res.status(500).json({message:"some internal message"})
  }
}
