import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

// Koneksi database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("1. Mencoba login untuk email:", email);

    const { rows } = await pool.query(
      'SELECT id, email, password_hash FROM operators WHERE email = $1',
      [email]
    );
    console.log("2. Data dari DB:", rows);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Email tidak ditemukan di DB' }, { status: 401 });
    }

    const operator = rows[0];
    const valid = await bcrypt.compare(password, operator.password_hash);
    console.log("3. Password valid?:", valid);

    if (!valid) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    
    // PERBAIKAN PENGATURAN COOKIE:
    res.cookies.set({
      name: 'operator_token',
      value: String(operator.id),
      httpOnly: true, 
      // Paksa secure: false jika di lokal, dan true jika di production (Vercel)
      secure: process.env.NODE_ENV === 'production', 
      // 'lax' adalah yang paling aman dan kompatibel untuk redirect
      sameSite: 'lax', 
      path: '/',
      maxAge: 60 * 60 * 24, // 1 hari
    });
    
    console.log("4. Login sukses, cookie dikirim.");
    return res;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json({ error: 'Gagal koneksi ke database' }, { status: 500 });
  }
}