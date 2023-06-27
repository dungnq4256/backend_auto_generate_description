const express = require('express')
const GenerateController = require('../controllers/GenerateController')
const router = express.Router()

//connect OpenAI
router.post('/generate', GenerateController.connectOpenAI);

module.exports = router