const { fakerUtils } = require('../../utils');

module.exports = {
 up: `INSERT INTO pelanggan (nama_brand, jenis_usaha, no_telp) VALUES
 ('Brand A', 'Kafe', '${fakerUtils.phone.number('+628##########')}'),
 ('Brand B', 'Restoran', '${fakerUtils.phone.number('+628##########')}'),
 ('Brand C', 'Warung Makan', '${fakerUtils.phone.number('+628##########')}'),
 ('Brand D', 'Kafe', '${fakerUtils.phone.number('+628##########')}'),
 ('Brand E', 'Restoran', '${fakerUtils.phone.number('+628##########')}')`,

 down: 'TRUNCATE pelanggan',
};
