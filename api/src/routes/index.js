const router = require('express').Router();

const registerRouter = require('./register.route');
const cabangRouter = require('./cabang.route');
const pesananRouter = require('./pesanan.route');
const pelangganRouter = require('./pelanggan.route');

router.use('/api', [
 registerRouter,
 cabangRouter,
 pesananRouter,
 pelangganRouter,
]);

module.exports = router;
