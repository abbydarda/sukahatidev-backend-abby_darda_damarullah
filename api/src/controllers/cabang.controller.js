const { pelangganModel, cabangModel } = require('../models');

// Fungsi untuk mendapatkan data cabang berdasarkan nomor telepon pelanggan
async function getCabangByPhoneNumber(req, res, next) {
 try {
  // Mendapatkan nomor telepon dari parameter
  const { no_telp } = req.params;

  // Memeriksa apakah pelanggan sudah terdaftar
  const pelangganIsExists = await pelangganModel.getPelangganByPhoneNumber(
   no_telp
  );

  // Jika pelanggan tidak terdaftar, lemparkan error
  if (!pelangganIsExists) {
   throw {
    statusCode: 400,
    msg: 'Pelanggan tidak terdaftar',
   };
  }

  // Mendapatkan ID pelanggan
  const { id: id_pelanggan } = pelangganIsExists;

  // Mendapatkan data cabang berdasarkan ID pelanggan
  const cabang = await cabangModel.getCabangByIdPelanggan(id_pelanggan);

  // Menyiapkan response dengan data cabang yang berhasil diambil
  const response = {
   message: 'Data Cabang berhasil diambil',
   data: cabang,
  };

  res.send(response);
 } catch (error) {
  next(error);
 }
}

module.exports = {
 getCabangByPhoneNumber,
};
