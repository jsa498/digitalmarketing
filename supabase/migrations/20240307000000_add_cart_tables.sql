-- Create cart_items table
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);

-- Add a unique constraint to prevent duplicate items in cart
CREATE UNIQUE INDEX idx_cart_items_user_product ON cart_items(user_id, product_id);

-- Add RLS policies
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view only their own cart items
CREATE POLICY "Users can view their own cart items"
  ON cart_items
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Policy to allow users to insert their own cart items
CREATE POLICY "Users can insert their own cart items"
  ON cart_items
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Policy to allow users to update their own cart items
CREATE POLICY "Users can update their own cart items"
  ON cart_items
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Policy to allow users to delete their own cart items
CREATE POLICY "Users can delete their own cart items"
  ON cart_items
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 