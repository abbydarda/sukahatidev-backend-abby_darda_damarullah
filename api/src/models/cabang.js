// Mengimport modul connection dari file '../db/init'
const connection = require('../db/init');

// Menyimpan data cabang ke dalam tabel cabang
async function insertCabang(payload) {
 try {
  // Membuat query SQL dengan menggunakan data yang diberikan
  const sql = await connection.format(
   `INSERT INTO cabang (id_pelanggan, nama_cabang, kota, kebutuhan_produk, rata_rata_kuantitas_produk) VALUES(?, ?, ?, ?, ?)`,
   payload
  );

  // Menjalankan query SQL untuk menyimpan data cabang
  const [rows, fields] = await connection.query(sql);

  // Mengembalikan ID yang dihasilkan setelah penyimpanan
  return rows.insertId;
 } catch (error) {
  throw error;
 }
}

// Mendapatkan data cabang berdasarkan ID pelanggan
async function getCabangByIdPelanggan(id_pelanggan) {
 try {
  // Membuat query SQL untuk mendapatkan data cabang berdasarkan ID pelanggan
  const sql = await connection.format(
   `SELECT id, nama_cabang FROM cabang WHERE id_pelanggan = ?`,
   [id_pelanggan]
  );

  // Menjalankan query SQL
  const [rows, fields] = await connection.query(sql);

  return rows;
 } catch (error) {
  throw error;
 }
}

// Mendapatkan data cabang berdasarkan ID cabang dan ID pelanggan
async function getCabangByIdAndIdPelanggan(payload) {
 try {
  // Membuat query SQL untuk mendapatkan data cabang berdasarkan ID cabang dan ID pelanggan
  const sql = await connection.format(
   `SELECT * FROM cabang WHERE id = ? AND id_pelanggan = ? LIMIT 1`,
   payload
  );

  // Menjalankan query SQL
  const [rows, fields] = await connection.query(sql);

  return rows[0];
 } catch (error) {
  throw error;
 }
}

module.exports = {
 insertCabang,
 getCabangByIdPelanggan,
 getCabangByIdAndIdPelanggan,
};
