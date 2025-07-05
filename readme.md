# Simple Express Backend API

API base URL:  
`https://simple-express-backend-production.up.railway.app/api/v1/`

---

## 📦 Fitur Utama

- **User Authentication** (Register, Login, Profile, Reset Password)
- **Manajemen Kategori Transaksi** (CRUD)
- **Manajemen Transaksi** (CRUD, filter by user)
- **Validasi input** dengan Joi
- **JWT Authentication** untuk proteksi endpoint
- **Logging** dengan Morgan & Winston
- **ORM** dengan Prisma
- **Database** MySQL

---

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
| POST   | `/auth/register`        | `{ name, email, password, password_confirmation }` | Register user baru    |
| POST   | `/auth/login`           | `{ email, password }`                  | Login user, dapatkan token |
| POST   | `/auth/me`              | -                                      | Get profile user login (token) |
| PATCH  | `/auth/me`              | `{ name?, email? }`                    | Update profile user   |
| PATCH  | `/auth/reset-password`  | `{ password, password_confirmation }`  | Reset password user   |
| DELETE | `/auth/me`              | -                                      | Hapus user login      |

### Transaction Category
| Method | Endpoint                | Body / Params                          | Keterangan            |
|--------|-------------------------|----------------------------------------|-----------------------|
| POST   | `/categories`           | `{ name, description? }`               | Tambah kategori       |
| GET    | `/categories`           | -                                      | List kategori         |
| GET    | `/categories/:id`       | -                                      | Detail kategori       |
| PATCH  | `/categories/:id`       | `{ name?, description? }`              | Update kategori       |
| DELETE | `/categories/:id`       | -                                      | Hapus kategori        |

### Transaction
| Method | Endpoint                | Body / Params                          | Keterangan            |
|--------|-------------------------|----------------------------------------|-----------------------|
| POST   | `/transactions`         | `{ category_id, type, amount, description? }` | Tambah transaksi      |
| GET    | `/transactions`         | -                                      | List transaksi user login |
| GET    | `/transactions/all`     | -                                      | List semua transaksi (admin) |
| GET    | `/transactions/user/:user_id` | -                                 | List transaksi by user id (admin) |
| GET    | `/transactions/:id`     | -                                      | Detail transaksi       |
| PATCH  | `/transactions/:id`     | `{ category_id?, type?, amount?, description? }` | Update transaksi      |
| DELETE | `/transactions/:id`     | -                                      | Hapus transaksi        |

---

## 🗂️ Contoh Request/Response

### AUTH

#### **Register**
**POST** `/auth/register`
```json
// Request Body
{
  "name": "Budi",
  "email": "budi@mail.com",
  "password": "Password123!",
  "password_confirmation": "Password123!"
}
```
**Response**
```json
{
  "success": true,
  "status": "Created",
  "message": "Register success",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Budi",
      "email": "budi@mail.com"
    }
  }
}
```

---

#### **Login**
**POST** `/auth/login`
```json
// Request Body
{
  "email": "budi@mail.com",
  "password": "Password123!"
}
```
**Response**
```json
{
  "success": true,
  "status": "OK",
  "message": "Login success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "budi@mail.com",
      "name": "Budi"
    },
    "token": "jwt-token"
  }
}
```

---

#### **Get Profile**
**POST** `/auth/me`
```json
// Request Body
{
  "id": "user-uuid"
}
```
**Headers:**  
`Authorization: Bearer <token>`

**Response**
```json
{
  "success": true,
  "status": "OK",
  "message": "Fetch user data success",
  "data": {
    "user": {
      "name": "Budi",
      "email": "budi@mail.com",
      "created_at": "2025-07-05T12:00:00.000Z",
      "updated_at": "2025-07-05T12:00:00.000Z"
    }
  }
}
```

---

#### **Reset Password**
**PATCH** `/auth/reset-password`
```json
// Request Body
{
  "password": "PasswordBaru123!",
  "password_confirmation": "PasswordBaru123!"
}
```
**Headers:**  
`Authorization: Bearer <token>`

**Response**
```json
{
  "success": true,
  "status": "OK",
  "message": "Reset password success",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Budi",
      "email": "budi@mail.com",
      "createdAt": "2025-07-05T12:00:00.000Z",
      "updatedAt": "2025-07-05T12:00:00.000Z"
    }
  }
}
```

---

### TRANSACTION CATEGORY

#### **Tambah Kategori**
**POST** `/categories`
```json
// Request Body
{
  "name": "Makanan",
  "description": "Pengeluaran untuk makan harian"
}
```
**Headers:**  
`Authorization: Bearer <token>`

**Response**
```json
{
  "success": true,
  "status": "Created",
  "message": "Category created",
  "data": {
    "category": {
      "id": "uuid-category",
      "name": "Makanan",
      "description": "Pengeluaran untuk makan harian",
      "createdAt": "2025-07-05T12:00:00.000Z",
      "updatedAt": "2025-07-05T12:00:00.000Z"
    }
  }
}
```

---

#### **List Kategori**
**GET** `/categories`
**Headers:**  
`Authorization: Bearer <token>`

**Response**
```json
{
  "success": true,
  "status": "OK",
  "message": "Fetch categories success",
  "data": {
    "categories": [
      {
        "id": "uuid-category",
        "name": "Makanan",
        "description": "Pengeluaran untuk makan harian",
        "createdAt": "2025-07-05T12:00:00.000Z",
        "updatedAt": "2025-07-05T12:00:00.000Z"
      }
    ]
  }
}
```

---

#### **Update Kategori**
**PATCH** `/categories/:id`
```json
// Request Body
{
  "name": "Transportasi"
}
```
**Headers:**  
`Authorization: Bearer <token>`

---

#### **Delete Kategori**
**DELETE** `/categories/:id`
**Headers:**  
`Authorization: Bearer <token>`

---

### TRANSACTION

#### **Tambah Transaksi**
**POST** `/transactions`
```json
// Request Body
{
  "category_id": "uuid-category",
  "type": "INCOME",
  "amount": 100000,
  "description": "Gaji"
}
```
**Headers:**  
`Authorization: Bearer <token>`

**Response**
```json
{
  "success": true,
  "status": "Created",
  "message": "Transaction created",
  "data": {
    "transaction": {
      "id": "uuid-trx",
      "user_id": "uuid-user",
      "category_id": "uuid-category",
      "type": "INCOME",
      "amount": 100000,
      "description": "Gaji",
      "createdAt": "2025-07-05T12:00:00.000Z",
      "updatedAt": "2025-07-05T12:00:00.000Z",
      "category": {
        "id": "uuid-category",
        "name": "Makanan"
      }
    }
  }
}
```

---

#### **List Transaksi User**
**GET** `/transactions`
**Headers:**  
`Authorization: Bearer <token>`

---

#### **List Semua Transaksi (Admin)**
**GET** `/transactions/all`
**Headers:**  
`Authorization: Bearer <token>`

---

#### **List Transaksi by User Id (Admin)**
**GET** `/transactions/user/:user_id`
**Headers:**  
`Authorization: Bearer <token>`

---

#### **Detail Transaksi**
**GET** `/transactions/:id`
**Headers:**  
`Authorization: Bearer <token>`

---

#### **Update Transaksi**
**PATCH** `/transactions/:id`
```json
// Request Body
{
  "amount": 200000
}
```
**Headers:**  
`Authorization: Bearer <token>`

---

#### **Delete Transaksi**
**DELETE** `/transactions/:id`
**Headers:**  
`Authorization: Bearer <token>`

---