module.exports = {
 up: `CREATE TABLE produk (
    id bigint NOT NULL AUTO_INCREMENT,
    nama_produk varchar(50) NOT NULL,
    klasifikasi varchar(50) DEFAULT NULL,
    tipe varchar(50) NOT NULL,
    satuan varchar(50) NOT NULL,
    konstanta float DEFAULT NULL,
    harga int NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB`,

 down: 'DROP TABLE produk',
};
