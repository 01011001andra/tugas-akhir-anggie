# Quick Start Guide - VertiGrow

## Untuk Mulai Menggunakan Aplikasi

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Jalankan Development Server

\`\`\`bash
npm run dev
\`\`\`

Server akan berjalan di `http://localhost:5173`

## Demo User Credentials

Aplikasi menggunakan localStorage, jadi tidak ada login real. Gunakan halaman ini untuk explore:

### URL Penting

**User Side:**

- Beranda: `http://localhost:5173/`
- Lihat Produk: `http://localhost:5173/products`
- Keranjang: `http://localhost:5173/cart`

**Admin Side:**

- Dashboard: `http://localhost:5173/admin`
- Kelola Produk: `http://localhost:5173/admin/products`
- Kelola User: `http://localhost:5173/admin/users`
- Notifikasi: `http://localhost:5173/admin/notifications`

## Fitur yang Sudah Tersedia

### ✅ User Features

- [x] Halaman Produk dengan Grid Layout
- [x] Filter Kategori Produk
- [x] Tombol Add to Cart
- [x] Keranjang Belanja
- [x] Update Quantity di Cart
- [x] Checkout Form
- [x] Data Tersimpan di localStorage

### ✅ Admin Features

- [x] Dashboard dengan Statistik
- [x] CRUD Produk Lengkap
- [x] CRUD User Lengkap
- [x] Notifikasi Admin
- [x] Sidebar Navigation
- [x] Admin Sidebar Component

### ✅ UI Components

- [x] DaisyUI Integration
- [x] Iconify React Icons
- [x] Responsive Design
- [x] Card Components
- [x] Modal Form
- [x] Table Components
- [x] Button Variants
- [x] Badge & Alert

## Testing Fitur

### Test Add to Cart

1. Go to `/products`
2. Klik tombol "Keranjang" pada produk
3. Check localStorage atau lihat cart badge di navbar
4. Go to `/cart` untuk lihat produk

### Test Admin CRUD

1. Go to `/admin/products`
2. Klik "Tambah Produk"
3. Isi form dan simpan
4. Edit atau hapus produk

### Test Notifikasi

1. Go to `/admin/notifications`
2. Klik "Simulasi Notifikasi Pesanan"
3. Notifikasi baru akan ditambahkan

## Data Demo

**Produk:**

1. Tanaman Hias Monstera - Rp 150.000
2. Tanaman Bunga Mawar - Rp 75.000
3. Tanaman Kaktus Mini - Rp 45.000
4. Tanaman Lidah Mertua - Rp 95.000

**User:**

- Budi Santoso (budi@example.com, 081234567890)

## Struktur Folder

\`\`\`
src/
├── Pages/
│ ├── Home.jsx (Halaman utama)
│ ├── Tentang.jsx (Tentang kami)
│ ├── Layanan.jsx (Layanan)
│ ├── Masuk.jsx (Login page)
│ ├── Daftar.jsx (Register page)
│ ├── ProductList.jsx (Halaman produk)
│ ├── Cart.jsx (Halaman cart)
│ └── Admin/
│ ├── Dashboard.jsx (Admin dashboard)
│ ├── Products.jsx (CRUD produk)
│ ├── Users.jsx (CRUD user)
│ └── Notifications.jsx (Notifikasi)
├── Components/
│ ├── Navbar.jsx (Navigation bar)
│ ├── Footer.jsx (Footer)
│ ├── AdminSidebar.jsx (Admin sidebar)
│ └── ...
├── utils/
│ └── storage.js (localStorage helpers)
├── App.jsx (Main app router)
└── index.css (Tailwind CSS)
\`\`\`

## Customization

### Ubah Tema Warna

Edit di `tailwind.config.js` dan `index.css`

### Ubah Logo

Ganti file di `/src/assets/Logo/`

### Ubah Data Demo

Edit di `App.jsx` function `useEffect` pada baris initalisasi data

## Troubleshooting

**Cart tidak update?**

- Clear browser cache
- Check localStorage di DevTools (F12 > Application > LocalStorage)

**Styling tidak tampil?**

- Pastikan DaisyUI sudah di-install: `npm install daisyui`
- Clear node_modules dan install ulang: `rm -rf node_modules && npm install`

**Icons tidak tampil?**

- Install Iconify React: `npm install @iconify/react`
- Restart dev server

## Next Steps

1. Connect ke Real Backend API
2. Implementasi Autentikasi Real (JWT, OAuth)
3. Tambah Payment Gateway (Stripe, etc)
4. Setup Database (MongoDB, PostgreSQL)
5. Deploy ke Vercel, Netlify, atau server lain

---

Happy coding! Jika ada pertanyaan, cek README.md untuk dokumentasi lengkap.
