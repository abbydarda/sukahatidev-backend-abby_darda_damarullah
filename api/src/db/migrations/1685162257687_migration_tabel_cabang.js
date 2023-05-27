module.exports = {
 up: `CREATE TABLE cabang (
    id bigint NOT NULL AUTO_INCREMENT,
    id_pelanggan bigint NOT NULL,
    nama_cabang varchar(100) NOT NULL,
    kota varchar(50) NOT NULL,
    kebutuhan_produk varchar(255) NOT NULL,
    rata_rata_kuantitas_produk varchar(50) NOT NULL,
    PRIMARY KEY (id),
    KEY fk_id_pelanggan_idx (id_pelanggan)
  ) ENGINE=InnoDB
`,

 down: 'DROP TABLE cabang',
};
