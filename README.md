# Neko-Boy-Color-OS

Neko-Boy-Color-OS adalah aplikasi berbasis web yang mensimulasikan sistem operasi hewan peliharaan virtual 3D dalam antarmuka gaya konsol retro. Aplikasi ini dibangun dengan prinsip modular dan clean code untuk memastikan skalabilitas dan kemudahan pemeliharaan.

## Arsitektur Aplikasi

Proyek ini telah direfaktor dari arsitektur monolitik menjadi arsitektur modular yang terpisah berdasarkan domain (Separation of Concerns).

### Struktur Direktori

*   **`index.html`**: Lapisan presentasi semantik. Berisi struktur tata letak UI, penampung kanvas 3D, dan pemanggilan skrip.
*   **`css/style.css`**: Lapisan gaya. Bertanggung jawab atas rendering antarmuka konsol bergaya retro menggunakan CSS Grid/Flexbox, efek bayangan 3D, dan penempatan elemen responsif.
*   **`js/audio.js`** (`SynthEngine`): Subsistem audio sintesis WebAudio murni. Menangani semua umpan balik pendengaran tanpa bergantung pada aset audio eksternal.
*   **`js/graphics.js`** (`Graphics3D`): Subsistem rendering grafis WebGL. Menggunakan Three.js untuk membangun dan merender model 3D (kucing) dan mengelola interaksi kursor dengan ruang 3D.
*   **`js/engine.js`** (`TamagotchiEngine`): Mesin logika inti. Mengelola status permainan (lapar, bahagia, energi), siklus hidup (loop rendering), dan aturan mekanik.
*   **`js/main.js`**: Bootstrapper. Mengikat semua subsistem bersama-sama, menginisialisasi mesin, dan menangani acara tingkat atas.

## Keputusan Teknologi

1.  **HTML/CSS Murni (Vanilla)**: Tidak ada kerangka kerja UI berat (seperti React/Vue) yang digunakan. Ini menjamin waktu muat yang instan, meminimalkan overhead kinerja, dan memungkinkan manipulasi DOM langsung yang diperlukan untuk simulasi antarmuka konsol retro.
2.  **Three.js**: Pustaka 3D ringan yang optimal untuk rendering berbasis browser, digunakan secara spesifik dan tidak mengganggu alur kerja DOM konvensional.
3.  **Web Audio API Sintesis Murni**: Generasi suara prosedural langsung di memori browser. Pendekatan ini menghilangkan kebutuhan pengambilan aset jaringan, menghemat bandwidth, dan menghasilkan suara gaya 8-bit yang akurat tanpa latensi jaringan.
4.  **Arsitektur Pemisahan Kekhawatiran (SoC)**: Logika, tampilan, suara, dan data dipisahkan. Ini adalah praktik rekayasa standar tinggi (Senior Craftsmanship) untuk mencegah pembusukan kode dan memungkinkan pengujian modul secara independen di masa depan.

## Menjalankan Proyek Secara Lokal

Tidak ada proses build atau bundler yang diperlukan.
1. Klon repositori ini.
2. Buka `index.html` langsung di browser Anda.

## Portofolio Lumiina

Pembaruan ini adalah demonstrasi langsung dari standar rekayasa *Zero-Slop* dan penerapan kode bersih oleh entitas Lumiina. Desain kode secara ketat difokuskan pada fungsionalitas murni, organisasi struktural, dan alasan teknis.
