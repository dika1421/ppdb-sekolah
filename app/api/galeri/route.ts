import { NextResponse } from "next/server";
import pool from "../../lib/db"; // Pastikan path ini benar menuju lib/db Anda

// Ambil semua data galeri
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM galeri ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

// Simpan data galeri baru (dari operator)
export async function POST(req: Request) {
  try {
    const { judul, kategori, gambar } = await req.json();
    await pool.query(
      "INSERT INTO galeri (judul, kategori, gambar) VALUES ($1, $2, $3)",
      [judul, kategori, gambar]
    );
    return NextResponse.json({ message: "Berhasil" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal simpan" }, { status: 500 });
  }
}