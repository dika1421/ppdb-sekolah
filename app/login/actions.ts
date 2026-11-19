"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { rows } = await pool.query(
      "SELECT id, email, password_hash FROM operators WHERE email = $1",
      [email]
    );

    if (rows.length === 0) {
      return { error: "Email tidak ditemukan!" };
    }

    const operator = rows[0];
    const valid = await bcrypt.compare(password, operator.password_hash);

    if (!valid) {
      return { error: "Password salah!" };
    }

    // Set cookie di server
    const cookieStore = await cookies();
    cookieStore.set("operator_token", String(operator.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    // JANGAN redirect di sini. Kembalikan status sukses.
    return { success: true };

  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Terjadi kesalahan pada server." };
  }
}