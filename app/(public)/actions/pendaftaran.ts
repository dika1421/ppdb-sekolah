'use server';

import pool from '../../lib/db'; 
import { revalidatePath } from 'next/cache';

// 1. FUNGSI UNTUK MENYIMPAN PENDAFTAR BARU
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
    console.error("Gagal menyimpan:", error);
    throw new Error("Gagal menyimpan data");
  }
}

// 2. FUNGSI UNTUK UPDATE STATUS (YANG TADI KITA BUAT)
export async function updateStatusPendaftar(id: number, statusBaru: string) {
  try {
    await pool.query(
      'UPDATE pendaftar SET status = $1 WHERE id = $2',
      [statusBaru, id]
    );
    revalidatePath('/dashboard/pendaftar');
  } catch (error) {
    console.error("Gagal update status:", error);
    throw new Error("Gagal update status");
  }
}