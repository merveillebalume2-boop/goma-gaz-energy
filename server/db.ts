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
  { name: 'Bouteille Gaz 6kg',   description: 'Idéale pour les petits foyers et studios', price: 15.00, image: '/gaz_6kg.png',     category: 'bottle' },
  { name: 'Bouteille Gaz 12kg',  description: 'La plus populaire pour les familles',       price: 25.00, image: '/gaz_12kg.png',    category: 'bottle' },
  { name: 'Bouteille Gaz 20kg',  description: 'Pour la restauration et grands consommateurs', price: 40.00, image: '/gaz_20kg.png', category: 'bottle' },
  { name: 'Kit Complet Brûleur', description: 'Brûleur + Tuyau + Détendeur inclus',        price: 10.00, image: '/kit_bruleur.png', category: 'accessories' },
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

