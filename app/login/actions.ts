"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function loginAction(formData: FormData) {
  // Mengambil data dari form
  const username = formData.get("username") as string; // Ubah dari "email"
  const password = formData.get("password") as string;

  try {
    // Query database berdasarkan kolom 'username'
    const { rows } = await pool.query(
      "SELECT id, username, password_hash FROM operators WHERE username = $1",
      [username]
    );

    if (rows.length === 0) {
      return { error: "Username tidak ditemukan!" };
    }

    const operator = rows[0];
    const valid = await bcrypt.compare(password, operator.password_hash);

    if (!valid) {
      return { error: "Password salah!" };
    }

    const cookieStore = await cookies();
    cookieStore.set("operator_token", String(operator.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { success: true };

  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Terjadi kesalahan pada server." };
  }
}