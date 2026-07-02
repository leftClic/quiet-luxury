-- Creación de la tabla 'products' para almacenar el catálogo de productos
CREATE TABLE products (
    id VARCHAR PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT NOT NULL,
    images TEXT[] NOT NULL
);

-- Inserción de los 8 productos del catálogo original
INSERT INTO products (id, brand, model, price, description, images) VALUES
('cartier-tank-must', 'Cartier', 'Tank Must', 0, 'Acero inoxidable pulido, esfera plateada y números romanos que han definido generaciones. Una expresión de elegancia atemporal y equilibrio perfecto.', ARRAY['./products/cartier/CW-1.avif', './products/cartier/CW-2.avif', './products/cartier/CW-3.avif', './products/cartier/CW-4.avif', './products/cartier/CW-6.jpeg']),
('golden-goose-stardan', 'Golden Goose', 'Stardan White Brown Glitter Star', 0, 'Silueta inspirada en los noventa con cuero blanco tratado artesanalmente. El detalle en glitter marrón aporta una distinción sutil a la estética urbana.', ARRAY['./products/Golden-Goose-Stardan-White-Brown-Glitter-Star/GG-1.avif', './products/Golden-Goose-Stardan-White-Brown-Glitter-Star/GG-2.avif', './products/Golden-Goose-Stardan-White-Brown-Glitter-Star/GG-3.avif', './products/Golden-Goose-Stardan-White-Brown-Glitter-Star/GG-4.avif']),
('goyard-saint-sulpice', 'Goyard', 'Saint Sulpice', 0, 'Lona Goyardine verde con su característico patrón entrelazado. Un diseño ultradelgado pensado para acompañar lo esencial con absoluta discreción.', ARRAY['./products/Goyard-Saint-Sulpice/GW-1.webp', './products/Goyard-Saint-Sulpice/GW-2.webp', './products/Goyard-Saint-Sulpice/GW-3.webp', './products/Goyard-Saint-Sulpice/GW-4.webp']),
('gucci-palace-hat-w-dustbag', 'Gucci', 'Palace', 0, 'Lona GG Supreme clásica fusionada con la identidad de Palace. Una pieza de colección que eleva el streetwear a las altas esferas del diseño.', ARRAY['./products/Gucci-Palace-Hat-w-Dustbag/GH-1.jpg', './products/Gucci-Palace-Hat-w-Dustbag/GH-2.jpg', './products/Gucci-Palace-Hat-w-Dustbag/GH-3.webp', './products/Gucci-Palace-Hat-w-Dustbag/GH-4.avif']),
('gucci-wallet', 'Gucci', 'Grey Interior GG Bi-Fold', 0, 'Exterior en lona GG Supreme con interior de cuero gris texturizado. Funcionalidad refinada envuelta en una estética sobria.', ARRAY['./products/Gucci-Wallet/GW-1.avif', './products/Gucci-Wallet/GW-2.avif', './products/Gucci-Wallet/GW-3.avif']),
('hermes-belt', 'Hermes', 'H Jumping', 0, 'Cuero reversible de textura granulada con la distintiva hebilla H en acabado dorado. Un equilibrio perfecto entre artesanía y presencia discreta.', ARRAY['./products/Hermes-Belt/HB-1.jpg', './products/Hermes-Belt/HB-2.jpg']),
('louis-vuitton-bag', 'Louis Vuitton', 'Kepall Bandouliere 50 Monogram Washed Denim', 0, 'El clásico bolso de viaje reinterpretado en denim lavado. Una visión contemporánea que conserva el legado artesanal de la Maison.', ARRAY['./products/Louis-Vuitton-Bag/LV-1.avif', './products/Louis-Vuitton-Bag/LV-2.jpg', './products/Louis-Vuitton-Bag/LV-3.webp', './products/Louis-Vuitton-Bag/LV-4.webp']),
('prada-sunglasses', 'Prada', 'Linea Rosa PS 51z', 0, 'Montura de líneas precisas con lentes oscuras de alta protección. Minimalismo deportivo interpretado desde una elegancia contemporánea.', ARRAY['./products/Prada-Sunglasses/PS-1.webp', './products/Prada-Sunglasses/PS-2.webp', './products/Prada-Sunglasses/PS-3.webp', './products/Prada-Sunglasses/PS-4.webp']);
