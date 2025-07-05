# Simple Express Backend API

Proyek sederhana pengelola keuangan menggunakan Express.js

## 📦 Fitur Utama

- **User Authentication** (Register, Login, Profile, Reset Password)
- **Manajemen Kategori Transaksi** (CRUD)
- **Manajemen Transaksi** (CRUD, filter by user)
- **Validasi input** dengan Joi
- **JWT Authentication** untuk proteksi endpoint
- **Logging** dengan Morgan & Winston
- **ORM** dengan Prisma
- **Database** MySQL
- **Deployment** dengan Railway

---

## 🗂️ Struktur Folder 

```
Project/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
|
├── src/
│   ├── app.js
│   ├── server.js
│   ├── utils/
│   ├── errors/
│   ├── middlewares/
│   └── domains/
│       ├── auth/
│       ├── transaction/
│       └── transaction_category/
|
├── .env
```

**Keterangan:**
- `prisma/` — berisi schema dan migrasi database Prisma.
- `src/` — seluruh source code aplikasi.
  - `utils/` — utilitas umum (logger, response, db).
  - `errors/` — handler dan definisi error.
  - `middlewares/` — middleware Express (auth, validator).
  - `domains/` — modularisasi fitur utama (auth, transaction, transaction_category).
- `.env` — konfigurasi environment (port, database, jwt secret).
- `package.json` — dependensi dan script npm.
- `readme.md` — dokumentasi proyek.

## 🔌 Plugin/Library yang Digunakan

- **mysql2** — koneksi MySQL (digunakan oleh Prisma)
- **@prisma/client & prisma** — ORM modern untuk Node.js
- **jsonwebtoken** — autentikasi JWT
- **morgan** — HTTP request logger middleware untuk Express
- **winston** — logger fleksibel untuk Node.js
- **joi** — validasi input
- **dotenv** — load environment variable

---

## 🗂️ Struktur Endpoint

### Auth
| Method | Endpoint                | Body / Params                          | Keterangan            |
|--------|-------------------------|----------------------------------------|-----------------------|
| GET   | `/auth/users  `          | -                                      | List semua user    |
| POST   | `/auth/register`        | `{ name, email, password, password_confirmation }` | Register user baru    |
| POST   | `/auth/login`           | `{ email, password }`                  | Login user, dapatkan token |
| POST   | `/auth/me`              | `{ id }`                               | Data profile user login |
| PATCH  | `/auth/me`              | `{ name?, email? }`                    | Update profile user   |
| PATCH  | `/auth/reset-password`  | `{ password, password_confirmation }`  | Reset password user   |
| DELETE | `/auth/me`              | -                                      | Hapus user login      |

### Transaction Category
| Method | Endpoint                | Body / Params                          | Keterangan            |
|--------|-------------------------|----------------------------------------|-----------------------|
| POST   | `/categories/`          | `{ name, description? }`               | Tambah kategori       |
| GET    | `/categories/`          | -                                      | List kategori         |
| GET    | `/categories/:id`       | -                                      | Data kategori transaksi berdasarkan id       |
| PATCH  | `/categories/:id`       | `{ name?, description? }`              | Update kategori       |
| DELETE | `/categories/:id`       | -                                      | Hapus kategori        |

### Transaction
| Method | Endpoint                | Body / Params                          | Keterangan            |
|--------|-------------------------|----------------------------------------|-----------------------|
| POST   | `/transactions/`        | `{ category_id, type, amount, description? }` | Tambah transaksi      |
| GET    | `/transactions/`        | -                                      | List semua transaksi |    |
| GET  | `/transactions/:id`       | -                                      | Data transaksi berdasarkan id      |
| PATCH  | `/transactions/:id`     | `{ category_id?, type?, amount?, description? }` | Update transaksi      |
| DELETE | `/transactions/:id`     | - | Hapus transaksi                    |

---

## 🚀 Cara Setup & Menjalankan Secara Lokal

1. **Clone repository ini**
   ```sh
   git clone https://github.com/Admltfr/Simple-Express-Backend
   cd Simple-Express-Backend/
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set file environment**
   ```sh
   cp .env.example .env
   ```
   Lalu edit `.env` dan sesuaikan:
   - `DATABASE_URL` (contoh: `mysql://root:password@localhost:3306/nama_db`)
   - `JWT_SECRET`
   - `PORT` (contoh: 3000)

4. **Jalankan migrasi database**
   ```sh
   npx prisma migrate dev
   ```

5. **Jalankan server**
   ```sh
   npm run dev
   ```
   Atau
   ```sh
   npm run start
   ```
   API akan berjalan di `http://localhost:3000/api/v1/` (atau port sesuai `.env`).

---

## 🌐 Menggunakan Domain yang Sudah Dideploy (Railway)

- **API base URL:**  
  ```
  https://simple-express-backend-production.up.railway.app/api/v1/
  ```

- Gunakan URL di atas pada Postman, aplikasi frontend, atau tools lain untuk akses API secara online.
- Semua endpoint sama seperti di lokal, hanya ganti base URL.
  ```
  http://localhost:3000/api/v1/
  ```
  Ubah menjadi
  ```
  https://simple-express-backend-production.up.railway.app/api/v1/
  ```
- Catatan : Kalau errcon berarti trial railwaynya sudah habis

---