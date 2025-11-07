# VertiGrow - Verification Checklist

Gunakan checklist ini untuk memverifikasi bahwa semua fitur berfungsi dengan baik.

## Pre-Installation

- [ ] Node.js version 16+ terinstall
- [ ] npm version 8+ terinstall
- [ ] Git terinstall (optional)
- [ ] Code editor siap (VS Code, etc)

## Installation

- [ ] Run `npm install` tanpa error
- [ ] Folder `node_modules` terbuat
- [ ] File `package-lock.json` terbuat

## Dependencies

- [ ] `daisyui@4.12.10` terinstall (check: `npm list daisyui`)
- [ ] `@iconify/react@4.1.1` terinstall (check: `npm list @iconify/react`)
- [ ] `react@18.3.1` terinstall
- [ ] `react-router-dom@6.28.0` terinstall
- [ ] `tailwindcss@3.4.15` terinstall

## Development Server

- [ ] Run `npm run dev` tanpa error
- [ ] Server berjalan di `http://localhost:5173`
- [ ] Browser auto-open (atau buka manual)
- [ ] Tidak ada warning di terminal

## Browser DevTools

- [ ] F12 > Application > LocalStorage
- [ ] 4 keys terlihat: `products`, `cart`, `users`, `notifications`
- [ ] Setiap key berisi data dengan benar
- [ ] Tidak ada error di Console tab

## User Pages - Navigation

- [ ] Homepage (`/`) - Loading dengan baik
- [ ] Navbar terlihat dengan baik
- [ ] Navbar responsive di mobile
- [ ] Cart badge di navbar terlihat (default 0)
- [ ] Click "Produk" di navbar → ke `/products`
- [ ] Click "Tentang Kami" → ke `/tentang`
- [ ] Click "Layanan Kami" → ke `/layanan`
- [ ] Click "Masuk" → ke `/masuk`
- [ ] Click "Daftar" → ke `/daftar`

## Product List Page (`/products`)

- [ ] Page header terlihat dengan title "Koleksi Tanaman"
- [ ] Filter buttons ada: "Semua", "Hias", "Bunga", "Kaktus"
- [ ] 4 product cards terlihat:
  - [ ] Tanaman Hias Monstera (Rp 150.000)
  - [ ] Tanaman Bunga Mawar (Rp 75.000)
  - [ ] Tanaman Kaktus Mini (Rp 45.000)
  - [ ] Tanaman Lidah Mertua (Rp 95.000)
- [ ] Setiap product card memiliki:
  - [ ] Image dari unsplash
  - [ ] Product name
  - [ ] Price dalam Rp
  - [ ] Rating dengan bintang
  - [ ] "Keranjang" button
- [ ] Click filter buttons → products ter-filter dengan baik
- [ ] Cart badge update ketika add to cart
- [ ] Toast notification muncul saat add to cart

## Cart Page (`/cart`)

- [ ] Click cart badge di navbar → ke `/cart`
- [ ] Jika cart kosong → tampil "Keranjang kosong"
- [ ] Add produk dari product list
- [ ] Produk terlihat di cart page
- [ ] Quantity buttons (+/-) berfungsi
- [ ] Remove button (trash icon) berfungsi
- [ ] Order summary terlihat:
  - [ ] Subtotal
  - [ ] Ongkir (Rp 25.000)
  - [ ] Total
- [ ] Checkout form terlihat:
  - [ ] Nama Lengkap input
  - [ ] Email input
  - [ ] No. HP input
  - [ ] Alamat textarea
- [ ] Fill checkout form dan submit
- [ ] Success message muncul
- [ ] Cart cleared setelah checkout

## Admin Pages - Access

- [ ] Navigate ke `/admin` → Admin Dashboard
- [ ] Admin Sidebar terlihat di sebelah kiri
- [ ] Sidebar navigation berfungsi

## Admin Dashboard (`/admin`)

- [ ] Header "Dashboard Admin" terlihat
- [ ] 4 stat cards terlihat:
  - [ ] Total Produk (4)
  - [ ] Total User (1)
  - [ ] Total Pesanan (0, bisa berubah)
  - [ ] Total Revenue
- [ ] Stat cards clickable
- [ ] Quick action buttons ada:
  - [ ] "Tambah Produk"
  - [ ] "Kelola User"
  - [ ] "Notifikasi"
  - [ ] "Ke Beranda"

## Admin Products (`/admin/products`)

- [ ] 4 demo products terlihat di table
- [ ] Table columns: Nama, Kategori, Harga, Aksi
- [ ] Click "Tambah Produk" → modal form terbuka
- [ ] Modal form ada input:
  - [ ] Nama Produk
  - [ ] Harga
  - [ ] Kategori dropdown
  - [ ] URL Gambar (optional)
