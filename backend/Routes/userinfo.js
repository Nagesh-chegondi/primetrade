const express = require('express')
const router = express.Router()
const {userdata} = require('../Controllers/userdata')
router.get('/info',userdata)
module.exports = router