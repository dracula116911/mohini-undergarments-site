import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  color: string;
  image_url: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
  products?: Product;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

// Cart Item for local storage
export interface CartItem {
  product: Product;
  quantity: number;
}

// Database functions
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Product[];
};

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Product;
};

export const createUser = async (userData: Omit<User, 'id' | 'created_at'>) => {
  // Check if user already exists by email
  const { data: existing, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', userData.email)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    // Ignore "No rows found" error (code PGRST116), throw others
    throw fetchError;
  }

  if (existing) {
    return existing as User;
  }

  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();

  if (error) throw error;
  return data as User;
};

export const decrementProductStock = async (items: { product_id: string, quantity: number }[]) => {
  for (const item of items) {
    const { error } = await supabase.rpc('decrement_stock', {
      product_id: item.product_id,
      qty: item.quantity
    });
    if (error) throw error;
  }
};


export const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single();

  if (error) throw error;
  return data as Order;
};

export const createOrderItems = async (orderItems: Omit<OrderItem, 'id' | 'created_at'>[]) => {
  const { data, error } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select();

  if (error) throw error;
  return data as OrderItem[];
};

// Admin functions
export const loginAdmin = async (email: string, password: string) => {
  // For demo purposes, simple check (in production, use proper auth)
  if (email === 'admin@mohini.com' && password === 'admin123') {
    return { id: '1', email, name: 'Admin User', created_at: new Date().toISOString() };
  }
  throw new Error('Invalid credentials');
};

export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Product[];
};

export const createProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert({
      ...productData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data as Product;
};

export const updateProduct = async (id: string, productData: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update({ ...productData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Order[];
};

export const updateOrderStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Order;
};