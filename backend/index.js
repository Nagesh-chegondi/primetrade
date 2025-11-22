require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = 5000
const cors = require('cors')
const jwt = require('jsonwebtoken') 
const authRoutes = require('./Routes/authRoutes')
const dashboard = require('./Routes/dashboardRoutes')
const userinfo = require('./Routes/userinfo')



 app.use(cors())
app.use(express.json()) 
 
app.use('/auth',authRoutes)
app.use('/info', dashboard)
app.use('/user',userinfo)


app.listen(5000,()=>{
    console.log("server running")
})