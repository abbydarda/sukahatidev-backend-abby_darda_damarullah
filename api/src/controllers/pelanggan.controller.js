const { pelangganModel, cabangModel } = require('../models');

// Fungsi untuk mencari semua data pelanggan yang memiliki pesanan
async function findAllPelanggan(req, res, next) {
 try {
  const pelanggan = await pelangganModel.findAllPelangganExistOrder();

  const response = {
   message: 'Data pelanggan berhasil diambil',
   data: pelanggan,
  };

  res.send(response);
 } catch (error) {
  next(error);
 }
}

module.exports = { findAllPelanggan };
