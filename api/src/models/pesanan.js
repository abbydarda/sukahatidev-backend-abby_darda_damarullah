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

module.exports = {
 insertPesanan,
 getPesananById,
 getPesananByNoPesanan,
 updateStatusPesanan,
};
