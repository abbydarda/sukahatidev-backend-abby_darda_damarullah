const { pelangganModel, pesananModel } = require('../models');

async function summary(req, res, next) {
 try {
  // Mengambil data pelanggan
  const dataPelanggan = await pelangganModel.findAllPelanggan();
  const dataJumlahPelanggan = dataPelanggan.length;

  // Mengambil data pesanan pelanggan yang sudah dibayar
  const dataPesananPelanggan = await pesananModel.findAllPesananPelanggan();
  const dataPesananSudahBayar = dataPesananPelanggan.filter(
   (item) => item.status_pesanan === 'Sudah Bayar'
  );

  // Menghitung jumlah pelanggan yang memiliki pesanan yang sudah dibayar
  const dataJumlahPelangganExistsOrder = dataPesananSudahBayar.filter(
   (elemen, indeks, array) => {
    return (
     array.findIndex((e) => e.id_pelanggan === elemen.id_pelanggan) === indeks
    );
   }
  ).length;

  // Menghitung persentase registrasi pesanan
  const persentase_registrasi_pesanan = `${(
   (dataJumlahPelangganExistsOrder / dataJumlahPelanggan) *
   100
  ).toFixed(2)}%`;

  // Mengambil data kota dari pesanan yang sudah dibayar
  const dataKota = dataPesananSudahBayar
   .filter((elemen, indeks, array) => {
    return array.findIndex((e) => e.kota === elemen.kota) === indeks;
   })
   .map((item) => item.kota);

  const persebaran_kota = [];

  for (const kota of dataKota) {
   // Menghitung jumlah pelanggan untuk setiap kota
   const jumlahPelanggan = dataPesananSudahBayar
    .filter((item) => item.kota === kota)
    .filter((elemen, indeks, array) => {
     return (
      array.findIndex((e) => e.id_pelanggan === elemen.id_pelanggan) === indeks
     );
    }).length;

   // Menghitung jumlah kuantitas pesanan untuk setiap kota
   const jumlahKuantitas = dataPesananSudahBayar
    .filter((item) => item.kota === kota)
    .reduce((kuantitas, item) => kuantitas + item.kuantitas, 0);

   persebaran_kota.push({
    nama_kota: kota,
    jumlah_pelanggan: jumlahPelanggan,
    jumlah_kuantitas: jumlahKuantitas,
   });
  }

  // Mengambil data pelanggan (brand) dari pesanan yang sudah dibayar
  const pelanggan = dataPesananSudahBayar
   .filter((elemen, indeks, array) => {
    return (
     array.findIndex((e) => e.id_pelanggan === elemen.id_pelanggan) === indeks
    );
   })
   .map((item) => item.nama_brand);

  const pelangganBrand = [];

  for (const namaBrand of pelanggan) {
   // Menghitung jumlah kuantitas pesanan untuk setiap pelanggan (brand)
   const jumlahKuantitasPelanggan = dataPesananSudahBayar
    .filter((item) => item.nama_brand === namaBrand)
    .reduce((kuantitas, item) => kuantitas + item.kuantitas, 0);

   pelangganBrand.push({
    nama_brand: namaBrand,
    jumlah_kuantitas: jumlahKuantitasPelanggan,
   });
  }

  // Mengurutkan pelanggan berdasarkan jumlah kuantitas pesanan secara descending
  const rangking_pelanggan = pelangganBrand.sort(
   (a, b) => b.jumlah_kuantitas - a.jumlah_kuantitas
  );

  // Mengambil data produk dari pesanan yang sudah dibayar
  const dataProduk = dataPesananSudahBayar
   .filter((elemen, indeks, array) => {
    return array.findIndex((e) => e.id_produk === elemen.id_produk) === indeks;
   })
   .map((item) => {
    return {
     id_produk: item.id_produk,
     nama_produk: item.nama_produk,
     klasifikasi_produk: item.klasifikasi,
    };
   });

  const produk = [];
  for (const elemen of dataProduk) {
   // Menghitung jumlah pesanan untuk setiap produk
   const jumlahPesananProduk = dataPesananSudahBayar.filter(
    (item) => item.id_produk === elemen.id_produk
   ).length;

   produk.push({
    nama_produk: elemen.nama_produk,
    klasifikasi: elemen.klasifikasi_produk,
    jumlah_pesanan: jumlahPesananProduk,
   });
  }

  // Mengurutkan produk berdasarkan jumlah pesanan secara descending
  const rangking_produk = produk.sort(
   (a, b) => b.jumlah_pesanan - a.jumlah_pesanan
  );

  const rataPesananPelanggan = [];

  for (const namaBrand of pelanggan) {
   // Menghitung jumlah pesanan unik untuk setiap pelanggan (brand)
   const jumlahPesananPelanggan = dataPesananSudahBayar
    .filter((elemen, indeks, array) => {
     return (
      array.findIndex((e) => e.id_pesanan === elemen.id_pesanan) === indeks
     );
    })
    .filter((item) => item.nama_brand === namaBrand).length;

   // Menghitung jumlah harga pesanan untuk setiap pelanggan (brand)
   const jumlahHargaPesanan = dataPesananSudahBayar
    .filter((item) => item.nama_brand === namaBrand)
    .reduce((total, item) => total + item.subtotal, 0);

   // Menghitung rata-rata pesanan per pelanggan (brand)
   const rataRataPesananPelanggan = Math.ceil(
    jumlahHargaPesanan / jumlahPesananPelanggan
   );

   rataPesananPelanggan.push({
    nama_brand: namaBrand,
    jumlah_rata_rata_pesanan: rataRataPesananPelanggan,
   });
  }

  // Mengurutkan pelanggan berdasarkan rata-rata pesanan secara descending
  const rangking_rata_rata_pelanggan = rataPesananPelanggan.sort(
   (a, b) => b.jumlah_rata_rata_pesanan - a.jumlah_rata_rata_pesanan
  );

  // Menghitung jumlah pemasukan dari pesanan yang sudah dibayar
  const jumlah_pemasukan = dataPesananSudahBayar.reduce(
   (total, item) => total + item.subtotal,
   0
  );

  const response = {
   message: 'Data ringkasan berhasil diambil',
   data: {
    persentase_registrasi_pesanan,
    persebaran_kota,
    rangking_pelanggan,
    rangking_produk,
    rangking_rata_rata_pelanggan,
    jumlah_pemasukan,
   },
  };

  res.send(response);
 } catch (error) {
  next(error);
 }
}

module.exports = {
 summary,
};
