import { defineConfig } from "drizzle-kit";

const supabaseUrl = process.env.VITE_SUPABASE_URL;

if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL must be set");
}

// Converter URL do Supabase para URL de conexão PostgreSQL
// Formato: https://[project-ref].supabase.co -> postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '');

// Para usar com Drizzle, você precisa da sua senha do banco Supabase
// Substitua [YOUR-PASSWORD] pela sua senha do banco
const databaseUrl = `postgresql://postgres:[YOUR-PASSWORD]@db.${projectRef}.supabase.co:5432/postgres`;

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});