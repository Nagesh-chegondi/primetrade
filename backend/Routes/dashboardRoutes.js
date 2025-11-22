const express = require('express')
const DashboardInfo = require('../models/DashboardInfo')
const {dashboardinfo} = require('../Controllers/dashboardinfo')
const {dashboarddata} = require('../Controllers/dashboardinfo')
const {dashboarddelete} = require('../Controllers/dashboardinfo')
const{dashboardupdate} = require('../Controllers/dashboardinfo')
const router = express.Router()


router.post('/dashboard',dashboardinfo)
router.post('/dashboarddata',dashboarddata)
router.delete('/dashboarddelete',dashboarddelete)
router.put('/dashboardupdate',dashboardupdate)
module.exports = router