const express = require('express')
const PromptController = require('../controllers/PromptController')
const router = express.Router()

//get prompt
router.get('/prompts', PromptController.getAllPrompt);
router.get('/base-prompts', PromptController.getBasePrompt);

module.exports = router