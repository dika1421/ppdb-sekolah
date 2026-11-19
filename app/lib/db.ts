import 'server-only'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Gunakan konfigurasi SSL ini untuk Vercel
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool