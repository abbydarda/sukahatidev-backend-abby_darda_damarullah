const router = require('express').Router();

const registerRouter = require('./register.route');

router.use('/api', [registerRouter]);

module.exports = router;
