const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {User} = require('./User')
 const DashboardSchema = new mongoose.Schema({
    UserId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:User
    },
    title:{
        type:String,
        required:true,
    },
    category:{
       type:String,
       required:true
    },
    status:{
        type:String,
        required:true
    }

 })
 const Dashboard = mongoose.model('Dashboard',DashboardSchema)
 module.exports = {Dashboard:Dashboard}