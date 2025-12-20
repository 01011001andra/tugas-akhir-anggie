# VertiGrow - Aplikasi E-Commerce Tanaman Online

Aplikasi full-stack e-commerce untuk menjual tanaman hias dengan fitur admin dashboard, product management, user management, dan notification system.

## Fitur Utama

### User Side (Pelanggan)
- **Halaman Beranda** - Landing page dengan navigasi utama
- **Halaman Produk** - Daftar tanaman dengan filter kategori (Hias, Bunga, Kaktus)
- **Halaman Detail Produk** - Informasi lengkap dengan gambar, harga, dan rating
- **Keranjang Belanja** - Tambah/hapus/update quantity produk
- **Checkout** - Form pengiriman dan pemesanan
- **Penyimpanan Data** - Menggunakan localStorage untuk cart

### Admin Side
- **Dashboard** - Overview statistik (Total Produk, User, Pesanan, Revenue)
- **Kelola Produk** - CRUD (Create, Read, Update, Delete) produk tanaman
- **Kelola User** - CRUD data user/pelanggan
- **Notifikasi** - Sistem notifikasi untuk pesanan dan aktivitas admin

## Teknologi yang Digunakan

- **React 18.3.1** - Frontend library
- **React Router DOM 6.28.0** - Routing
- **Tailwind CSS 3.4.15** - Styling framework
- **DaisyUI 4.12.10** - Component library
- **Iconify React 4.1.1** - Icon library
- **Vite 5.4.10** - Build tool
- **localStorage** - Data persistence

## Struktur Project

\`\`\`
src/
├── Pages/
│   ├── Home.jsx
│   ├── ProductList.jsx
│   ├── Cart.jsx
│   └── Admin/
│       ├── Dashboard.jsx
│       ├── Products.jsx
│       ├── Users.jsx
│       └── Notifications.jsx
├── Components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── AdminSidebar.jsx
│   └── ...
├── App.jsx
├── main.jsx
└── index.css
\`\`\`

## Instalasi & Menjalankan

### Prerequisites
- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn

### Langkah Instalasi

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Menjalankan development server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build untuk production**
   \`\`\`bash
   npm run build
   \`\`\`

## Fitur Detail

### 1. Halaman Produk
- Menampilkan grid produk dengan gambar, nama, harga, dan rating
- Filter produk berdasarkan kategori
- Tombol "Keranjang" untuk menambahkan produk ke cart
- Data disimpan di localStorage

### 2. Halaman Cart
- Menampilkan list produk di keranjang
- Fitur update quantity dengan tombol +/-
- Fitur hapus produk
- Ringkasan pesanan (subtotal, ongkir, total)
- Form checkout dengan data pengiriman
- Simulasi proses checkout

### 3. Admin Dashboard
- Statistik real-time dari semua data
- Quick action buttons untuk navigasi cepat
- Card-based UI untuk visualisasi data

### 4. Kelola Produk (Admin)
- Daftar semua produk dalam tabel
- Tombol tambah produk baru
- Edit produk dengan modal form
- Hapus produk dengan konfirmasi
- Kategori produk (Hias, Bunga, Kaktus)

### 5. Kelola User (Admin)
- Daftar semua user dalam tabel
- Tambah user baru
- Edit data user
- Hapus user dengan konfirmasi
- Tracking tanggal user bergabung

### 6. Notifikasi Admin
- Daftar notifikasi dengan tipe berbeda (order, user, product, message)
- Fitur mark as read
- Hapus notifikasi individual
- Clear all notifications
- Simulasi notifikasi pesanan baru

## Data Demo

Aplikasi dilengkapi dengan data demo yang otomatis diload:

### Produk Demo (4 items)
- Tanaman Hias Monstera (Rp 150.000)
- Tanaman Bunga Mawar (Rp 75.000)
- Tanaman Kaktus Mini (Rp 45.000)
- Tanaman Lidah Mertua (Rp 95.000)

### User Demo (1 user)
- Budi Santoso (budi@example.com)

## Navigasi URL

### User Routes
- `/` - Beranda
- `/products` - Halaman Produk
- `/cart` - Keranjang Belanja
- `/tentang` - Tentang Kami
- `/layanan` - Layanan Kami
- `/masuk` - Login
- `/daftar` - Daftar

### Admin Routes
- `/admin` - Admin Dashboard
- `/admin/products` - Kelola Produk
- `/admin/users` - Kelola User
- `/admin/notifications` - Notifikasi

## localStorage Keys

- `products` - Menyimpan daftar semua produk
- `cart` - Menyimpan item di keranjang
- `users` - Menyimpan data user
- `notifications` - Menyimpan notifikasi admin

## Fitur Tambahan

- **Responsive Design** - Mobile-friendly dengan breakpoint Tailwind
- **Toast Notification** - Pemberitahuan ketika produk ditambahkan ke cart
- **Icon Integration** - Menggunakan Iconify React untuk icon yang cantik
- **DaisyUI Components** - Button, Card, Modal, Table, Input, Select, etc.

## Next Steps (Pengembangan Lanjutan)

- Integrasi dengan backend API
- Sistem autentikasi real
- Payment gateway integration
- Email notification system
- Image upload functionality
- Advanced search & filter
- Product reviews & ratings
- Order tracking
- Analytics dashboard

---

Dibuat dengan ❤️ menggunakan React, Tailwind CSS, dan DaisyUI
