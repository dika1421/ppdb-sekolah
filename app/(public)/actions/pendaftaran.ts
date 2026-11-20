'use server';

// Mundur satu folder (dari app/actions ke root), lalu masuk ke lib/db
import pool from '../../lib/db'; 
import { revalidatePath } from 'next/cache';

export async function simpanPendaftar(formData: FormData) {
  const nama = formData.get('nama') as string;
  const asalSekolah = formData.get('asalSekolah') as string;
  const wa = formData.get('wa') as string;

  try {
    await pool.query(
      'INSERT INTO pendaftar (nama, asal_sekolah, no_wa, status) VALUES ($1, $2, $3, $4)',
      [nama, asalSekolah, wa, 'Pending']
    );

    revalidatePath('/dashboard/pendaftar');
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    throw new Error("Gagal menyimpan data ke database");
  }
}