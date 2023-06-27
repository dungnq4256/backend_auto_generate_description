const express = require('express')
const StatisticalController = require('../controllers/StatisticalController')
const router = express.Router()

//get statistic
router.get('/statistics', StatisticalController.getStatistical);

module.exports = router