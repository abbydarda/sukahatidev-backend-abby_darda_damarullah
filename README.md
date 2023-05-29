# CV Sukahati Pratama Test - Abby Darda Damarullah
![Node.js Version](https://img.shields.io/badge/Node.js-18.16.0-green) ![Express Version](https://img.shields.io/badge/Express-4.18.2-blue)

Ini merupakan projek test di CV Sukahati Pratama yang meliputi :  
1. [Setup Project](#setup-project)
1. [Pesanan](#pesanan)  
	- [Analisi Kebutuhan](#analisis-pesanan)  
	- [Solusi](#solusi-pesanan)  
	- [PoC](#poc-pesanan)  
2. [Filter](#filter)  
	- [Analisi Kebutuhan](#analisis-filter)  
	- [Solusi](#solusi-filter)  
	- [PoC](#poc-filter)  
3. [Logical](#logical)  
	- [Rotasi String](#rotasi-string)  
	- [Palindrome](#palindrome)  
  
## Setup Project
1. Masuk ke dalam folder projek dan jalankan perintah `npm install`
	```bash
	npm install
	```  
2.  Buat file `.env` yang berisi informasi dari file `.env.example` 
	```env
	APP_URL=http://localhost:3001
	APP_PORT=3001

	DB_HOST=
	DB_PORT=
	DB_NAME=
	DB_USER=
	DB_PASSWORD=
	```
3. Untuk melakukan migrasi dan seed, jalankan perintah ini
	```bash
	npm run migrations up
	```
4. Untuk merefresh migrasi dan seed, jalankan perintah ini
	```bash
	npm run migrations refresh
	```
5. Untuk menjalankan server development, jalankan perintah ini
	```bash
	npm run start:dev
	```
6.  Untuk menjalankan server production, jalankan perintah ini
	```bash
	npm run start:prod
	```
## Pesanan  
### Analisis Pesanan  
Dari kebutuhan yang disebutkan, tim marketing perlu memiliki akses terhadap data pelanggan dan pesanan mereka. Mereka juga perlu informasi tentang produk, termasuk harga dan klasifikasinya. Beberapa poin penting yang bisa diambil dari analisis kebutuhan ini adalah:  
1. DIbutuhkan fitur registrasi yang akan mencatat semua data pelanggan yang dibutuhkan.  
2. Dibutuhkan fitur pemesanan yang akan mencatat semua data pesanan yang dilakukan oleh pelanggan.  
3. Dibutuhkan fitur untuk pembatalan pesanan.
4. dibutuhkan fitur untuk mengambil data pelanggan yang mempunyai pesanan
5. dibutuhkan fitur untuk mengambil data pesanan pelanggan

### Solusi Pesanan  
Solusi yang dapat saya berikan adalah sebagai berikut:  
1. Membuat fitur registrasi pelanggan yang berisi informasi terkait pelanggan tersebut beserta cabang yang dimilikinya, dimana nomor telepon menjadi identitas unik dari setiap pelanggan  
2. Membuat fitur pemesanan produk yang akan mencatat semua transaksi yang dilakukan, dimana hanya pelanggan yang sudah terdaftar yang bisa melakukan pemesanan ini, jadi dibutuhkan validasi untuk fitur ini dan menggunakan nomor telepon untuk mengambil data cabang yang melakukan pesanan  
3. Membuat fitur untuk pembatalan pesanan yang bisa dilakukan oleh pelanggan dengan menggunakan nomor telepon dan nomor pesanan atau perubahan status pesanan yang dilakukan oleh marketing
4. Membuat fitur untuk mengambil data pelanggan yang mempunyai pesanan
5. Membuat fitur untuk mengambil data pesanan yang dilakukan oleh pelanggan

### PoC Pesanan

#### Endpoint Register [POST  /api/register]
Ini merupakan endpoint yang digunakan untuk pelanggan melakukan pendaftaran
##### Body Payload
```json
{
    "nama_brand" : "ABC",
    "jenis_usaha" : "restoran",
    "no_telp" : "6289639535899",
    "cabang" : [
        {
            "nama_cabang" : "Cabang DEF",
            "kota" : "Jakarta Barat",
            "kebutuhan_produk" : ["Karkas", "Ati ampela"],
            "rata_rata_kuantitas_produk" : "20kg"
        },
                {
            "nama_cabang" : "Cabang GHI",
            "kota" : "Jakarta Barat",
            "kebutuhan_produk" : ["Karkas", "Ati ampela"],
            "rata_rata_kuantitas_produk" : "20kg"
        }
    ]
}
```

##### Response
1. Response Berhasil
```json
{
    "message": "Proses registrasi berhasil"
}
```
2. Response Gagal
```json
{
    "error": "Nomor telepon sudah terdaftar"
}
```

#### Endpoint Ambil Cabang Berdasarkan Telepon [GET /api/cabang/pelanggan/:no_telp]
Ini merupakan endpoint yang digunakan untuk pelanggan mengambil data cabangnya berdasarkan nomor telepon

##### Response
1. Response Berhasil
```json
{
    "message": "Data Cabang berhasil diambil",
    "data": [
        {
            "id": 10,
            "nama_cabang": "Cabang DEF"
        },
        {
            "id": 11,
            "nama_cabang": "Cabang GHI"
        }
    ]
}
```
2. Response Gagal
```json
{
    "error": "Pelanggan tidak terdaftar"
}
```

#### Endpoint Pesan Produk [POST  /api/order]
Ini merupakan endpoint yang digunakan untuk pelanggan melakukan pemesanan produk, `id_cabang` bisa didapatkan dari sini [ambil data cabang berdasarkan nomor telepon](##endpoint-ambil-cabang-berdasarkan-telepon)
##### Body Payload
```json
{
    "no_telp" : "6280954024056",
    "id_cabang" : 1,
    "alamat_pengiriman" : "Lorem Ipsum Dolor Met",
    "produk" : [
        {
            "id_produk" : 2,
            "kuantitas" : 10
        },
        {
            "id_produk" : 7,
            "kuantitas" : 20
        },
        {
            "id_produk" : 8,
            "kuantitas" : 50
        }
    ]
}
```

##### Response
1. Response Berhasil
```json
{
    "message": "Pemesanan produk berhasil dibuat",
    "data": {
        "no_pesanan": "PS/6/10/28052023/1685270465",
        "tanggal_pesanan": "2023-05-28 17:41:05",
        "total": 3684200
    }
}
```
2. Response Gagal
```json
{
    "error": "Pelanggan tidak terdaftar, pesanan tidak bisa diproses"
}
```

#### Endpoint Membatalkan Pesanan [POST  /api/order/cancel]
Ini merupakan endpoint yang digunakan pelanggan untuk melakukan pembatalan pesanan, `no_pesanan` didapat dari respose saat melakukan pesanan
##### Body Payload
```json
{
    "no_telp":"6289639534895",
    "no_pesanan" : "PS/6/10/28052023/1685255172"
}
```

##### Response
1. Response Berhasil
```json
{
    "message": "Proses pembatalan pesanan berhasil"
}
```
2. Response Gagal
```json
{
    "error": "Pelanggan tidak terdaftar"
}
```

#### Endpoint Mengganti Status Pesanan [PUT  /api/marketing/order/:id_pesanan]
Ini merupakan endpoint yang digunakan marketing untuk melakukan penggantian status pesanan
##### Body Payload
```json
{
    "status_pesanan" : "Sudah Bayar"
}
```

##### Response
1. Response Berhasil
```json
{
    "message": "Proses mengganti status pesanan berhasil"
}
```
2. Response Gagal
```json
{
    "error": "Pesanan tidak terdaftar"
}
```

#### Endpoint Mengambil Data Pelanggan [GET  /api/marketing/customer]
Ini merupakan endpoint yang digunakan marketing untuk mengambil data pelanggan yang mempunyai pesanan

##### Response
1. Response Berhasil
```json
{
    "message": "Data pelanggan berhasil diambil",
    "data": [
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "jenis_usaha": "Kafe",
            "no_telp": "6289661983274",
            "id_cabang": 2,
            "nama_cabang": "Cabang Jatinegara",
            "kota": "Jakarta Timur",
            "kebutuhan_produk": "Karkas,Ati ampela",
            "rata_rata_kuantitas_produk": "5kg"
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "jenis_usaha": "Kafe",
            "no_telp": "6289661983274",
            "id_cabang": 1,
            "nama_cabang": "Cabang Rawamangun",
            "kota": "Jakarta Timur",
            "kebutuhan_produk": "Karkas,Ati ampela",
            "rata_rata_kuantitas_produk": "10kg"
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "jenis_usaha": "Restoran",
            "no_telp": "6285316220887",
            "id_cabang": 4,
            "nama_cabang": "Cabang Senen",
            "kota": "Jakarta Pusat",
            "kebutuhan_produk": "Karkas,Boneless",
            "rata_rata_kuantitas_produk": "12kg"
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "jenis_usaha": "Restoran",
            "no_telp": "6285316220887",
            "id_cabang": 3,
            "nama_cabang": "Cabang Tebet",
            "kota": "Jakarta Selatan",
            "kebutuhan_produk": "Karkas,Boneless",
            "rata_rata_kuantitas_produk": "8kg"
        },
        {
            "id_pelanggan": 3,
            "nama_brand": "Brand C",
            "jenis_usaha": "Warung Makan",
            "no_telp": "6283965323583",
            "id_cabang": 5,
            "nama_cabang": "Cabang Matraman",
            "kota": "Jakarta Timur",
            "kebutuhan_produk": "Boneless",
            "rata_rata_kuantitas_produk": "15kg"
        }
    ]
}
```

#### Endpoint Mengambil Data Pesanan [GET  /api/marketing/order]
Ini merupakan endpoint yang digunakan marketing untuk mengambil data pesanan yang dilakukan oleh pelanggan

##### Response
1. Response Berhasil
```json
{
    "message": "Data pesanan berhasil diambil",
    "data": [
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 1,
            "nama_cabang": "Cabang Rawamangun",
            "kota": "Jakarta Timur",
            "id_produk": 1,
            "nama_produk": "Karkas",
            "klasifikasi": "0.4 - 0.7",
            "harga": 43500,
            "id_pesanan": 1,
            "no_pesanan": "PS/1/1/29052023/1685341642",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:27:22.000Z",
            "kuantitas": 20,
            "subtotal": 609000
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 1,
            "nama_cabang": "Cabang Rawamangun",
            "kota": "Jakarta Timur",
            "id_produk": 2,
            "nama_produk": "Karkas",
            "klasifikasi": "0.7 - 1.2",
            "harga": 41600,
            "id_pesanan": 1,
            "no_pesanan": "PS/1/1/29052023/1685341642",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:27:22.000Z",
            "kuantitas": 30,
            "subtotal": 1497600
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 1,
            "nama_cabang": "Cabang Rawamangun",
            "kota": "Jakarta Timur",
            "id_produk": 3,
            "nama_produk": "Karkas",
            "klasifikasi": "1.2 - 1.5",
            "harga": 40500,
            "id_pesanan": 1,
            "no_pesanan": "PS/1/1/29052023/1685341642",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:27:22.000Z",
            "kuantitas": 40,
            "subtotal": 2430000
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 2,
            "nama_cabang": "Cabang Jatinegara",
            "kota": "Jakarta Timur",
            "id_produk": 1,
            "nama_produk": "Karkas",
            "klasifikasi": "0.4 - 0.7",
            "harga": 43500,
            "id_pesanan": 2,
            "no_pesanan": "PS/1/2/29052023/1685341657",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:27:37.000Z",
            "kuantitas": 30,
            "subtotal": 913500
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 2,
            "nama_cabang": "Cabang Jatinegara",
            "kota": "Jakarta Timur",
            "id_produk": 2,
            "nama_produk": "Karkas",
            "klasifikasi": "0.7 - 1.2",
            "harga": 41600,
            "id_pesanan": 2,
            "no_pesanan": "PS/1/2/29052023/1685341657",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:27:37.000Z",
            "kuantitas": 40,
            "subtotal": 1996800
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 2,
            "nama_cabang": "Cabang Jatinegara",
            "kota": "Jakarta Timur",
            "id_produk": 3,
            "nama_produk": "Karkas",
            "klasifikasi": "1.2 - 1.5",
            "harga": 40500,
            "id_pesanan": 2,
            "no_pesanan": "PS/1/2/29052023/1685341657",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:27:37.000Z",
            "kuantitas": 60,
            "subtotal": 3645000
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 1,
            "nama_cabang": "Cabang Rawamangun",
            "kota": "Jakarta Timur",
            "id_produk": 4,
            "nama_produk": "Ati ampela",
            "klasifikasi": "Bersih",
            "harga": 22500,
            "id_pesanan": 3,
            "no_pesanan": "PS/1/1/29052023/1685341698",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:28:18.000Z",
            "kuantitas": 50,
            "subtotal": 225000
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 1,
            "nama_cabang": "Cabang Rawamangun",
            "kota": "Jakarta Timur",
            "id_produk": 5,
            "nama_produk": "Ati ampela",
            "klasifikasi": "Kotor",
            "harga": 21500,
            "id_pesanan": 3,
            "no_pesanan": "PS/1/1/29052023/1685341698",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:28:18.000Z",
            "kuantitas": 50,
            "subtotal": 215000
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 1,
            "nama_cabang": "Cabang Rawamangun",
            "kota": "Jakarta Timur",
            "id_produk": 6,
            "nama_produk": "Boneless",
            "klasifikasi": "Dada",
            "harga": 53500,
            "id_pesanan": 3,
            "no_pesanan": "PS/1/1/29052023/1685341698",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:28:18.000Z",
            "kuantitas": 50,
            "subtotal": 2675000
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 2,
            "nama_cabang": "Cabang Jatinegara",
            "kota": "Jakarta Timur",
            "id_produk": 1,
            "nama_produk": "Karkas",
            "klasifikasi": "0.4 - 0.7",
            "harga": 43500,
            "id_pesanan": 4,
            "no_pesanan": "PS/1/2/29052023/1685341717",
            "status_pesanan": "Belum Bayar",
            "tanggal_pesanan": "2023-05-29T06:28:37.000Z",
            "kuantitas": 20,
            "subtotal": 609000
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 2,
            "nama_cabang": "Cabang Jatinegara",
            "kota": "Jakarta Timur",
            "id_produk": 2,
            "nama_produk": "Karkas",
            "klasifikasi": "0.7 - 1.2",
            "harga": 41600,
            "id_pesanan": 4,
            "no_pesanan": "PS/1/2/29052023/1685341717",
            "status_pesanan": "Belum Bayar",
            "tanggal_pesanan": "2023-05-29T06:28:37.000Z",
            "kuantitas": 20,
            "subtotal": 998400
        },
        {
            "id_pelanggan": 1,
            "nama_brand": "Brand A",
            "id_cabang": 2,
            "nama_cabang": "Cabang Jatinegara",
            "kota": "Jakarta Timur",
            "id_produk": 3,
            "nama_produk": "Karkas",
            "klasifikasi": "1.2 - 1.5",
            "harga": 40500,
            "id_pesanan": 4,
            "no_pesanan": "PS/1/2/29052023/1685341717",
            "status_pesanan": "Belum Bayar",
            "tanggal_pesanan": "2023-05-29T06:28:37.000Z",
            "kuantitas": 20,
            "subtotal": 1215000
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "id_cabang": 3,
            "nama_cabang": "Cabang Tebet",
            "kota": "Jakarta Selatan",
            "id_produk": 6,
            "nama_produk": "Boneless",
            "klasifikasi": "Dada",
            "harga": 53500,
            "id_pesanan": 5,
            "no_pesanan": "PS/2/3/29052023/1685341762",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:29:22.000Z",
            "kuantitas": 20,
            "subtotal": 1070000
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "id_cabang": 3,
            "nama_cabang": "Cabang Tebet",
            "kota": "Jakarta Selatan",
            "id_produk": 7,
            "nama_produk": "Boneless",
            "klasifikasi": "Paha",
            "harga": 51500,
            "id_pesanan": 5,
            "no_pesanan": "PS/2/3/29052023/1685341762",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:29:22.000Z",
            "kuantitas": 30,
            "subtotal": 1545000
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "id_cabang": 3,
            "nama_cabang": "Cabang Tebet",
            "kota": "Jakarta Selatan",
            "id_produk": 2,
            "nama_produk": "Karkas",
            "klasifikasi": "0.7 - 1.2",
            "harga": 41600,
            "id_pesanan": 5,
            "no_pesanan": "PS/2/3/29052023/1685341762",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:29:22.000Z",
            "kuantitas": 50,
            "subtotal": 2496000
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "id_cabang": 3,
            "nama_cabang": "Cabang Tebet",
            "kota": "Jakarta Selatan",
            "id_produk": 6,
            "nama_produk": "Boneless",
            "klasifikasi": "Dada",
            "harga": 53500,
            "id_pesanan": 6,
            "no_pesanan": "PS/2/3/29052023/1685341791",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:29:51.000Z",
            "kuantitas": 10,
            "subtotal": 535000
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "id_cabang": 3,
            "nama_cabang": "Cabang Tebet",
            "kota": "Jakarta Selatan",
            "id_produk": 7,
            "nama_produk": "Boneless",
            "klasifikasi": "Paha",
            "harga": 51500,
            "id_pesanan": 6,
            "no_pesanan": "PS/2/3/29052023/1685341791",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:29:51.000Z",
            "kuantitas": 20,
            "subtotal": 1030000
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "id_cabang": 3,
            "nama_cabang": "Cabang Tebet",
            "kota": "Jakarta Selatan",
            "id_produk": 2,
            "nama_produk": "Karkas",
            "klasifikasi": "0.7 - 1.2",
            "harga": 41600,
            "id_pesanan": 6,
            "no_pesanan": "PS/2/3/29052023/1685341791",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:29:51.000Z",
            "kuantitas": 10,
            "subtotal": 499200
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "id_cabang": 4,
            "nama_cabang": "Cabang Senen",
            "kota": "Jakarta Pusat",
            "id_produk": 3,
            "nama_produk": "Karkas",
            "klasifikasi": "1.2 - 1.5",
            "harga": 40500,
            "id_pesanan": 7,
            "no_pesanan": "PS/2/4/29052023/1685341812",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:30:12.000Z",
            "kuantitas": 40,
            "subtotal": 2430000
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "id_cabang": 4,
            "nama_cabang": "Cabang Senen",
            "kota": "Jakarta Pusat",
            "id_produk": 4,
            "nama_produk": "Ati ampela",
            "klasifikasi": "Bersih",
            "harga": 22500,
            "id_pesanan": 7,
            "no_pesanan": "PS/2/4/29052023/1685341812",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:30:12.000Z",
            "kuantitas": 80,
            "subtotal": 360000
        },
        {
            "id_pelanggan": 2,
            "nama_brand": "Brand B",
            "id_cabang": 4,
            "nama_cabang": "Cabang Senen",
            "kota": "Jakarta Pusat",
            "id_produk": 5,
            "nama_produk": "Ati ampela",
            "klasifikasi": "Kotor",
            "harga": 21500,
            "id_pesanan": 7,
            "no_pesanan": "PS/2/4/29052023/1685341812",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:30:12.000Z",
            "kuantitas": 70,
            "subtotal": 301000
        },
        {
            "id_pelanggan": 3,
            "nama_brand": "Brand C",
            "id_cabang": 5,
            "nama_cabang": "Cabang Matraman",
            "kota": "Jakarta Timur",
            "id_produk": 8,
            "nama_produk": "Paha utuh",
            "klasifikasi": "",
            "harga": 43100,
            "id_pesanan": 8,
            "no_pesanan": "PS/3/5/29052023/1685341865",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:31:05.000Z",
            "kuantitas": 20,
            "subtotal": 862000
        },
        {
            "id_pelanggan": 3,
            "nama_brand": "Brand C",
            "id_cabang": 5,
            "nama_cabang": "Cabang Matraman",
            "kota": "Jakarta Timur",
            "id_produk": 1,
            "nama_produk": "Karkas",
            "klasifikasi": "0.4 - 0.7",
            "harga": 43500,
            "id_pesanan": 8,
            "no_pesanan": "PS/3/5/29052023/1685341865",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:31:05.000Z",
            "kuantitas": 80,
            "subtotal": 2436000
        },
        {
            "id_pelanggan": 3,
            "nama_brand": "Brand C",
            "id_cabang": 5,
            "nama_cabang": "Cabang Matraman",
            "kota": "Jakarta Timur",
            "id_produk": 2,
            "nama_produk": "Karkas",
            "klasifikasi": "0.7 - 1.2",
            "harga": 41600,
            "id_pesanan": 8,
            "no_pesanan": "PS/3/5/29052023/1685341865",
            "status_pesanan": "Sudah Bayar",
            "tanggal_pesanan": "2023-05-29T06:31:05.000Z",
            "kuantitas": 80,
            "subtotal": 3993600
        }
    ]
}
```

## Filter
### Analisis Filter
Dari kebutuhan yang disebutkan, tim marketing membutuhkan 1 fitur ringkasan yang berisi informasi sebagai berikut : 
1. Persentasi pelanggan yang melakukan pendaftar terhadap pelanggan yang melakukan pesanan
2. Persebaran kota yang melakukan pemesanan yang berisi info jumlah pelanggan dan kuantitas pesanan
3. Rangking pelanggan yang memiliki kuantitas pesanan terbesar
4.  Rangking produk yang paling banyak dipesan
5. Rangking pelanggan yang paling besar rata rata pembeliannya
6. Jumlah pemasukan

### Solusi Filter
Solusi yang dapat saya berikan adalah sebagai berikut:
1. Dibuatkan 1 fitur yang dapat menyajikan semua informasi yang dibutuhkan, dengan ketentuan sebagai berikut:
	- persentasi = (jumlah pelanggan yang pesanannya sudah bayar / jumlah pelanggan yang terdaftar) * 100
	- persebaran kota = berisi data data kota yang pesanannya sudah bayar, dengan menambahkan informasi jumlah pelanggan dikota tersebut dan jumlah pesanannya
	- rangking pelanggan = jumlah pelanggan yang pesanannya sudah bayar dan memiliki kuantitas paling banyak
	- rangking produk = jumlah produk yang paling banyak dipesan dengan pesanan yang sudah bayar
	- rangking pelanggan = jumlah rata rata pembelian pelanggan terbanyak dengan pesanan sudah bayar
	- jumlah pemasukan = total dari semua pesanan dengan pesanan sudah bayar

### Poc Filter 

#### Endpoint Ringkasan [GET /api/marketing/summary]
Ini merukan endpoint yang digunakan marketing untuk melihat ringkasan dari data registrasi dan pesanan yang masuk

##### Response 
```json
{
{
    "message": "Data ringkasan berhasil diambil",
    "data": {
        "persentase_registrasi_pesanan": "60.00%",
        "persebaran_kota": [
            {
                "nama_kota": "Jakarta Timur",
                "jumlah_pelanggan": 2,
                "jumlah_kuantitas": 550
            },
            {
                "nama_kota": "Jakarta Selatan",
                "jumlah_pelanggan": 1,
                "jumlah_kuantitas": 140
            },
            {
                "nama_kota": "Jakarta Pusat",
                "jumlah_pelanggan": 1,
                "jumlah_kuantitas": 190
            }
        ],
        "rangking_pelanggan": [
            {
                "nama_brand": "Brand A",
                "jumlah_kuantitas": 370
            },
            {
                "nama_brand": "Brand B",
                "jumlah_kuantitas": 330
            },
            {
                "nama_brand": "Brand C",
                "jumlah_kuantitas": 180
            }
        ],
        "rangking_produk": [
            {
                "nama_produk": "Karkas",
                "klasifikasi": "0.7 - 1.2",
                "jumlah_pesanan": 5
            },
            {
                "nama_produk": "Karkas",
                "klasifikasi": "0.4 - 0.7",
                "jumlah_pesanan": 3
            },
            {
                "nama_produk": "Karkas",
                "klasifikasi": "1.2 - 1.5",
                "jumlah_pesanan": 3
            },
            {
                "nama_produk": "Boneless",
                "klasifikasi": "Dada",
                "jumlah_pesanan": 3
            },
            {
                "nama_produk": "Ati ampela",
                "klasifikasi": "Bersih",
                "jumlah_pesanan": 2
            },
            {
                "nama_produk": "Ati ampela",
                "klasifikasi": "Kotor",
                "jumlah_pesanan": 2
            },
            {
                "nama_produk": "Boneless",
                "klasifikasi": "Paha",
                "jumlah_pesanan": 2
            },
            {
                "nama_produk": "Paha utuh",
                "klasifikasi": "",
                "jumlah_pesanan": 1
            }
        ],
        "rangking_rata_rata_pelanggan": [
            {
                "nama_brand": "Brand C",
                "jumlah_rata_rata_pesanan": 7291600
            },
            {
                "nama_brand": "Brand A",
                "jumlah_rata_rata_pesanan": 4735634
            },
            {
                "nama_brand": "Brand B",
                "jumlah_rata_rata_pesanan": 3422067
            }
        ],
        "jumlah_pemasukan": 31764700
    }
}
``` 

## Logical
### Rotasi String
Hasil tugas ini dapat dilihat di dalam folder `logical`
### Palindrome
Hasil tugas ini dapat dilihat di dalam folder `logical`