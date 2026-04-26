# Plan: RAG Knowledge Management App (Strict Architecture)


Sistem RAG untuk manajemen dokumen (PDF) multi-user secara terisolasi.
**Arsitektur Jaringan (Ketat): Frontend (Next.js) -> API Backend (Express) -> Database/Auth (Supabase)**.
Frontend dilarang berkomunikasi langsung ke Supabase URL. Semua interaksi pengguna wajib melalui Express (termasuk Auth dan pengindeksan data AI Gemini).

## Langkah-langkah Pengerjaan (Phases)

### Fase 1: Setup Infrastructure & Database (Supabase)

1. Inisialisasi proyek Supabase baru (simpan URL & `SERVICE_ROLE_KEY` khusus untuk Backend).
2. Aktifkan ekstensi `pgvector` di database Supabase.
3. Buat skema tabel SQL:
     - `users` (id, email) -> jika perlu tracking custom selain bawaan auth.
     - `documents` (id, user_id, title, file_name, created_at)
     - `document_chunks` (id, document_id, content, embedding [vector(768)], metadata)
4. Buat fungsi database (RPC) `match_document_chunks` untuk pencarian kemiripan vektor.

### Fase 2: Autentikasi via API (Express Backend)

1. Instal `@supabase/supabase-js` menggunakan `SERVICE_ROLE_KEY` pada Backend.
2. Buat endpoint Auth di Express:
     - `POST /api/auth/register` (Mendaftarkan user ke Supabase Auth, return session).
     - `POST /api/auth/login` (Login user, return JWT).
     - `GET /api/auth/me` (Validasi token saat ini).
3. Buat middleware `verifyAuth` di Express untuk memverifikasi JWT dari Frontend, mengekstrak `user_id` untuk query ke Supabase.

### Fase 3: Pengolahan Dokumen & Embedding (Express Backend)

1. Instal dependensi backend: `multer` (upload form-data), `pdf-parse` (ekstraksi teks), `@google/generative-ai` (Gemini SDK).
2. Buat Endpoint `POST /api/documents/upload` (_dilindungi `verifyAuth`_).
     - Terima file PDF via `multer`.
     - Ekstrak teks dari PDF di memori (tanpa simpan permanen).
     - Pecah teks menjadi _chunks_ (sekitar 500-1000 karakter).
     - Generasikan vektor embedding setiap _chunk_ via Google `text-embedding-004`.
     - Simpan dokumen dan _chunk_ (+ vektor) beserta `user_id` ke tabel Supabase.
3. Buat Endpoint `GET /api/documents` (list dokumen milik user aktif).
4. Buat Endpoint `DELETE /api/documents/:id` (hapus dokumen).fas

### Fase 4: RAG Retrieval & Inference LLM (Express Backend)

1. Buat Endpoint `POST /api/chat` (_dilindungi `verifyAuth`_).
     - Terima pertanyaan pengguna.
     - Generasikan embedding dari pertanyaan (`text-embedding-004`).
     - Panggil Supabase RPC `match_document_chunks` meneruskan `user_id` dari token untuk membatasi pencarian milik user itu saja.
     - Rangkai hasil pencarian sebagai konteks bersama _system prompt_.
     - Kirim ke model `gemini-1.5-flash` gratis.
     - Kembalikan respon jawaban beserta daftar sumber/kutipan kembali ke frontend.

### Fase 5: UI/UX & Integrasi Frontend (Next.js)

1. Konfigurasi `axios` atau `fetch` global dengan HTTP Interceptor yang menyisipkan JWT / Token ke setiap akses API.
2. Buat halaman otentikasi (Register & Login) untuk menyimpan JWT di Local Storage atau HTTP-Only Cookies.
3. Buat halaman Dashboard (Sidebar menu & Chat wrapper).
4. Implementasikan Form Upload PDF via `multipart/form-data` mengarah ke _Express API_.
5. Implementasikan antarmuka _Chatting_ dengan dukungan Markdown.
