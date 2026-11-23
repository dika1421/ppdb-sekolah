"use server";

import pool from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function tambahGaleri(formData: FormData) {
  const judul = formData.get("judul") as string;
  const kategori = formData.get("kategori") as string;
  const file = formData.get("gambar") as File;

  if (!judul || !kategori) return;

  let imageUrl = "";

  // Jika user mengunggah file, upload ke Cloudinary
  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload menggunakan Promise agar Server Action menunggu proses selesai
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "ppdb_galeri" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    imageUrl = uploadResult.secure_url;
  }

  // Simpan ke Database Neon
  await pool.query(
    "INSERT INTO galeri (judul, kategori, gambar) VALUES ($1, $2, $3)",
    [judul, kategori, imageUrl]
  );

  revalidatePath("/dashboard/galeri");
  revalidatePath("/galeri"); 
}

export async function hapusGaleri(formData: FormData) {
  const id = formData.get("id");
  if (!id) return;

  await pool.query("DELETE FROM galeri WHERE id = $1", [id]);
  
  revalidatePath("/dashboard/galeri");
  revalidatePath("/galeri");
}