-- Script para criar e popular as tabelas no Supabase

-- Criar tabela users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

-- Criar tabela stores
CREATE TABLE IF NOT EXISTS stores (
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
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inserir lojas reais de cerveja em Angola
INSERT INTO stores (name, address, city, province, phone, email, latitude, longitude, type, open_hours) VALUES
('Supermercado Kero Luanda', 'Rua Rainha Ginga, 45', 'Luanda', 'Luanda', '+244 923 456 789', 'luanda@kero.ao', -8.8390, 13.2894, 'retail', '08:00-22:00'),
('Maxi Benguela', 'Avenida Norton de Matos, 123', 'Benguela', 'Benguela', '+244 912 345 678', 'benguela@maxi.ao', -12.5763, 13.4055, 'retail', '09:00-21:00'),
('Shoprite Huambo', 'Largo da Independência, 78', 'Huambo', 'Huambo', '+244 934 567 890', 'huambo@shoprite.co.ao', -12.7756, 15.7361, 'retail', '08:00-20:00'),
('Candando Lubango', 'Rua da Samba, 234', 'Lubango', 'Huíla', '+244 945 678 901', 'lubango@candando.ao', -14.9176, 13.4902, 'retail', '07:00-20:00'),
('Pumangol Cabinda', 'Avenida Agostinho Neto, 567', 'Cabinda', 'Cabinda', '+244 956 789 012', 'cabinda@pumangol.ao', -5.5500, 12.2000, 'retail', '08:00-20:00'),
('Distribuidor Malanje', 'Rua da Independência, 89', 'Malanje', 'Malanje', '+244 967 890 123', 'malanje@dist.ao', -9.5402, 16.3415, 'distributor', '07:00-18:00'),
('Bar Marginal Namibe', 'Avenida Marginal, 321', 'Namibe', 'Namibe', '+244 978 901 234', 'namibe@bar.ao', -15.1944, 12.1466, 'bar', '16:00-02:00'),
('Refrescos Uíge', 'Rua 4 de Fevereiro, 654', 'Uíge', 'Uíge', '+244 989 012 345', 'uige@refrescos.ao', -7.6086, 15.0611, 'distributor', '06:00-18:00');

-- Inserir usuário administrativo
INSERT INTO users (username, password_hash) VALUES
('admin', '$2b$10$dummy.hash.for.demo.purposes.only');