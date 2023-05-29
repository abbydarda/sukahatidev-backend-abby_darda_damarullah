// Mengimport modul connection dari file '../db/init'
const connection = require('../db/init');

// Mendapatkan data pelanggan berdasarkan nomor telepon (no_telp)
async function getPelangganByPhoneNumber(no_telp) {
 try {
  // Membuat query SQL dengan menggunakan nomor telepon yang diberikan
  const sql = await connection.format(
   `SELECT id, nama_brand, jenis_usaha, no_telp FROM pelanggan WHERE no_telp = ? LIMIT 1`,
   [no_telp]
  );

  // Menjalankan query SQL dan mendapatkan hasilnya
  const [rows, fields] = await connection.query(sql);

  // Mengembalikan baris pertama dari hasil query
  return rows[0];
 } catch (error) {
  throw error;
 }
}

// Menyimpan data pelanggan ke dalam tabel pelanggan
async function insertPelanggan(payload) {
 try {
  // Membuat query SQL dengan menggunakan data yang diberikan
  const sql = await connection.format(
   `INSERT INTO pelanggan (nama_brand, jenis_usaha, no_telp) VALUES(?, ?, ?)`,
   payload
  );

  // Menjalankan query SQL untuk menyimpan data pelanggan
  const [rows, fields] = await connection.query(sql);

  // Mengembalikan ID yang dihasilkan setelah penyimpanan
  return rows.insertId;
 } catch (error) {
  throw error;
 }
}
async function findAllPelangganExistOrder() {
 try {
  // Membentuk query untuk mengambil data pelanggan yang memiliki pesanan
  const sql = await connection.format(
   `SELECT a.id AS id_pelanggan, a.nama_brand, a.jenis_usaha, a.no_telp,
      b.id AS id_cabang, b.nama_cabang, b.kota, b.kebutuhan_produk, b.rata_rata_kuantitas_produk
   FROM pelanggan a
   JOIN cabang b ON a.id = b.id_pelanggan
   WHERE EXISTS (
   SELECT 1
   FROM pesanan c
   WHERE c.id_cabang = b.id
   )
   `
  );

  const [rows, fields] = await connection.query(sql);

  return rows;
 } catch (error) {
  throw error;
 }
}

async function findAllPelanggan() {
 try {
  const sql = await connection.format(`SELECT * FROM pelanggan`);

  const [rows, fields] = await connection.query(sql);

  return rows;
 } catch (error) {
  throw error;
 }
}

module.exports = {
 getPelangganByPhoneNumber,
 insertPelanggan,
 findAllPelangganExistOrder,
 findAllPelanggan,
};
