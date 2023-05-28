// Mengimport modul connection dari file '../db/init'
const connection = require('../db/init');

// Fungsi untuk menyisipkan detail pesanan ke dalam tabel detail_pesanan
async function insertDetailPesanan(payload) {
 try {
  // Membuat query SQL untuk menyisipkan data detail pesanan
  const sql = await connection.format(
   `INSERT INTO detail_pesanan (id_pesanan, id_produk, kuantitas, subtotal) VALUES (?, ?, ?, ?)`,
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

module.exports = {
 insertDetailPesanan,
};
