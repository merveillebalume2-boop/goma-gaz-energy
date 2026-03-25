import Database from 'better-sqlite3';

const db = new Database('goma_gaz.db');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerName TEXT NOT NULL,
    phone TEXT NOT NULL,
    total REAL NOT NULL,
    status TEXT NOT NULL, -- 'En attente', 'En route', 'Livré'
    lat REAL,
    lng REAL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(orderId) REFERENCES orders(id),
    FOREIGN KEY(productId) REFERENCES products(id)
  );
`);

// Seed products if empty, otherwise update images
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };

const products = [
  { name: 'Bouteille Gaz 6kg',   description: 'Format compact idéal pour les petits foyers, facile à transporter.', price: 15.00, image: '/gaz_6kg.png',     category: 'bottle' },
  { name: 'Bouteille Gaz 12kg',  description: 'Le format standard le plus utilisé pour la cuisine familiale quotidienne.', price: 25.00, image: '/gaz_12kg.png',    category: 'bottle' },
  { name: 'Bouteille Gaz 20kg',  description: 'Grand format haute capacité pour les professionnels et familles nombreuses.', price: 40.00, image: 'https://images.unsplash.com/photo-1621213327685-611ff69e8ee4?w=800&q=80', category: 'bottle' },
  { name: 'Kit Complet Brûleur', description: 'Ensemble complet comprenant : 1 Brûleur robuste, 1 Tuyau renforcé et 1 Détendeur certifié.', price: 10.00, image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800&q=80', category: 'accessories' },
];

if (count.count === 0) {
  // Premier démarrage : on insère tout
  const insertProduct = db.prepare('INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)');
  for (const p of products) {
    insertProduct.run(p.name, p.description, p.price, p.image, p.category);
  }
} else {
  // Mise à jour des images locales pour les produits existants
  const updateImage = db.prepare('UPDATE products SET image = ?, description = ? WHERE name = ?');
  for (const p of products) {
    updateImage.run(p.image, p.description, p.name);
  }
}

export default db;

