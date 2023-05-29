// Mengimport modul connection dari file '../db/init'
const connection = require('../db/init');

// Fungsi untuk menyisipkan pesanan ke dalam tabel pesanan
async function insertPesanan(payload) {
 try {
  // Membuat query SQL untuk menyisipkan data pesanan
  const sql = await connection.format(
   `INSERT INTO pesanan (id_cabang, no_pesanan, tanggal_pesanan, alamat_pengiriman, status_pesanan, total) VALUES (?, ?, ?, ?, ?, ?)`,
   payload
  );

  // Menjalankan query SQL
  const [rows, fields] = await connection.query(sql);

  // Mengembalikan ID yang dihasilkan dari operasi penyisipan
  return rows.insertId;
 } catch (error) {
  throw error;
 }
}

// Fungsi untuk mendapatkan data pesanan berdasarkan ID pesanan
async function getPesananById(id_pesanan) {
 try {
  const sql = await connection.format(
   `SELECT * FROM pesanan WHERE id = ? LIMIT 1`,
   [id_pesanan]
  );

  const [rows, fields] = await connection.query(sql);

  return rows[0];
 } catch (error) {
  throw error;
 }
}

// Fungsi untuk mendapatkan data pesanan berdasarkan nomor pesanan
async function getPesananByNoPesanan(no_pesanan) {
 try {
  const sql = await connection.format(
   `SELECT * FROM pesanan WHERE no_pesanan = ? LIMIT 1`,
   [no_pesanan]
  );

  const [rows, fields] = await connection.query(sql);

  return rows[0];
 } catch (error) {
  throw error;
 }
}

// Fungsi untuk memperbarui status pesanan
async function updateStatusPesanan(payload) {
 try {
  const sql = await connection.format(
   `UPDATE pesanan SET status_pesanan = ? WHERE id = ?`,
   payload
  );

  const [rows, fields] = await connection.query(sql);

  return rows.affectedRows;
 } catch (error) {
  throw error;
 }
}
async function findAllPesananPelanggan() {
 try {
  // Membentuk query untuk mengambil data pesanan pelanggan beserta detailnya
  const sql = await connection.format(`SELECT
     a.id AS id_pelanggan,
     a.nama_brand,
     b.id AS id_cabang,
     b.nama_cabang,
     b.kota,
     c.id AS id_produk,
     c.nama_produk,
     COALESCE(c.klasifikasi, '') AS klasifikasi,
     c.harga,
     d.id AS id_pesanan,
     d.no_pesanan,
     d.status_pesanan,
     d.tanggal_pesanan,
     e.kuantitas,
     e.subtotal
   FROM
     pelanggan a
     INNER JOIN cabang b ON a.id = b.id_pelanggan
     INNER JOIN pesanan d ON b.id = d.id_cabang
     INNER JOIN detail_pesanan e ON d.id = e.id_pesanan
     INNER JOIN produk c ON e.id_produk = c.id`);

  const [rows, fields] = await connection.query(sql);

  return rows;
 } catch (error) {
  throw error;
 }
}

module.exports = {
 insertPesanan,
 getPesananById,
 getPesananByNoPesanan,
 updateStatusPesanan,
 findAllPesananPelanggan,
};
