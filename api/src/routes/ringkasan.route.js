const { ringkasanController } = require('../controllers');

const router = require('express').Router();

router.get('/marketing/summary', [], ringkasanController.summary);

module.exports = router;
