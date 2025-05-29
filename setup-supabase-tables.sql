-- Script para criar as tabelas no Supabase
-- Execute este script no SQL Editor do seu painel Supabase

-- Criar tabela users
CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Criar tabela stores  
CREATE TABLE IF NOT EXISTS public.stores (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  type TEXT NOT NULL DEFAULT 'retail',
  open_hours TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir alguns dados de exemplo para testar
INSERT INTO public.stores (name, address, city, province, type, phone, email) VALUES
('Kenito Store Luanda Centro', 'Rua da Missão, 123', 'Luanda', 'Luanda', 'retail', '+244 923 456 789', 'luanda@kenito.ao'),
('Kenito Bar Marginal', 'Ilha de Luanda, Marginal', 'Luanda', 'Luanda', 'bar', '+244 923 456 790', 'bar@kenito.ao'),
('Kenito Atacado Benguela', 'Avenida Norton de Matos, 456', 'Benguela', 'Benguela', 'wholesale', '+244 923 456 791', 'benguela@kenito.ao')
ON CONFLICT DO NOTHING;

-- Verificar se as tabelas foram criadas
SELECT 'Tabelas criadas com sucesso!' as status;
SELECT COUNT(*) as total_stores FROM public.stores;
SELECT COUNT(*) as total_users FROM public.users;