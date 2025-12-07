-- Update product images to use public folder paths (accessible via URL)
UPDATE products SET image = '/garlic-podi.jpg' WHERE slug = 'bisi-bele-bath-powder';
UPDATE products SET image = '/drumstick-podi.jpg' WHERE slug = 'coconut-chutney-podi';
UPDATE products SET image = '/curry-leaf-podi.jpg' WHERE slug = 'curry-leaves-podi';
UPDATE products SET image = '/gunpowder-podi.jpg' WHERE slug = 'gunpowder-idly-podi';
UPDATE products SET image = '/podi-collection.jpg' WHERE slug = 'idly-podi';
UPDATE products SET image = '/peanut-podi.jpg' WHERE slug = 'palli-podi';
UPDATE products SET image = '/sesame-podi.jpg' WHERE slug = 'rasam-powder';
UPDATE products SET image = '/coriander-podi.jpg' WHERE slug = 'sambar-powder';