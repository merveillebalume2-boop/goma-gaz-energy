import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Récupération des produits
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: 'Erreur lors de la récupération des produits: ' + err.message });
  }
});

// Création d'une commande
app.post('/api/orders', (req, res) => {
  try {
    const { customerName, phone, total, items, status, lat, lng } = req.body;
    
    // Validation basique
    if (!customerName || !phone || !items || items.length === 0) {
      return res.status(400).json({ error: 'Données de commande invalides' });
    }

    const insertOrder = db.prepare(
      'INSERT INTO orders (customerName, phone, total, status, lat, lng) VALUES (?, ?, ?, ?, ?, ?)'
    );
    
    // Coordonnées de Goma par défaut si non fournies
    const finalLat = lat ?? -1.6888; 
    const finalLng = lng ?? 29.2154; 
    
    const info = insertOrder.run(customerName, phone, total, status || 'En attente', finalLat, finalLng);
    const orderId = info.lastInsertRowid;
    
    const insertItem = db.prepare(
      'INSERT INTO order_items (orderId, productId, quantity) VALUES (?, ?, ?)'
    );
    
    for (const item of items) {
      insertItem.run(orderId, item.productId, item.quantity);
    }
    
    res.json({ success: true, orderId });
  } catch (err: any) {
    res.status(500).json({ error: 'Erreur lors de la création de la commande: ' + err.message });
  }
});

// Récupération de toutes les commandes (historique et suivi)
app.get('/api/orders', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all();
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: 'Erreur réseau/Firestore simulée: ' + err.message });
  }
});

// Récupération des statistiques pour le tableau de bord
app.get('/api/stats', (req, res) => {
  try {
    const salesResult = db.prepare("SELECT SUM(total) as sales FROM orders WHERE status = 'Livré'").get() as any;
    const usersResult = db.prepare("SELECT COUNT(DISTINCT phone) as count FROM orders").get() as any;
    
    // Simulons des ventes sur 7 jours
    const weeklySales = [
        { name: 'Lun', sales: 400 },
        { name: 'Mar', sales: 300 },
        { name: 'Mer', sales: 550 },
        { name: 'Jeu', sales: 700 },
        { name: 'Ven', sales: 650 },
        { name: 'Sam', sales: 900 },
        { name: 'Dim', sales: 850 },
    ];
    
    // Statut des commandes
    const statusResult = db.prepare("SELECT status, COUNT(*) as count FROM orders GROUP BY status").all() as any[];
    const statuses = statusResult.reduce((acc, curr) => {
        acc[curr.status] = curr.count;
        return acc;
    }, { 'En attente': 0, 'En route': 0, 'Livré': 0 });

    res.json({
      salesTotal: salesResult.sales || 0,
      activeClients: usersResult.count || 0,
      growth: 15.4,
      weeklySales,
      statusDistribution: [
        { name: 'En attente', value: statuses['En attente'] || 0 },
        { name: 'En route', value: statuses['En route'] || 0 },
        { name: 'Livré', value: statuses['Livré'] || 0 }
      ]
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Erreur api/stats: ' + err.message });
  }
});

// Route de santé pour Render
app.get('/', (req, res) => {
  res.send('API Goma Gaz Energy est en ligne !');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur le port ${PORT}`);
});
