module.exports = {
 up: `CREATE TABLE pesanan (
    id bigint NOT NULL AUTO_INCREMENT,
    id_cabang bigint NOT NULL,
    no_pesanan varchar(100) NOT NULL,
    tanggal_pesanan datetime NOT NULL,
    alamat_pengiriman varchar(255) NOT NULL,
    status_pesanan varchar(20) NOT NULL,
    total int NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY no_pesanan_UNIQUE (no_pesanan),
    KEY fk_id_cabang_idx (id_cabang)
  ) ENGINE=InnoDB`,

 down: 'DROP TABLE pesanan',
};
