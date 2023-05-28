const { pelangganController } = require('../controllers');

const router = require('express').Router();

router.get('/marketing/customer', [], pelangganController.findAllPelanggan);

module.exports = router;
