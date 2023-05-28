const { cabangController } = require('../controllers');

const router = require('express').Router();

router.get(
 '/cabang/pelanggan/:no_telp',
 [],
 cabangController.getCabangByPhoneNumber
);

module.exports = router;
