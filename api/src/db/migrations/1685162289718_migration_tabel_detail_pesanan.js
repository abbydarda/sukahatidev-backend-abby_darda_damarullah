module.exports = {
 up: `CREATE TABLE detail_pesanan (
    id bigint NOT NULL AUTO_INCREMENT,
    id_pesanan bigint NOT NULL,
    id_produk bigint NOT NULL,
    kuantitas int NOT NULL,
    subtotal int NOT NULL,
    PRIMARY KEY (id),
    KEY fk_id_pesanan_idx (id_pesanan),
    KEY fk_id_produk_idx (id_produk)
  ) ENGINE=InnoDB`,

 down: 'DROP TABLE detail_pesanan',
};
