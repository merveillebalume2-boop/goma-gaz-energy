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

// Seed products if empty
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (count.count === 0) {
  const insertProduct = db.prepare('INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)');
  insertProduct.run('Bouteille Gaz 6kg', 'Idéale pour les petits foyers', 15.00, 'https://images.unsplash.com/photo-1621213327685-611ff69e8ee4?w=500&q=80', 'bottle');
  insertProduct.run('Bouteille Gaz 12kg', 'La plus populaire pour les familles', 25.00, 'https://images.unsplash.com/photo-1621213327685-611ff69e8ee4?w=500&q=80', 'bottle');
  insertProduct.run('Bouteille Gaz 20kg', 'Pour la restauration et grands consommateurs', 40.00, 'https://images.unsplash.com/photo-1621213327685-611ff69e8ee4?w=500&q=80', 'bottle');
  insertProduct.run('Kit Complet Brûleur', 'Brûleur + Tuyau + Détendeur', 10.00, 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&q=80', 'accessories');
}

export default db;
