const { pesananController } = require('../controllers');
const {
 validationMid: {
  orderValidation,
  cancelOrderValidation,
  UpdateStatusOrderValidation,
  validate,
 },
} = require('../middlewares');

const router = require('express').Router();

router.post(
 '/order',
 [orderValidation(), validate],
 pesananController.orderProduct
);

router.post(
 '/order/cancel',
 [cancelOrderValidation(), validate],
 pesananController.cancelOrder
);

router.put(
 '/marketing/order/:id_pesanan',
 [UpdateStatusOrderValidation(), validate],
 pesananController.updateStatusOrder
);

module.exports = router;
