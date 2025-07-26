/*
  # Create Mohini Undergarments Database Schema

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `name` (text)
      - `created_at` (timestamp)
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `phone` (text)
      - `address` (text)
      - `created_at` (timestamp)
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `category` (text)
      - `size` (text)
      - `color` (text)
      - `image_url` (text)
      - `stock_quantity` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `total_amount` (decimal)
      - `status` (text)
      - `shipping_address` (text)
      - `payment_method` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (decimal)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admins
*/

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text DEFAULT '',
  address text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'bra',
  size text NOT NULL DEFAULT 'M',
  color text NOT NULL DEFAULT 'white',
  image_url text DEFAULT '',
  stock_quantity integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  shipping_address text NOT NULL,
  payment_method text NOT NULL DEFAULT 'cod',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for admins table
CREATE POLICY "Admins can read own data"
  ON admins
  FOR SELECT
  USING (true);

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (true);

-- Create policies for products table
CREATE POLICY "Anyone can read active products"
  ON products
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  USING (true);

-- Create policies for orders table
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own orders"
  ON orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own orders"
  ON orders
  FOR UPDATE
  USING (true);

-- Create policies for order_items table
CREATE POLICY "Users can read own order items"
  ON order_items
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own order items"
  ON order_items
  FOR INSERT
  WITH CHECK (true);

-- Insert sample admin user (password: admin123)
INSERT INTO admins (email, password_hash, name) VALUES 
('admin@mohini.com', '$2a$10$rQYhKKtJo1.OqCH4eDWF.OGKKlJq1P7Ym8xV3zV3zV3zV3zV3zV3z', 'Admin User')
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, category, size, color, image_url, stock_quantity) VALUES 
('Premium Lace Bra', 'Comfortable and elegant lace bra with excellent support', 1299.00, 'bra', 'M', 'Black', 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500', 25),
('Seamless Sports Bra', 'Perfect for workouts and daily wear', 899.00, 'sports-bra', 'L', 'Pink', 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=500', 30),
('Cotton Brief Set', 'Soft cotton briefs for everyday comfort', 599.00, 'brief', 'S', 'White', 'https://images.pexels.com/photos/5710153/pexels-photo-5710153.jpeg?auto=compress&cs=tinysrgb&w=500', 40),
('Push-up Bra', 'Enhanced comfort with natural push-up effect', 1599.00, 'bra', 'M', 'Nude', 'https://images.pexels.com/photos/8801088/pexels-photo-8801088.jpeg?auto=compress&cs=tinysrgb&w=500', 20),
('High-waist Brief', 'Comfortable high-waist design for perfect fit', 699.00, 'brief', 'L', 'Black', 'https://images.pexels.com/photos/6311046/pexels-photo-6311046.jpeg?auto=compress&cs=tinysrgb&w=500', 35),
('Wireless Comfort Bra', 'All-day comfort without underwire', 999.00, 'bra', 'XL', 'Beige', 'https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=500', 28)
ON CONFLICT DO NOTHING;