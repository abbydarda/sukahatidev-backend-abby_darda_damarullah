// Mengimport modul connection dari file '../db/init'
const connection = require('../db/init');

// Fungsi untuk mendapatkan produk berdasarkan ID yang ada dalam array
async function getProdukByIdIn(id_produk) {
 try {
  // Membuat query SQL untuk mendapatkan produk dengan ID yang ada dalam array
  const sql = await connection.format(`SELECT * FROM produk WHERE id IN (?)`, [
   id_produk,
  ]);

  // Menjalankan query SQL
  const [rows, fields] = await connection.query(sql);

  // Mengembalikan hasil query berupa array produk
  return rows;
 } catch (error) {
  throw error;
 }
}

module.exports = {
 getProdukByIdIn,
};
