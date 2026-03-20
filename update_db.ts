import Database from 'better-sqlite3';

const db = new Database('goma_gaz.db');

db.prepare("UPDATE products SET image = 'https://images.unsplash.com/photo-1621213327685-611ff69e8ee4?w=600&q=80' WHERE name='Bouteille Gaz 6kg'").run();
db.prepare("UPDATE products SET image = 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&q=80' WHERE name='Bouteille Gaz 12kg'").run();
db.prepare("UPDATE products SET image = 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?w=600&q=80' WHERE name='Bouteille Gaz 20kg'").run();
db.prepare("UPDATE products SET name = 'Kit Complet Brûleur (Brûleur, Tuyaux, Détendeur)', description = 'Le kit complet pour votre sécurité: Brûleur robuste, Tuyaux haute pression, et Détendeur certifié.', image = 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&q=80' WHERE name LIKE '%Kit%'").run();

console.log("Database products updated with varied images and descriptions.");
