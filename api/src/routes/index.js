const router = require('express').Router();

const registerRouter = require('./register.route');
const cabangRouter = require('./cabang.route');
const pesananRouter = require('./pesanan.route');

router.use('/api', [registerRouter, cabangRouter, pesananRouter]);

module.exports = router;
