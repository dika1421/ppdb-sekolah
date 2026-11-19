import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db'; // Pastikan file lib/db.ts Anda sudah benar

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Cek user di database
    const { rows } = await pool.query(
      'SELECT id, email, password_hash FROM operators WHERE email = $1',
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Email atau Password salah!' }, { status: 401 });
    }

    const operator = rows[0];
    // Cek password
    const valid = await bcrypt.compare(password, operator.password_hash);

    if (!valid) {
      return NextResponse.json({ error: 'Email atau Password salah!' }, { status: 401 });
    }

    // Set cookie httpOnly jika berhasil
    const res = NextResponse.json({ ok: true });
    res.cookies.set('operator_token', String(operator.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 hari
    });
    
    return res;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}