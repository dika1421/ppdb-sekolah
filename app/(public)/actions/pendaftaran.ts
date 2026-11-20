'use server';

// WAJIB: Mundur 3 folder (../../../) agar bisa masuk ke folder lib/db
import pool from '../../lib/db'; 
import { revalidatePath } from 'next/cache';

export async function simpanPendaftar(formData: FormData) {
  const nama = formData.get('nama') as string;
  const asalSekolah = formData.get('asalSekolah') as string;
  const wa = formData.get('wa') as string;

  try {
    console.log("1. Server Action menerima data:", { nama, asalSekolah, wa });
    
    // Query INSERT ke tabel pendaftar
    await pool.query(
      'INSERT INTO pendaftar (nama, asal_sekolah, no_wa, status) VALUES ($1, $2, $3, $4)',
      [nama, asalSekolah, wa, 'Pending']
    );

    console.log("2. BERHASIL DISIMPAN KE DATABASE NEON!");
    
    // Memperbarui cache halaman operator agar data langsung muncul
    revalidatePath('/dashboard/pendaftar');
    
  } catch (error: any) {
    console.error("❌ GAGAL MENYIMPAN KE DATABASE:", error.message);
    // Lempar error agar bisa ditangkap oleh form di frontend
    throw new Error(error.message || "Gagal menyimpan ke database");
  }
}