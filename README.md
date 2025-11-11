# 🚗 Dashboard Manajemen Kendaraan

<div align="center">
  <img src="img/demo.jpg" alt="Demo Aplikasi" width="800"/>
</div>

<p align="center">
  <strong>Dashboard Manajemen Kendaraan</strong> adalah aplikasi web lengkap untuk mengelola data kendaraan dan pengguna dengan antarmuka yang intuitif dan API yang kuat.
</p>


---

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version"/>
  <img src="https://img.shields.io/badge/License-ISC-green?style=for-the-badge" alt="License"/>
</div>

## 🛠️ Tech Stack

### Frontend
<div align="center">
  <img src="https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-7.1+-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4.1+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
  <br/>
  <img src="https://img.shields.io/badge/Axios-1.13+-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <img src="https://img.shields.io/badge/React_Router-6.30+-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router"/>
  <img src="https://img.shields.io/badge/Zustand-5.0+-000000?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand"/>
  <img src="https://img.shields.io/badge/Lucide_React-0.553+-000000?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide React"/>
</div>

### Backend
<div align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-5.1+-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Prisma-6.19+-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <br/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Swagger-5.0+-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger"/>
  <img src="https://img.shields.io/badge/JWT-9.0+-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Bcrypt-6.0+-000000?style=for-the-badge&logo=bcrypt&logoColor=white" alt="Bcrypt"/>
</div>

## 🚀 Cara Instal Aplikasi

### 🐳 Menggunakan Docker (Direkomendasikan)

<div align="center">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose"/>
</div>

Pastikan Anda telah menginstal [Docker](https://www.docker.com/) dan [Docker Compose](https://docs.docker.com/compose/) di sistem Anda.

1. **Clone repository ini:**
   ```bash
   git clone <repository-url>
   cd full-stack-widya-group
   ```

2. **Jalankan aplikasi dengan Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Aplikasi akan berjalan di:**
   - 🌐 **Frontend**: [http://localhost:5173](http://localhost:5173)
   - 🔧 **Backend API**: [http://localhost:3000](http://localhost:3000)
   - 🗄️ **PgAdmin**: [http://localhost:8080](http://localhost:8080) (Email: admin@admin.com, Password: admin)

### 💻 Menjalankan Lokal Tanpa Docker

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
</div>

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 20+) dan [PostgreSQL](https://www.postgresql.org/) di sistem Anda.

1. **Clone repository ini:**
   ```bash
   git clone <repository-url>
   cd full-stack-widya-group
   ```

2. **Setup Database:**
   - Buat database PostgreSQL baru dengan nama `mydb`
   - Pastikan PostgreSQL berjalan di port 5432 (default)

3. **Setup Backend:**
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev --name init
   npm run dev
   ```

4. **Setup Frontend (di terminal baru):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Aplikasi akan berjalan di:**
   - 🌐 **Frontend**: [http://localhost:5173](http://localhost:5173)
   - 🔧 **Backend API**: [http://localhost:3000](http://localhost:3000)

## 🌍 Environment

Aplikasi ini menggunakan environment development dengan layanan Docker berikut:
- **PostgreSQL**: Database utama
- **PgAdmin**: Interface web untuk mengelola database
- **Backend**: API server dengan Express dan Prisma
- **Frontend**: Aplikasi React dengan Vite

## 🔌 Port yang Digunakan

| Layanan    | Port Development | Port Production |
|------------|------------------|-----------------|
| Frontend  | 5173            | 80             |
| Backend   | 3000            | 3000           |
| PostgreSQL| 5435            | -              |
| PgAdmin   | 8080            | -              |

## 📚 Link Swagger

<div align="center">
  <a href="http://localhost:3000/api-docs" target="_blank">
    <img src="https://img.shields.io/badge/Swagger_API_Docs-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger API Docs"/>
  </a>
</div>

Dokumentasi API lengkap tersedia di: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 👤 Demo Account

<div align="center">
  <table>
    <tr>
      <th>Role</th>
      <th>Email</th>
      <th>Password</th>
    </tr>
    <tr>
      <td>👑 Admin</td>
      <td>admin@example.com</td>
      <td>123456</td>
    </tr>
    <tr>
      <td>👤 User</td>
      <td>budi.santoso@example.com</td>
      <td>123456</td>
    </tr>
  </table>
</div>

## ⚙️ Environment Variables

### Backend

#### Local Development
```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/live-code?schema=public"
JWT_SECRET="data_aman"
ENC_SECRET="data_terlindungi"
PORT=3000
```

#### Docker Environment
```env
DATABASE_URL="postgresql://postgres:postgres@postgres_db:5432/mydb?schema=public"
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=mydb
JWT_SECRET="data_aman"
ENC_SECRET="data_terlindungi"
```

### Frontend
```env
PORT=5173
```

---


