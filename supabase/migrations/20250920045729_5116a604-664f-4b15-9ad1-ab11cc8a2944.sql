-- Insert missing products to match the static data
INSERT INTO products (name, slug, variants, image, category, description, in_stock, featured, ingredients, benefits) VALUES 
(
  'Idly Podi',
  'idly-podi',
  '[
    {"id": "1-trial", "size": "Trial Pack", "weight": "50g", "price": 45, "originalPrice": 55},
    {"id": "1-250", "size": "250g", "weight": "250g", "price": 120, "originalPrice": 140},
    {"id": "1-500", "size": "500g", "weight": "500g", "price": 220, "originalPrice": 260},
    {"id": "1-1kg", "size": "1kg", "weight": "1kg", "price": 400, "originalPrice": 480}
  ]'::jsonb,
  '/src/assets/podi-collection.jpg',
  'Traditional Podis',
  'Classic South Indian spice blend perfect with idly, dosa, and rice. Made with roasted lentils, sesame seeds, and aromatic spices.',
  true,
  true,
  '["Urad Dal", "Chana Dal", "Sesame Seeds", "Red Chili", "Hing", "Salt"]'::jsonb,
  '["Rich in Protein", "High in Fiber", "No Artificial Colors"]'::jsonb
),
(
  'Palli Podi (Peanut Powder)',
  'palli-podi-peanut-powder',
  '[
    {"id": "2-trial", "size": "Trial Pack", "weight": "50g", "price": 50, "originalPrice": 60},
    {"id": "2-250", "size": "250g", "weight": "250g", "price": 135, "originalPrice": 155},
    {"id": "2-500", "size": "500g", "weight": "500g", "price": 250, "originalPrice": 290},
    {"id": "2-1kg", "size": "1kg", "weight": "1kg", "price": 450, "originalPrice": 520}
  ]'::jsonb,
  '/src/assets/peanut-podi.jpg',
  'Traditional Podis',
  'Nutritious peanut-based powder with roasted spices. Perfect protein-rich accompaniment for any South Indian meal.',
  true,
  true,
  '["Roasted Peanuts", "Red Chili", "Garlic", "Curry Leaves", "Tamarind", "Salt"]'::jsonb,
  '["High Protein", "Rich in Healthy Fats", "Natural Energy Booster"]'::jsonb
);