# Modern Weather App ☁️☀️🌧️

Aplikasi cuaca modern, elegan, dan penuh animasi yang dibangun menggunakan React, Vite, Tailwind CSS, dan Framer Motion. Data cuaca yang ditampilkan bersumber secara real-time dari [Open-Meteo API](https://open-meteo.com/).

## 🚀 Fitur Utama

- **Geolokasi Otomatis**: Secara otomatis mendeteksi dan menampilkan cuaca di lokasi pengguna saat ini ketika pertama kali dibuka (membutuhkan izin lokasi browser).
- **Pencarian Lokasi Global**: Cari cuaca untuk kota mana saja di seluruh dunia menggunakan Open-Meteo Geocoding API yang dilengkapi dengan fitur *auto-suggest*.
- **Informasi Cuaca Saat Ini**: Menampilkan suhu, kondisi cuaca (Cerah, Hujan, Salju, dll), dan "suhu yang terasa seperti".
- **Prakiraan Hari Ini (24 Jam)**: Lihat ramalan cuaca dari jam 00:00 hingga 23:00 untuk hari tersebut. Daftar ini secara otomatis bergulir (*auto-scroll*) ke jam saat ini dan dapat digeser (drag-to-scroll) dengan mudah menggunakan mouse atau sentuhan.
- **Prakiraan 7 Hari**: Menampilkan suhu maksimum, minimum, probabilitas hujan, dan kondisi cuaca untuk seminggu ke depan.
- **Detail Metrik Lengkap**: Meliputi Kelembapan, Kecepatan Angin, UV Index, Tekanan Udara, Curah Hujan, dan Jarak Pandang.
- **Desain Glassmorphism**: Antarmuka pengguna (UI) bergaya *glassmorphism* modern yang memadukan keindahan transparansi dengan kejelasan informasi, serta responsif sepenuhnya (Mobile, Tablet, Desktop).
- **Latar Belakang Dinamis**: Warna latar belakang aplikasi akan berubah dengan animasi transisi yang sangat halus mengikuti kondisi cuaca (contoh: biru cerah saat cerah, gelap saat badai atau hujan).
- **Animasi Transisi Halaman**: Dilengkapi dengan animasi masuk (*slide dari kanan*) ketika pengguna mencari atau mengganti kota, dan **Skeleton Loading UI** yang tampil sebelum data dari API selesai diambil.

## 🛠️ Teknologi yang Digunakan

- **[React 18](https://react.dev/)**: Library utama untuk membangun antarmuka pengguna.
- **[Vite](https://vitejs.dev/)**: Build tool yang sangat cepat untuk inisialisasi dan pengembangan.
- **[Tailwind CSS (v3)](https://tailwindcss.com/)**: Framework CSS utility-first untuk *styling* yang cepat dan responsif.
- **[Framer Motion](https://www.framer.com/motion/)**: Library animasi React untuk efek *slide*, *fade*, dan *enter/exit transitions* yang mulus.
- **[Lucide React](https://lucide.dev/)**: Ikon vektor SVG yang bersih dan konsisten.
- **[Axios](https://axios-http.com/)**: Klien HTTP Promise-based untuk mengambil data cuaca dan geocoding.
- **[Open-Meteo API](https://open-meteo.com/)**: Penyedia API cuaca gratis (tanpa perlu API key) untuk ramalan dan geocoding historis/saat ini.

## 💻 Instalasi dan Penggunaan Lokal

Ikuti langkah-langkah berikut untuk menjalankan aplikasi ini di mesin lokal Anda:

1. **Clone repository ini** (jika menggunakan Git) atau unduh folder *source code* nya.
2. Buka terminal dan arahkan ke direktori root dari proyek ini.
3. Instal semua dependensi proyek menggunakan npm (atau yarn/pnpm):
   ```bash
   npm install
   ```
4. Jalankan *development server*:
   ```bash
   npm run dev
   ```
5. Buka browser Anda dan kunjungi URL yang tertera di terminal (biasanya `http://localhost:5173`).

## ⚙️ Skrip Lainnya

- `npm run build`: Membangun (compile) aplikasi untuk siap diproduksi (production-ready).
- `npm run preview`: Mempratinjau hasil *build* production secara lokal.
- `npm run lint`: Menjalankan ESLint untuk memeriksa kualitas kode.

## 📝 Lisensi

Proyek ini dibuat untuk tujuan demonstrasi portofolio atau penggunaan personal. Data cuaca yang disediakan tunduk pada syarat dan ketentuan [Open-Meteo](https://open-meteo.com/en/terms).
