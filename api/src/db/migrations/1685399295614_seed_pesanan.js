module.exports = {
 up: `INSERT INTO pesanan (id_cabang, no_pesanan, tanggal_pesanan, alamat_pengiriman, status_pesanan, total)
    VALUES
    (1, 'PS/1/1/29052023/1685341642', '2023-05-29 13:27:22', 'Lorem Ipsum Dolor Met', 'Sudah Bayar', 4536600),
    (2, 'PS/1/2/29052023/1685341657', '2023-05-29 13:27:37', 'Lorem Ipsum Dolor Met', 'Sudah Bayar', 6555300),
    (1, 'PS/1/1/29052023/1685341698', '2023-05-29 13:28:18', 'Lorem Ipsum Dolor Met', 'Sudah Bayar', 3115000),
    (2, 'PS/1/2/29052023/1685341717', '2023-05-29 13:28:37', 'Lorem Ipsum Dolor Met', 'Belum Bayar', 2822400),
    (3, 'PS/2/3/29052023/1685341762', '2023-05-29 13:29:22', 'Lorem Ipsum Dolor Met', 'Sudah Bayar', 5111000),
    (3, 'PS/2/3/29052023/1685341791', '2023-05-29 13:29:51', 'Lorem Ipsum Dolor Met', 'Sudah Bayar', 2064200),
    (4, 'PS/2/4/29052023/1685341812', '2023-05-29 13:30:12', 'Lorem Ipsum Dolor Met', 'Sudah Bayar', 3091000),
    (5, 'PS/3/5/29052023/1685341865', '2023-05-29 13:31:05', 'Lorem Ipsum Dolor Met', 'Sudah Bayar', 7291600);`,
 down: 'TRUNCATE table pesanan',
};
