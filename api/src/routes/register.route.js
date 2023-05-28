const { registerController } = require('../controllers');
const {
 validationMid: { registerValidation, validate },
} = require('../middlewares');

const router = require('express').Router();

router.post(
 '/register',
 [registerValidation(), validate],
 registerController.execute
);

module.exports = router;
