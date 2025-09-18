-- Insert all remaining products with proper UUIDs
INSERT INTO public.products (name, slug, category, description, image, in_stock, featured, ingredients, benefits, variants) VALUES 
('Sambar Powder', 'sambar-powder', 'Traditional Podis', 'Authentic sambar masala blend with perfect balance of spices. Essential for making traditional South Indian sambar.', '/src/assets/coriander-podi.jpg', true, true, '["Coriander Seeds", "Red Chili", "Turmeric", "Fenugreek", "Curry Leaves", "Hing"]', '["Digestive Properties", "Anti-inflammatory", "Rich in Antioxidants"]', '[
  {"id": "sambar-trial", "size": "Trial Pack", "weight": "50g", "price": 55, "originalPrice": 65},
  {"id": "sambar-250", "size": "250g", "weight": "250g", "price": 140, "originalPrice": 165},
  {"id": "sambar-500", "size": "500g", "weight": "500g", "price": 260, "originalPrice": 310},
  {"id": "sambar-1kg", "size": "1kg", "weight": "1kg", "price": 480, "originalPrice": 560}
]'),
('Rasam Powder', 'rasam-powder', 'Traditional Podis', 'Tangy and spicy rasam powder for the perfect South Indian soup. Made with traditional spices for authentic taste.', '/src/assets/sesame-podi.jpg', true, false, '["Coriander Seeds", "Cumin Seeds", "Black Pepper", "Red Chili", "Turmeric", "Hing"]', '["Digestive Aid", "Immunity Booster", "Cold & Cough Relief"]', '[
  {"id": "rasam-trial", "size": "Trial Pack", "weight": "50g", "price": 55, "originalPrice": 65},
  {"id": "rasam-250", "size": "250g", "weight": "250g", "price": 140, "originalPrice": 165},
  {"id": "rasam-500", "size": "500g", "weight": "500g", "price": 260, "originalPrice": 310},
  {"id": "rasam-1kg", "size": "1kg", "weight": "1kg", "price": 480, "originalPrice": 560}
]'),
('Curry Leaves Podi', 'curry-leaves-podi', 'Traditional Podis', 'Aromatic curry leaves powder packed with flavor and health benefits. A unique blend that enhances any dish.', '/src/assets/curry-leaf-podi.jpg', true, true, '["Fresh Curry Leaves", "Urad Dal", "Chana Dal", "Red Chili", "Hing", "Salt"]', '["Hair Growth", "Blood Sugar Control", "Rich in Iron"]', '[
  {"id": "curry-trial", "size": "Trial Pack", "weight": "50g", "price": 60, "originalPrice": 70},
  {"id": "curry-250", "size": "250g", "weight": "250g", "price": 150, "originalPrice": 175},
  {"id": "curry-500", "size": "500g", "weight": "500g", "price": 280, "originalPrice": 330},
  {"id": "curry-1kg", "size": "1kg", "weight": "1kg", "price": 520, "originalPrice": 600}
]'),
('Gunpowder Idly Podi', 'gunpowder-idly-podi', 'Traditional Podis', 'Spicy and flavorful gunpowder podi with extra kick. Perfect for those who love intense flavors with their breakfast.', '/src/assets/gunpowder-podi.jpg', true, false, '["Urad Dal", "Red Chili", "Sesame Seeds", "Hing", "Curry Leaves", "Salt"]', '["High Energy", "Metabolism Booster", "Rich in Proteins"]', '[
  {"id": "gunpowder-trial", "size": "Trial Pack", "weight": "50g", "price": 50, "originalPrice": 60},
  {"id": "gunpowder-250", "size": "250g", "weight": "250g", "price": 130, "originalPrice": 150},
  {"id": "gunpowder-500", "size": "500g", "weight": "500g", "price": 240, "originalPrice": 280},
  {"id": "gunpowder-1kg", "size": "1kg", "weight": "1kg", "price": 440, "originalPrice": 510}
]'),
('Coconut Chutney Podi', 'coconut-chutney-podi', 'Traditional Podis', 'Instant coconut chutney powder - just add water! Made with fresh coconut and traditional spices for authentic taste.', '/src/assets/drumstick-podi.jpg', true, false, '["Dried Coconut", "Roasted Gram", "Green Chili", "Ginger", "Curry Leaves", "Salt"]', '["Healthy Fats", "Quick Preparation", "Natural Preservative Free"]', '[
  {"id": "coconut-trial", "size": "Trial Pack", "weight": "50g", "price": 65, "originalPrice": 75},
  {"id": "coconut-250", "size": "250g", "weight": "250g", "price": 160, "originalPrice": 185},
  {"id": "coconut-500", "size": "500g", "weight": "500g", "price": 300, "originalPrice": 350},
  {"id": "coconut-1kg", "size": "1kg", "weight": "1kg", "price": 560, "originalPrice": 650}
]'),
('Bisi Bele Bath Powder', 'bisi-bele-bath-powder', 'Traditional Podis', 'Special spice blend for Karnataka''s famous Bisi Bele Bath. Complex flavor profile with aromatic spices and lentils.', '/src/assets/garlic-podi.jpg', true, true, '["Coriander Seeds", "Chana Dal", "Cinnamon", "Cloves", "Red Chili", "Turmeric"]', '["Complete Meal Enhancer", "Digestive Spices", "Traditional Recipe"]', '[
  {"id": "bisi-trial", "size": "Trial Pack", "weight": "50g", "price": 60, "originalPrice": 70},
  {"id": "bisi-250", "size": "250g", "weight": "250g", "price": 155, "originalPrice": 180},
  {"id": "bisi-500", "size": "500g", "weight": "500g", "price": 290, "originalPrice": 340},
  {"id": "bisi-1kg", "size": "1kg", "weight": "1kg", "price": 540, "originalPrice": 620}
]');