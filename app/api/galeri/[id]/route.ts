import { NextResponse } from "next/server";
// PERBAIKAN: Gunakan 4 titik (../../../../)
import pool from "../../../lib/db"; 

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params; 
    await pool.query("DELETE FROM galeri WHERE id = $1", [resolvedParams.id]);
    return NextResponse.json({ message: "Berhasil hapus" });
  } catch (error) {
    console.error("Gagal hapus:", error);
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { judul, kategori, gambar } = await req.json();

    await pool.query(
      "UPDATE galeri SET judul = $1, kategori = $2, gambar = $3 WHERE id = $4",
      [judul, kategori, gambar, resolvedParams.id]
    );
    return NextResponse.json({ message: "Berhasil update" });
  } catch (error) {
    console.error("Gagal update:", error);
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}