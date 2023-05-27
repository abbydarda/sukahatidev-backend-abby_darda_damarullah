const { fakerUtils } = require('../../utils');

module.exports = {
 up: `INSERT INTO cabang (id_pelanggan, nama_cabang, kota, kebutuhan_produk, rata_rata_kuantitas_produk) VALUES
 (1, 'Cabang Rawamangun', 'Jakarta Timur', 'Karkas,Ati ampela', '10kg'),
 (1, 'Cabang Jatinegara', 'Jakarta Timut', 'Karkas,Ati ampela', '5kg'),
 (2, 'Cabang Tebet', 'Jakarta Selatan', 'Karkas,Boneless', '8kg'),
 (2, 'Cabang Senen', 'Jakarta Pusat', 'Karkas,Boneless', '12kg'),
 (3, 'Cabang Dago', 'Bandung', 'Boneless', '15kg'),
 (4, 'Cabang Dipatiukur', 'Bandung', 'Boneless,Ati ampela', '15kg'),
 (4, 'Cabang Riung', 'Bandung', 'Boneless,Ati ampela', '15kg'),
 (4, 'Cabang Cikutra', 'Bandung', 'Boneless,Ati ampela', '15kg'),
 (5, 'Cabang Ciwidey', 'Bandung', 'karkas', '15kg');
`,
 down: 'TRUNCATE pelanggan',
};
