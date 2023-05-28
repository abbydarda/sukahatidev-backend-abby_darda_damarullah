const dayjs = require('dayjs');
const {
 pelangganModel,
 cabangModel,
 produkModel,
 pesananModel,
 detailPesananModel,
} = require('../models');

// Fungsi untuk melakukan pemesanan produk
async function orderProduct(req, res, next) {
 try {
  // Mendapatkan data yang diperlukan dari request body
  const { no_telp, id_cabang, alamat_pengiriman, produk } = req.body;

  // Memeriksa apakah pelanggan sudah terdaftar
  const pelangganIsExists = await pelangganModel.getPelangganByPhoneNumber(
   no_telp
  );

  // Jika pelanggan tidak terdaftar, lemparkan error
  if (!pelangganIsExists) {
   throw {
    statusCode: 400,
    msg: 'Pelanggan tidak terdaftar, pesanan tidak bisa diproses',
   };
  }

  // Mendapatkan ID pelanggan
  const { id: id_pelanggan } = pelangganIsExists;

  // Payload untuk mendapatkan data cabang
  const payloadGetCabang = [id_cabang, id_pelanggan];

  // Memeriksa apakah cabang sesuai dengan pelanggan
  const cabangIsExist = await cabangModel.getCabangByIdAndIdPelanggan(
   payloadGetCabang
  );

  // Jika cabang tidak sesuai dengan pelanggan, lemparkan error
  if (!cabangIsExist) {
   throw {
    statusCode: 400,
    msg: 'Cabang tidak sesuai dengan pelanggan, pesanan tidak bisa diproses',
   };
  }

  // Mengatur informasi tanggal dan nomor pesanan
  const currdate = dayjs().format('DDMMYYYY');
  const unixCurrdate = dayjs().unix();
  const tanggalPesanan = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const noPesanan = `PS/${id_pelanggan}/${id_cabang}/${currdate}/${unixCurrdate}`;

  // Mengatur status pesanan awal
  const statusPesanan = 'Belum Bayar';

  // Mendapatkan ID produk yang dipesan
  const id_produk = produk.map((item) => item.id_produk);

  // Mendapatkan informasi produk berdasarkan ID
  const products = await produkModel.getProdukByIdIn(id_produk);

  let total = 0;

  // Menghitung subtotal dan total harga pesanan
  for (const item of produk) {
   for (const product of products) {
    if (item.id_produk === product.id) {
     const konstanta = product.konstanta || 1;
     const subTotal = Math.ceil(product.harga * konstanta) * item.kuantitas;
     item.subTotal = subTotal;
     total += subTotal;
    }
   }
  }

  // Payload untuk menyimpan informasi pesanan
  const payloadInsertPesanan = [
   id_cabang,
   noPesanan,
   tanggalPesanan,
   alamat_pengiriman,
   statusPesanan,
   total,
  ];

  // Menyimpan data pesanan ke dalam tabel pesanan
  const id_pesanan = await pesananModel.insertPesanan(payloadInsertPesanan);

  // Menyimpan detail pesanan untuk setiap produk yang dipesan
  for (const item of produk) {
   const payloadInsertDetailPesanan = [
    id_pesanan,
    item.id_produk,
    item.kuantitas,
    item.subTotal,
   ];

   await detailPesananModel.insertDetailPesanan(payloadInsertDetailPesanan);
  }

  // Menyiapkan response dengan informasi pesanan yang berhasil dibuat
  const response = {
   message: 'Pemesanan produk berhasil dibuat',
   data: {
    no_pesanan: noPesanan,
    tanggal_pesanan: tanggalPesanan,
    total,
   },
  };

  res.send(response);
 } catch (error) {
  next(error);
 }
}

// Fungsi untuk membatalkan pesanan
async function cancelOrder(req, res, next) {
 try {
  const { no_telp, no_pesanan } = req.body;

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

  const { id: id_pelanggan } = pelangganIsExists;

  // Memeriksa apakah pesanan sudah terdaftar
  const pesananIsExists = await pesananModel.getPesananByNoPesanan(no_pesanan);

  // Jika pesanan tidak terdaftar, lemparkan error
  if (!pesananIsExists) {
   throw {
    statusCode: 400,
    msg: 'Pesanan tidak terdaftar',
   };
  }

  const { id: id_pesanan, id_cabang } = pesananIsExists;

  const payloadGetCabang = [id_cabang, id_pelanggan];

  // Mendapatkan data cabang berdasarkan ID cabang dan ID pelanggan
  const cabang = await cabangModel.getCabangByIdAndIdPelanggan(
   payloadGetCabang
  );

  // Jika data cabang tidak ditemukan, lemparkan error
  if (!cabang) {
   throw {
    statusCode: 400,
    msg: 'Data pesanan tidak valid',
   };
  }

  const payloadCancelOrder = ['Batal', id_pesanan];

  // Memperbarui status pesanan menjadi 'Batal'
  await pesananModel.updateStatusPesanan(payloadCancelOrder);

  const response = {
   message: 'Proses pembatalan pesanan berhasil',
  };

  res.send(response);
 } catch (error) {
  next(error);
 }
}

// Fungsi untuk mengupdate status pesanan
async function updateStatusOrder(req, res, next) {
 try {
  const { id_pesanan } = req.params;
  const { status_pesanan } = req.body;

  // Memeriksa apakah pesanan sudah terdaftar
  const pesananIsExists = await pesananModel.getPesananById(id_pesanan);

  // Jika pesanan tidak terdaftar, lemparkan error
  if (!pesananIsExists) {
   throw {
    statusCode: 400,
    msg: 'Pesanan tidak terdaftar',
   };
  }

  const payloadUpdateStatus = [status_pesanan, id_pesanan];

  // Memperbarui status pesanan
  await pesananModel.updateStatusPesanan(payloadUpdateStatus);

  const response = {
   message: 'Proses mengganti status pesanan berhasil',
  };

  res.send(response);
 } catch (error) {
  next(error);
 }
}

//Fungsi untuk mengambil semua data pesanan pelanggan
async function findAllPesananPelanggan(req, res, next) {
 try {
  const pesanan = await pesananModel.findAllPesananPelanggan();

  const response = {
   message: 'Data pesanan berhasil diambil',
   data: pesanan,
  };

  res.send(response);
 } catch (error) {
  next(error);
 }
}

module.exports = {
 orderProduct,
 cancelOrder,
 updateStatusOrder,
 findAllPesananPelanggan,
};
