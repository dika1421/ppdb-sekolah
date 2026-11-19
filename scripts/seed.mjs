import bcrypt from 'bcryptjs';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function buatAkunOperator() {
  // UBAH DATA DI SINI
  const username = '6040744644200003'; 
  const password = 'ppdb#0003'; 
  
  try {
    const hash = await bcrypt.hash(password, 10);
    
    await pool.query(
      `INSERT INTO operators (username, password_hash) 
       VALUES ($1, $2) 
       ON CONFLICT (username) DO UPDATE SET password_hash = $2`,
      [username, hash]
    );
    
    console.log('✅ Berhasil mengubah akun operator!');
    console.log('Username:', username);
    console.log('Password:', password);
  } catch (error) {
    console.error('❌ Gagal:', error);
  } finally {
    await pool.end();
  }
}

buatAkunOperator();