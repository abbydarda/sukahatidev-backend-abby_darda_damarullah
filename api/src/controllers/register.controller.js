// Import model pelangganModel dan cabangModel dari file '../models'.
const { pelangganModel, cabangModel } = require('../models');

async function execute(req, res, next) {
 try {
  const { nama_brand, jenis_usaha, no_telp, cabang } = req.body;

  // Memeriksa apakah pelanggan sudah terdaftar berdasarkan nomor telepon (no_telp)
  const pelangganIsExists = await pelangganModel.getPelangganByPhoneNumber(
   no_telp
  );

  // Jika pelanggan sudah terdaftar, lemparkan error dengan statusCode 400 dan pesan 'Nomor telepon sudah terdaftar'
  if (pelangganIsExists) {
   throw {
    statusCode: 400,
    msg: 'Nomor telepon sudah terdaftar',
   };
  }

  // Membuat array payloadInsertPelanggan yang berisi data untuk disimpan ke tabel pelanggan
  const payloadInsertPelanggan = [nama_brand, jenis_usaha, no_telp];

  // Menyimpan data pelanggan ke database menggunakan fungsi insertPelanggan dari model pelangganModel
  const id_pelanggan = await pelangganModel.insertPelanggan(
   payloadInsertPelanggan
  );

  // Menyisipkan data cabang ke dalam database
  for (const item of cabang) {
   const {
    nama_cabang,
    kota,
    kebutuhan_produk,
    rata_rata_kuantitas_produk,
   } = item;

   // Mengubah array kebutuhan_produk menjadi string dengan menggunakan tanda koma sebagai pemisah
   const parsedKebutuhanPokok = kebutuhan_produk.join(',');

   // Membuat array payloadInsertCabang yang berisi data untuk disimpan ke tabel cabang
   const payloadInsertCabang = [
    id_pelanggan,
    nama_cabang,
    kota,
    parsedKebutuhanPokok,
    rata_rata_kuantitas_produk,
   ];

   // Menyimpan data cabang ke database menggunakan fungsi insertCabang dari model cabangModel
   await cabangModel.insertCabang(payloadInsertCabang);
  }

  // Menyiapkan response yang akan dikirim sebagai hasil registrasi berhasil
  const response = {
   message: 'Proses registrasi berhasil',
  };

  res.send(response);
 } catch (error) {
  next(error);
 }
}

module.exports = { execute };
