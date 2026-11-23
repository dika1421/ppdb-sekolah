import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params; 
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    // Hapus dari tabel visi_misi
    if (type === "visi-misi") {
      await pool.query("DELETE FROM visi_misi WHERE id = $1", [resolvedParams.id]);
      return NextResponse.json({ message: "Berhasil hapus visi misi" });
    }

    // Default: Hapus dari tabel galeri
    await pool.query("DELETE FROM galeri WHERE id = $1", [resolvedParams.id]);
    return NextResponse.json({ message: "Berhasil hapus galeri" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    // Edit data visi_misi
    if (type === "visi-misi") {
      await pool.query(
        "UPDATE visi_misi SET tipe = $1, konten = $2 WHERE id = $3",
        [body.tipe, body.konten, resolvedParams.id]
      );
      return NextResponse.json({ message: "Berhasil update visi misi" });
    }

    // Default: Edit data galeri
    await pool.query(
      "UPDATE galeri SET judul = $1, kategori = $2, gambar = $3 WHERE id = $4",
      [body.judul, body.kategori, body.gambar, resolvedParams.id]
    );
    return NextResponse.json({ message: "Berhasil update galeri" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}