-- Insert all remaining products from the default products list
INSERT INTO public.products (id, name, slug, category, description, image, in_stock, featured, ingredients, benefits, variants) VALUES 
('3', 'Sambar Powder', 'sambar-powder', 'Traditional Podis', 'Authentic sambar masala blend with perfect balance of spices. Essential for making traditional South Indian sambar.', '/src/assets/coriander-podi.jpg', true, true, '["Coriander Seeds", "Red Chili", "Turmeric", "Fenugreek", "Curry Leaves", "Hing"]', '["Digestive Properties", "Anti-inflammatory", "Rich in Antioxidants"]', '[
  {"id": "3-trial", "size": "Trial Pack", "weight": "50g", "price": 55, "originalPrice": 65},
  {"id": "3-250", "size": "250g", "weight": "250g", "price": 140, "originalPrice": 165},
  {"id": "3-500", "size": "500g", "weight": "500g", "price": 260, "originalPrice": 310},
  {"id": "3-1kg", "size": "1kg", "weight": "1kg", "price": 480, "originalPrice": 560}
]'),
('4', 'Rasam Powder', 'rasam-powder', 'Traditional Podis', 'Tangy and spicy rasam powder for the perfect South Indian soup. Made with traditional spices for authentic taste.', '/src/assets/sesame-podi.jpg', true, false, '["Coriander Seeds", "Cumin Seeds", "Black Pepper", "Red Chili", "Turmeric", "Hing"]', '["Digestive Aid", "Immunity Booster", "Cold & Cough Relief"]', '[
  {"id": "4-trial", "size": "Trial Pack", "weight": "50g", "price": 55, "originalPrice": 65},
  {"id": "4-250", "size": "250g", "weight": "250g", "price": 140, "originalPrice": 165},
  {"id": "4-500", "size": "500g", "weight": "500g", "price": 260, "originalPrice": 310},
  {"id": "4-1kg", "size": "1kg", "weight": "1kg", "price": 480, "originalPrice": 560}
]'),
('5', 'Curry Leaves Podi', 'curry-leaves-podi', 'Traditional Podis', 'Aromatic curry leaves powder packed with flavor and health benefits. A unique blend that enhances any dish.', '/src/assets/curry-leaf-podi.jpg', true, true, '["Fresh Curry Leaves", "Urad Dal", "Chana Dal", "Red Chili", "Hing", "Salt"]', '["Hair Growth", "Blood Sugar Control", "Rich in Iron"]', '[
  {"id": "5-trial", "size": "Trial Pack", "weight": "50g", "price": 60, "originalPrice": 70},
  {"id": "5-250", "size": "250g", "weight": "250g", "price": 150, "originalPrice": 175},
  {"id": "5-500", "size": "500g", "weight": "500g", "price": 280, "originalPrice": 330},
  {"id": "5-1kg", "size": "1kg", "weight": "1kg", "price": 520, "originalPrice": 600}
]'),
('6', 'Gunpowder Idly Podi', 'gunpowder-idly-podi', 'Traditional Podis', 'Spicy and flavorful gunpowder podi with extra kick. Perfect for those who love intense flavors with their breakfast.', '/src/assets/gunpowder-podi.jpg', true, false, '["Urad Dal", "Red Chili", "Sesame Seeds", "Hing", "Curry Leaves", "Salt"]', '["High Energy", "Metabolism Booster", "Rich in Proteins"]', '[
  {"id": "6-trial", "size": "Trial Pack", "weight": "50g", "price": 50, "originalPrice": 60},
  {"id": "6-250", "size": "250g", "weight": "250g", "price": 130, "originalPrice": 150},
  {"id": "6-500", "size": "500g", "weight": "500g", "price": 240, "originalPrice": 280},
  {"id": "6-1kg", "size": "1kg", "weight": "1kg", "price": 440, "originalPrice": 510}
]'),
('7', 'Coconut Chutney Podi', 'coconut-chutney-podi', 'Traditional Podis', 'Instant coconut chutney powder - just add water! Made with fresh coconut and traditional spices for authentic taste.', '/src/assets/drumstick-podi.jpg', true, false, '["Dried Coconut", "Roasted Gram", "Green Chili", "Ginger", "Curry Leaves", "Salt"]', '["Healthy Fats", "Quick Preparation", "Natural Preservative Free"]', '[
  {"id": "7-trial", "size": "Trial Pack", "weight": "50g", "price": 65, "originalPrice": 75},
  {"id": "7-250", "size": "250g", "weight": "250g", "price": 160, "originalPrice": 185},
  {"id": "7-500", "size": "500g", "weight": "500g", "price": 300, "originalPrice": 350},
  {"id": "7-1kg", "size": "1kg", "weight": "1kg", "price": 560, "originalPrice": 650}
]'),
('8', 'Bisi Bele Bath Powder', 'bisi-bele-bath-powder', 'Traditional Podis', 'Special spice blend for Karnataka''s famous Bisi Bele Bath. Complex flavor profile with aromatic spices and lentils.', '/src/assets/garlic-podi.jpg', true, true, '["Coriander Seeds", "Chana Dal", "Cinnamon", "Cloves", "Red Chili", "Turmeric"]', '["Complete Meal Enhancer", "Digestive Spices", "Traditional Recipe"]', '[
  {"id": "8-trial", "size": "Trial Pack", "weight": "50g", "price": 60, "originalPrice": 70},
  {"id": "8-250", "size": "250g", "weight": "250g", "price": 155, "originalPrice": 180},
  {"id": "8-500", "size": "500g", "weight": "500g", "price": 290, "originalPrice": 340},
  {"id": "8-1kg", "size": "1kg", "weight": "1kg", "price": 540, "originalPrice": 620}
]')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  in_stock = EXCLUDED.in_stock,
  featured = EXCLUDED.featured,
  ingredients = EXCLUDED.ingredients,
  benefits = EXCLUDED.benefits,
  variants = EXCLUDED.variants;