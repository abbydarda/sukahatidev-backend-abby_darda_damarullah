module.exports = {
 up: `CREATE TABLE pelanggan (
    id int NOT NULL AUTO_INCREMENT,
    nama_brand varchar(50) NOT NULL,
    jenis_usaha varchar(50) NOT NULL,
    no_telp varchar(20) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY no_telp_UNIQUE (no_telp)
  ) ENGINE=InnoDB`,

 down: 'DROP TABLE pelanggan',
};
