import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiShoppingCart, HiCheckCircle, HiLocationMarker, HiX, HiFire, HiCube } from 'react-icons/hi';
import { ImSpinner8 } from 'react-icons/im';
import { useCart, type Product } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const { addToCart, cartCount, total } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12 pb-24 relative min-h-screen">
      {/* Background Pylône Électrique */}
      <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden rounded-[3rem]">
        <div 
          className="absolute inset-x-0 top-0 h-[600px] bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473669651717-d57bebc66258?w=1600&q=80')" }}
        />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950" />
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6 pt-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Boutique</h1>
          <p className="text-slate-400 font-medium text-lg">Commandez votre gaz, nous livrons en 30 minutes.</p>
        </div>
        {cartCount > 0 && (
          <button 
            onClick={() => setCheckoutModalOpen(true)}
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full font-bold shadow-lg shadow-orange-500/20 transition-transform active:scale-95"
          >
            <HiShoppingCart size={20} />
            <span>Panier ({cartCount})</span>
            <span className="opacity-70">${total.toFixed(2)}</span>
          </button>
        )}
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-orange-500">
          <ImSpinner8 size={40} className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-[3rem] overflow-hidden flex flex-col group relative"
            >
              <div className="h-48 flex items-center justify-center bg-slate-950/50 border-b border-white/5 group-hover:bg-slate-900 transition-colors">
                {product.category === 'bottle' ? (
                  <HiFire size={80} className="text-orange-500 group-hover:scale-110 transition-transform duration-700 opacity-80" />
                ) : (
                  <HiCube size={80} className="text-blue-500 group-hover:scale-110 transition-transform duration-700 opacity-80" />
                )}
              </div>
              <div className="p-8 flex-1 flex flex-col relative z-20">
                <span className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-1">{product.category}</span>
                <h3 className="text-2xl font-black mb-2">{product.name}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="h-14 w-14 rounded-full bg-white/5 hover:bg-orange-500 flex items-center justify-center transition-colors shadow-inner border border-white/10"
                  >
                    <HiCheckCircle size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <CheckoutModal onClose={() => setCheckoutModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '' });
  const [gps, setGps] = useState<{lat: number, lng: number} | null>(null);
  const [locating, setLocating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getPosition = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      (err) => {
        console.error(err);
        setLocating(false);
        // Fallback fake GPS for demo
        setGps({ lat: -1.6888, lng: 29.2154 });
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Auto-fetch GPS if not manually done
    let finalGps = gps;
    if (!finalGps) {
      finalGps = { lat: -1.6888, lng: 29.2154 }; // Fallback central Goma
    }

    const payload = {
      customerName: form.name,
      phone: form.phone,
      total,
      lat: finalGps.lat,
      lng: finalGps.lng,
      status: 'En attente',
      items: cart.map(c => ({ productId: c.id, quantity: c.quantity }))
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        clearCart();
        navigate('/orders');
      }
    } catch(err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div 
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        className="glass border border-white/10 p-8 rounded-[3rem] w-full max-w-lg shadow-2xl relative my-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
          <HiX size={20} />
        </button>
        
        <h2 className="text-3xl font-black mb-8 border-b border-white/5 pb-4">Finaliser la commande</h2>
        
        <div className="space-y-4 mb-8 max-h-40 overflow-auto pr-2">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span className="font-semibold">{item.quantity}x {item.name}</span>
              <span className="text-slate-400">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-black text-xl text-orange-500">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input 
              required
              placeholder="Nom complet" 
              className="w-full bg-slate-950/50 border border-white/10 rounded-[1.5rem] px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-500"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
            />
            <input 
              required
              type="tel"
              placeholder="Téléphone (ex: +243 99...)" 
              className="w-full bg-slate-950/50 border border-white/10 rounded-[1.5rem] px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-500"
              value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})}
            />
            <button 
              type="button" 
              onClick={getPosition}
              className={`w-full flex items-center gap-3 justify-center px-6 py-4 rounded-[1.5rem] font-bold border ${gps ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-orange-500/10 border-orange-500/20 text-orange-500 hover:bg-orange-500/20'}`}
            >
              {locating ? <ImSpinner8 className="animate-spin" size={20} /> : <HiLocationMarker size={20} />}
              {gps ? 'Position GPS capturée !' : 'Détecter ma position exacte'}
            </button>
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-lg py-5 rounded-[2rem] shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all active:scale-95 flex justify-center"
          >
            {submitting ? <ImSpinner8 className="animate-spin" size={20} /> : 'Confirmer l\'expédition'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
