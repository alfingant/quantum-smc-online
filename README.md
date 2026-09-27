# Quantum SMC v5.6 Online

Paket ini mempertahankan `index.html` asli dan menambahkan server Express untuk membuat aplikasi dapat dibuka dari HP, laptop, dan PC lain melalui URL publik.

## Deploy ke Render
1. Upload folder ini ke GitHub sebagai repository.
2. Di Render pilih **New > Web Service** lalu hubungkan repository tersebut.
3. Pilih runtime **Docker**. Render mendukung Dockerfile untuk web service dan memberi URL `onrender.com`. 
4. Deploy. Setelah selesai, URL akan berbentuk `https://nama-service.onrender.com`.
5. Buka URL yang sama dari perangkat lain.

### Opsi Blueprint
File `render.yaml` sudah disediakan sehingga bisa dipakai sebagai Blueprint.

## Sinkronisasi data
- Jurnal analisis dan catatan trade dikirim ke `/api/state`.
- `localStorage` tetap dipakai sebagai cache/fallback agar fitur lokal tidak hilang.
- Pada Render Free, filesystem service bersifat ephemeral, sehingga data server dapat hilang ketika service direstart/redeploy. Untuk penyimpanan jurnal yang benar-benar persisten, gunakan Render Persistent Disk (tersedia untuk service berbayar) atau database terkelola seperti Postgres. Render mendokumentasikan bahwa filesystem default bersifat ephemeral dan persistent disk tersedia pada web service berbayar.

## Fitur yang dipertahankan
Chart TradingView, market performance Forex/Crypto, global order-flow display, signal console, Entry/TP/SL, SMC checklist, multi-timeframe M5/M10/H1, radar, risk management, lot calculator, trader tools, price alert, journal, saved analysis, AI assistant, OLED mode, sound, focus mode, print/PDF, lazy-loading widgets, dan ticker tetap berada di `index.html`.

## Catatan produksi
Untuk aplikasi multi-pengguna, tambahkan autentikasi dan database agar jurnal setiap pengguna terpisah. Versi ini menggunakan state bersama untuk sinkronisasi sederhana antar-perangkat.
