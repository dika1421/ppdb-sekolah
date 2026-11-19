import bcrypt from 'bcryptjs';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// 1. Beri tahu dotenv untuk membaca file .env.local secara spesifik
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Cek apakah DATABASE_URL benar-benar terbaca (untuk memastikan)
if (!process.env.DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL tidak ditemukan di .env.local");
  process.exit(1);
}

// 2. Koneksi ke database
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function buatAkunOperator() {
  const email = 'admin@sekolah.com';
  const password = 'password123'; // Silakan ganti dengan password yang aman
  
  try {
    // 3. Enkripsi password
    const hash = await bcrypt.hash(password, 10);
    
    // 4. Simpan ke tabel operators
    await pool.query(
      `INSERT INTO operators (email, password_hash) 
       VALUES ($1, $2) 
       ON CONFLICT (email) DO UPDATE SET password_hash = $2`,
      [email, hash]
    );
    
    console.log('✅ Berhasil membuat akun operator!');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (error) {
    console.error('❌ Gagal membuat akun:', error);
  } finally {
    await pool.end();
  }
}

buatAkunOperator();