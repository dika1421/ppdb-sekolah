'use server';

// Coba ganti path ini menjadi '../../../lib/db' jika errornya "Module not found"
import pool from '../../lib/db'; 
import { revalidatePath } from 'next/cache';

export async function simpanPendaftar(formData: FormData) {
  const nama = formData.get('nama') as string;
  const asalSekolah = formData.get('asalSekolah') as string;
  const wa = formData.get('wa') as string;

  console.log("1. Data diterima dari form:", { nama, asalSekolah, wa });

  try {
    console.log("2. Mencoba melakukan INSERT ke database...");
    
    await pool.query(
      'INSERT INTO pendaftar (nama, asal_sekolah, no_wa, status) VALUES ($1, $2, $3, $4)',
      [nama, asalSekolah, wa, 'Pending']
    );

    console.log("3. SUKSES! Data berhasil masuk ke Neon.");
    revalidatePath('/dashboard/pendaftar');
  } catch (error) {
    console.error("❌ GAGAL MENYIMPAN DATA. Ini detail errornya:");
    console.error(error); // Ini akan mencetak error asli dari Postgres
    throw new Error("Gagal menyimpan data ke database");
  }
}