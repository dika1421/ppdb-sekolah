import { NextResponse } from "next/server";
import pool from "../../lib/db"; // Perhatikan path-nya naik 4 kali (../../../../)

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await pool.query("DELETE FROM galeri WHERE id = $1", [params.id]);
    return NextResponse.json({ message: "Berhasil hapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}