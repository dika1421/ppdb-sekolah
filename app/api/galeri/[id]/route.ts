import { NextResponse } from "next/server";
import pool from "../../lib/db"; 

// PERBAIKAN: Ubah tipe data params menjadi Promise
export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // PERBAIKAN: Tambahkan await untuk membuka Promise dari params
    const resolvedParams = await params; 
    const id = resolvedParams.id;

    await pool.query("DELETE FROM galeri WHERE id = $1", [id]);
    return NextResponse.json({ message: "Berhasil hapus" });
  } catch (error) {
    console.error("Gagal hapus:", error);
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}