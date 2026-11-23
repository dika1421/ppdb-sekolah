"use server";

import pool from "../../../lib/db";
import { revalidatePath } from "next/cache";

export async function tambahVisiMisi(formData: FormData) {
  const tipe = formData.get("tipe") as string;
  const konten = formData.get("konten") as string;

  if (!tipe || !konten) return;

  await pool.query(
    "INSERT INTO visi_misi (tipe, konten) VALUES ($1, $2)",
    [tipe, konten]
  );
  
  revalidatePath("/dashboard/visi-misi");
  revalidatePath("/visi-misi");
}

export async function hapusVisiMisi(formData: FormData) {
  const id = formData.get("id");
  if (!id) return;

  await pool.query("DELETE FROM visi_misi WHERE id = $1", [id]);
  
  revalidatePath("/dashboard/visi-misi");
  revalidatePath("/visi-misi");
}