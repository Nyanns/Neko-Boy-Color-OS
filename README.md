# Neko-Boy-Color-OS (React Edition)

Neko-Boy-Color-OS adalah aplikasi berbasis web yang mensimulasikan sistem operasi hewan peliharaan virtual 3D dalam antarmuka gaya konsol retro. Aplikasi ini dibangun dengan prinsip arsitektur modern (*Modern Frontend Engineering*) menggunakan **React** untuk memastikan skalabilitas komputasi tingkat tinggi dan pengelolaan memori yang deterministik.

## Arsitektur Aplikasi (React)

Proyek ini telah direfaktor secara penuh dari ekosistem *Vanilla JS* murni menjadi ekosistem deklaratif React.

### Struktur Domain Teknis

*   **`src/components/ConsoleShell.jsx`**: Lapisan presentasi UI. Bertanggung jawab atas rendering antarmuka konsol bergaya retro menggunakan integrasi utilitas CSS modern (Tailwind v4), efek bayangan 3D, dan pemetaan interaksi (D-Pad, *Action Buttons*).
*   **`src/components/GameScene.jsx`**: Subsistem rendering grafis WebGL. Menggunakan ekosistem **React Three Fiber (R3F)** untuk merangkai model 3D (Neko) dan pencahayaan secara deklaratif. Pendekatan ini mengotomatisasi pelepasan memori (*garbage collection*) untuk material dan geometri dari VRAM.
*   **`src/components/AudioEngine.js`**: Subsistem audio murni. Memanfaatkan sintesis Web Audio API prosedural di memori peramban tanpa memerlukan beban unduhan berkas media eksternal (MP3/WAV).
*   **`src/store/useGameStore.js`**: Mesin logika inti berbasis **Zustand**. Mengenkapsulasi dan mengeksekusi semua kalkulasi algoritma (lapar, bahagia, energi, anomali). UI bereaksi otomatis terhadap mutasi data ini tanpa manipulasi DOM manual.

## Keputusan Teknologi

1.  **Vite + React**: Menyediakan lingkungan kompilasi (*bundling*) ultra-cepat dengan arsitektur komponen terisolasi, menghilangkan *spaghetti code* saat basis fitur berekspansi.
2.  **React Three Fiber (R3F)**: Pustaka spesialis 3D untuk lingkungan React. Sangat superior dalam menangani siklus hidup (*lifecycle*) objek Three.js secara aman.
3.  **Zustand**: Pengelola memori (*State Management*) yang minimalis dan terpusat. Menggantikan *requestAnimationFrame loop* manual untuk memisahkan secara absolut antara logika perhitungan statis dengan perenderan antarmuka.

## Standar Portofolio Lumiina

Pembaruan ini adalah demonstrasi kelanjutan dari standar rekayasa struktural *Senior Craftsmanship*. Desain repositori ini dioptimalkan murni untuk integritas arsitektural dan portofolio rekayasa *Creative Coding*.

## Instalasi Lokal

Repositori ini siap untuk dikembangkan (*development ready*):
```bash
# Instalasi dependensi
npm install

# Jalankan server pengembangan lokal
npm run dev
```

Untuk melakukan distribusi kompilasi statis (*deployment*) ke GitHub Pages:
```bash
npm run deploy
```
