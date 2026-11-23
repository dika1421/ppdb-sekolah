import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    // Jika yang diminta adalah visi-misi, ambil dari tabel visi_misi
    if (type === "visi-misi") {
      const result = await pool.query("SELECT * FROM visi_misi ORDER BY id ASC");
      return NextResponse.json(result.rows);
    }
    
    // Default: Ambil dari tabel galeri
    const result = await pool.query("SELECT * FROM galeri ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Jika data yang dikirim adalah visi-misi
    if (body.type === "visi-misi") {
      await pool.query(
        "INSERT INTO visi_misi (tipe, konten) VALUES ($1, $2)",
        [body.tipe, body.konten]
      );
      return NextResponse.json({ message: "Berhasil simpan visi misi" }, { status: 201 });
    }

    // Default: Simpan ke tabel galeri
    await pool.query(
      "INSERT INTO galeri (judul, kategori, gambar) VALUES ($1, $2, $3)",
      [body.judul, body.kategori, body.gambar]
    );
    return NextResponse.json({ message: "Berhasil simpan galeri" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal simpan" }, { status: 500 });
  }
}