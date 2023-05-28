const { body, validationResult } = require('express-validator');

const registerValidation = () => {
 return [
  body('nama_brand').notEmpty().withMessage('Nama brand harus diisi'),
  body('jenis_usaha').notEmpty().withMessage('Jenis usaha harus diisi'),
  body('no_telp')
   .notEmpty()
   .withMessage('Nomor telepon harus diisi')
   .matches(/^62\d{9,13}$/)
   .withMessage(
    'Nomor telepon harus diawali dengan 62 dan memiliki panjang 10-14 digit'
   ),
  body('cabang').isArray({ min: 1 }).withMessage('Cabang harus diisi'),
  body('cabang.*.nama_cabang')
   .notEmpty()
   .withMessage('Nama cabang harus diisi'),
  body('cabang.*.kota').notEmpty().withMessage('Kota harus diisi'),
  body('cabang.*.kebutuhan_produk')
   .isArray({ min: 1 })
   .withMessage('Kebutuhan produk harus diisi'),
  body('cabang.*.rata_rata_kuantitas_produk')
   .notEmpty()
   .withMessage('Rata-rata kuantitas produk harus diisi'),
 ];
};

const orderValidation = () => {
 return [
  body('no_telp')
   .notEmpty()
   .withMessage('Nomor telepon harus diisi')
   .matches(/^62\d{9,13}$/)
   .withMessage(
    'Nomor telepon harus diawali dengan 62 dan memiliki panjang 10-14 digit'
   ),
  body('id_cabang').isInt(),
  body('alamat_pengiriman').isString(),
  body('produk')
   .isArray({ min: 1 })
   .withMessage('Harus memilih produk minimal 1'),
  body('produk.*.id_produk').isInt(),
  body('produk.*.kuantitas').isInt(),
 ];
};

// Middleware untuk menangani validasi
const validate = (req, res, next) => {
 const errors = validationResult(req);
 if (errors.isEmpty()) {
  return next();
 }

 // Terdapat kesalahan validasi, kirim respons dengan daftar error
 const errorMessages = errors.array().map((error) => ({
  field: error.param,
  message: error.msg,
 }));

 throw {
  statusCode: 400,
  msg: errorMessages,
 };
};

module.exports = {
 registerValidation,
 orderValidation,
 validate,
};
