import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Para desenvolvimento com Supabase, o banco local é opcional
let pool: Pool | null = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  db = drizzle(pool, { schema });
}

export { pool, db };