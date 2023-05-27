module.exports = {
 up: `INSERT INTO produk (nama_produk, klasifikasi, tipe, satuan, konstanta, harga) VALUES
    ('Karkas', '0.4 - 0.7', 'Ayam utuh', 'Ekor', 0.7, 43500),
    ('Karkas', '0.7 - 1.2', 'Ayam utuh', 'Ekor', 1.2, 41600),
    ('Karkas', '1.2 - 1.5', 'Ayam utuh', 'Ekor', 1.5, 40500),
    ('Ati ampela', 'Bersih', 'Ekses', 'pcs', 0.2, 22500),
    ('Ati ampela', 'Kotor', 'Ekses', 'pcs', 0.2, 21500),
    ('Boneless', 'Dada', 'Ayam Parting', 'kg', NULL, 53500),
    ('Boneless', 'Paha', 'Ayam Parting', 'kg', NULL, 51500),
    ('Paha utuh', NULL, 'Ayam Parting', 'kg', NULL, 43100);
  `,
 down: 'TRUNCATE TABLE produk',
};
