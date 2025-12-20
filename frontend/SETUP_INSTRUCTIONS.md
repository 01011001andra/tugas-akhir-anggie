# Setup Instructions - VertiGrow E-Commerce

## Persyaratan Sistem

- Node.js version 16.x atau lebih tinggi
- npm version 8.x atau lebih tinggi
- Browser modern (Chrome, Firefox, Safari, Edge)

## Langkah 1: Install Dependencies

\`\`\`bash
npm install
\`\`\`

Package yang akan di-install:

- ✅ `react@18.3.1` - React library
- ✅ `react-dom@18.3.1` - React DOM
- ✅ `react-router-dom@6.28.0` - Routing
- ✅ `tailwindcss@3.4.15` - CSS framework
- ✅ `daisyui@4.12.10` - Component library **BARU**
- ✅ `@iconify/react@4.1.1` - Icon library **BARU**
- ✅ `axios@1.7.7` - HTTP client
- ✅ `vite@5.4.10` - Build tool

## Langkah 2: Verifikasi Instalasi

Jalankan command berikut untuk check package:
\`\`\`bash
npm list daisyui
npm list @iconify/react
\`\`\`

Pastikan keduanya ter-install dengan benar.

## Langkah 3: Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Expected output:
\`\`\`
VITE v5.4.10 ready in XXX ms

➜ Local: http://localhost:5173/
➜ Press h + enter to show help
\`\`\`

## Langkah 4: Akses Aplikasi

Buka browser dan go to: `http://localhost:5173`

Seharusnya Anda melihat halaman beranda VertiGrow.

## Struktur Data Di localStorage

Aplikasi menggunakan browser localStorage untuk menyimpan data:

\`\`\`javascript
// products - List semua produk
localStorage.getItem("products")
// Returns: [
// { id, name, price, category, image, rating },
// ...
// ]

// cart - List produk di keranjang
localStorage.getItem("cart")
// Returns: [
// { ...product, quantity },
// ...
// ]

// users - List user
localStorage.getItem("users")
// Returns: [
// { id, name, email, phone, joined },
// ...
// ]

// notifications - List notifikasi admin
localStorage.getItem("notifications")
// Returns: [
// { id, type, title, message, timestamp, read },
// ...
// ]
\`\`\`

## Check Browser DevTools

Untuk verify data di localStorage:

1. Buka Browser DevTools (F12 atau Ctrl+Shift+I)
2. Pergi ke tab "Application"
3. Klik "LocalStorage"
4. Pilih "http://localhost:5173"
5. Anda akan melihat 4 keys: `products`, `cart`, `users`, `notifications`

## Fitur-Fitur yang Sudah Tersedia

### ✅ Setup Selesai

- [x] DaisyUI ter-install dan ter-konfigurasi
- [x] Iconify React ter-install dan siap digunakan
- [x] Tailwind CSS sudah dikonfigurasi dengan DaisyUI
- [x] Routing sudah setup dengan semua halaman
- [x] localStorage helper functions siap digunakan

### ✅ User Pages

- [x] Home (Beranda)
- [x] ProductList (Halaman Produk dengan add to cart)
- [x] Cart (Keranjang & Checkout)
- [x] About (Tentang Kami)
- [x] Services (Layanan)
- [x] Login/Register (sudah ada dari sebelumnya)

### ✅ Admin Pages

- [x] Dashboard (dengan statistik real-time)
- [x] Products CRUD (Tambah, Lihat, Edit, Hapus)
- [x] Users CRUD (Tambah, Lihat, Edit, Hapus)
- [x] Notifications (List notifikasi dengan actions)

### ✅ Components

- [x] Updated Navbar dengan cart badge
- [x] Admin Sidebar dengan navigation
- [x] Responsive Design untuk mobile & desktop

## Build untuk Production

\`\`\`bash
npm run build
\`\`\`

Output akan ter-generate di folder `dist/`

## Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Troubleshooting

### Masalah: "DaisyUI tidak found"

**Solusi:**
\`\`\`bash
npm install daisyui@latest
npm run dev
\`\`\`

### Masalah: "Iconify icons tidak muncul"

**Solusi:**
\`\`\`bash
npm install @iconify/react@latest
npm run dev
\`\`\`

### Masalah: "Port 5173 sudah digunakan"

**Solusi:**
Vite akan otomatis menggunakan port berikutnya (5174, 5175, dll)
Atau gunakan: `npm run dev -- --port 3000`

### Masalah: "localStorage kosong setelah refresh"

**Solusi (Normal):**
localStorage seharusnya persist. Jika kosong:

1. Check DevTools > Application > LocalStorage
2. Jika masih kosong, data demo akan di-generate otomatis saat app load

### Masalah: "Styling Tailwind tidak apply"

**Solusi:**

1. Clear cache: `rm -rf .vite && npm run dev`
2. Atau rebuild: `npm run build && npm run preview`

## Environment Variables

Saat ini aplikasi tidak menggunakan environment variables, semua berjalan di client-side dengan localStorage.

Untuk development lanjutan yang memerlukan API, tambahkan:
\`\`\`
.env
VITE_API_URL=http://localhost:3000
\`\`\`

## Verifikasi Semua Berjalan Dengan Baik

1. ✅ `npm install` tanpa error
2. ✅ `npm run dev` server berjalan di port 5173
3. ✅ Browser membuka http://localhost:5173
4. ✅ Halaman beranda tampil dengan baik
5. ✅ Navbar terlihat dengan cart icon
6. ✅ Klik "Produk" di navbar, halaman product list tampil
7. ✅ Klik "Keranjang" pada produk, cart badge update
8. ✅ Buka DevTools, check localStorage ada 4 keys
9. ✅ Navigasi ke `/admin`, admin dashboard tampil
10. ✅ Admin sidebar berfungsi dengan baik

## Dokumentasi Lengkap

- **README.md** - Overview aplikasi & fitur
- **QUICK_START.md** - Panduan cepat
- **SETUP_INSTRUCTIONS.md** - File ini

## Next Steps

1. Modify existing pages (Home, About, Services) dengan design baru jika diperlukan
2. Connect ke real API backend
3. Implementasi autentikasi real (JWT)
4. Setup database (MongoDB/PostgreSQL)
5. Tambah payment gateway
6. Deploy ke production

---

**Status:** ✅ Setup Complete - Siap untuk Development

Semua dependencies ter-install, semua pages tersedia, dan aplikasi siap untuk di-customize sesuai kebutuhan.
