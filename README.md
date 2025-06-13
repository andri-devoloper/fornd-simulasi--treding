
# 📊 Simulasi Trading Frontend (React + Vite + TypeScript)

Aplikasi frontend ini digunakan untuk mengatur strategi dan risiko trading, lalu mengirimkannya ke backend untuk disimpan dan digunakan sebagai dasar evaluasi sinyal dari TradingView.

---

## 🧩 Fitur Aplikasi

✅ Form konfigurasi strategi trading  
✅ Input parameter strategi:  
- Symbol (default: `BTCUSDT`)  
- Timeframe (default: `5m`)  
- +DI Threshold (default: `25`)  
- –DI Threshold (default: `20`)  
- ADX Minimum (default: `20`)  
- Take Profit % (default: `2`)  
- Stop Loss % (default: `1`)  
- Leverage (default: `10x`)  

✅ Tombol "Simpan Konfigurasi"  
✅ Menampilkan konfigurasi aktif yang tersimpan di backend  
✅ (Opsional) Tombol reset/ubah konfigurasi  

---

## 🛠 Teknologi yang Digunakan

- React
- TypeScript
- Vite
- Tailwind CSS (optional styling)
- Axios untuk komunikasi dengan backend

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Clone Repo
```bash
git clone https://github.com/andri-devoloper/fornd-simulasi--treding.git
cd fornd-simulasi--treding
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Server Lokal
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

---

## 🔗 Komunikasi dengan Backend

Pastikan backend berjalan di `http://localhost:3000` atau ubah `BASE_URL` di file `services/api.ts` atau `.env` jika menggunakan:

```ts
const BASE_URL = 'http://localhost:3000';
```

### Endpoint yang digunakan:
- `POST /config` untuk menyimpan konfigurasi
- `GET /config` untuk menampilkan konfigurasi aktif

---

## 📂 Struktur Folder (Contoh)

```
src/
│
├── components/
│   └── Layouts         # Form input strategi
│
├── services/
│   └── api.ts                 # Axios config & API calls
│
├── pages/
│   └── Dashboard.tsx               # Halaman utama
│
├── App.tsx
└── main.tsx
```

---

## 👨‍💻 Author

**Andri**  
GitHub: [https://github.com/andri-devoloper](https://github.com/andri-devoloper)