- [ ] Fill form dan simpan → product added
- [ ] Product terlihat di table
- [ ] Click edit icon → modal populate dengan data
- [ ] Edit product dan update → data updated
- [ ] Click delete icon → confirm dialog
- [ ] Click yes → product deleted

## Admin Users (`/admin/users`)

- [ ] 1 demo user terlihat di table
- [ ] Table columns: Nama, Email, No. HP, Tergabung, Aksi
- [ ] Click "Tambah User" → modal form terbuka
- [ ] Modal form ada input:
  - [ ] Nama Lengkap
  - [ ] Email
  - [ ] No. HP
  - [ ] Tanggal (auto-filled)
- [ ] Fill form dan simpan → user added
- [ ] User terlihat di table
- [ ] Click edit icon → modal populate
- [ ] Edit user dan update → data updated
- [ ] Click delete icon → confirm
- [ ] Click yes → user deleted

## Admin Notifications (`/admin/notifications`)

- [ ] Page terlihat kosong atau dengan notifikasi yang ada
- [ ] Demo button "Simulasi Notifikasi Pesanan" ada
- [ ] Click button → notifikasi baru muncul di list
- [ ] Notifikasi card menampilkan:
  - [ ] Icon
  - [ ] Title
  - [ ] Message
  - [ ] Timestamp
- [ ] Click check icon → mark as read
- [ ] Click trash icon → delete notification
- [ ] "Hapus Semua" button berfungsi

## Sidebar Navigation

- [ ] Dashboard link berfungsi
- [ ] Produk link berfungsi
- [ ] User link berfungsi
- [ ] Notifikasi link berfungsi
- [ ] "Kembali ke User" button → ke home page

## Responsive Design

### Desktop

- [ ] Layout sempurna di 1920px
- [ ] Layout sempurna di 1366px
- [ ] Layout sempurna di 1024px

### Tablet

- [ ] Layout sempurna di 768px
- [ ] Navigation responsive
- [ ] Grid adjusts ke 2 columns

### Mobile

- [ ] Layout sempurna di 375px (iPhone SE)
- [ ] Layout sempurna di 414px (iPhone XR)
- [ ] Hamburger menu berfungsi
- [ ] Touch targets cukup besar
- [ ] No horizontal scroll

## Icons & UI

- [ ] DaisyUI buttons terlihat baik
- [ ] DaisyUI cards terlihat baik
- [ ] DaisyUI modals berfungsi
- [ ] DaisyUI tables responsive
- [ ] Iconify icons menampilkan:
  - [ ] mdi:leaf
  - [ ] mdi:shopping-cart
  - [ ] mdi:people
  - [ ] mdi:bell
  - [ ] mdi:plus
  - [ ] mdi:trash
  - [ ] mdi:pencil
  - [ ] Dan lainnya

## localStorage Data

- [ ] `products` key berisi 4 items
- [ ] `users` key berisi minimal 1 item
- [ ] `cart` key berisi items yang ditambahkan
- [ ] `notifications` key ada (bisa kosong)
- [ ] Data persist setelah page refresh

## CSS & Styling

- [ ] Tailwind CSS classes applied dengan baik
- [ ] DaisyUI theme colors terlihat
- [ ] No layout shifts saat loading
- [ ] Font sizes readable di semua devices
- [ ] Colors contrast baik (accessibility)
- [ ] Custom scrollbar terlihat (jika di custom)

## Performance

- [ ] Page loading cepat
- [ ] Smooth animations & transitions
- [ ] No lag saat interact dengan UI
- [ ] Modal open/close smooth
- [ ] Filter products fast

## Build & Production

- [ ] Run `npm run build` tanpa error
- [ ] `dist` folder terbuat
- [ ] Run `npm run preview` berhasil
- [ ] Production preview berfungsi seperti dev

## Linting

- [ ] Run `npm run lint` tanpa critical errors
- [ ] Warnings bisa di-ignore untuk development

## Console

- [ ] Tidak ada error messages
- [ ] Tidak ada critical warnings
- [ ] localStorage operations logged (optional)

## Final Testing

- [ ] Complete user flow: Browse → Add to cart → Checkout ✅
- [ ] Complete admin flow: Login → Manage products ✅
- [ ] Data persistence: Refresh page → data tetap ada ✅
- [ ] Navigation: Bisa navigate ke semua pages ✅
- [ ] Responsiveness: Baik di semua screen sizes ✅
- [ ] Performance: Loading cepat & smooth ✅

---

## Issues Found & Fixed

| Issue | Status | Fixed By |
| ----- | ------ | -------- |
| -     | -      | -        |

_(Add any issues found during verification)_

---

## Sign-Off

- [ ] All checklist items passed
- [ ] No critical issues
- [ ] Ready for development / deployment
- [ ] Date verified: ****\_\_\_****
- [ ] Verified by: ****\_\_\_****

---

**Status:** ✅ Ready for Production

Jika semua items ter-check, aplikasi Anda siap untuk deployment atau development lanjutan!
