import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiShoppingCart, HiCheckCircle, HiLocationMarker, HiX, HiFire, HiCube } from 'react-icons/hi';
import { ImSpinner8 } from 'react-icons/im';
import { useCart, type Product } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

export default function Shop() {
  const { addToCart, cartCount, total } = useCart();
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <header className="max-w-3xl">
        <h1 className="text-6xl font-black mb-6 tracking-tighter">{t('shop_title')}</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          {t('shop_subtitle')}
        </p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <ImSpinner8 size={48} className="text-orange-500 animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Chargement des produits...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <p className="text-slate-500 text-sm font-medium mb-6 flex-1">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-3xl font-black">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="h-14 w-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-110 active:scale-90 transition-all font-black"
                    title={t('btn_add_to_cart')}
                  >
                    <HiShoppingCart size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Checkout Toggle */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => setCheckoutModalOpen(true)}
            className="fixed bottom-8 right-8 left-8 md:right-12 md:left-auto md:w-80 h-20 bg-orange-500 text-white rounded-3xl shadow-2xl shadow-orange-500/40 flex items-center justify-between px-8 z-[1001] transition-transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                <HiShoppingCart size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-70">{t('order_summary')}</div>
                <div className="font-black text-xl">${total.toFixed(2)}</div>
              </div>
            </div>
            <div className="h-10 w-10 bg-white text-orange-500 rounded-full flex items-center justify-center font-black">
              {cartCount}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mini Checkout Modal Placeholder */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
              onClick={() => setCheckoutModalOpen(false)} 
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-lg glass bg-white dark:bg-slate-900 rounded-[3rem] p-10 relative z-10 border border-white/5"
            >
              <button 
                onClick={() => setCheckoutModalOpen(false)}
                className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors"
              >
                <HiX size={32} />
              </button>
              
              <div className="mb-10">
                <h2 className="text-3xl font-black mb-2">{t('order_summary')}</h2>
                <p className="text-slate-500 font-medium">Confirmation de votre livraison à Goma.</p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center bg-slate-950/50 p-6 rounded-3xl border border-white/5">
                  <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Total</span>
                  <span className="text-4xl font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setCheckoutModalOpen(false);
                  alert('Commande envoyée ! Redirection vers le suivi...');
                }}
                className="w-full py-6 bg-orange-500 text-white rounded-3xl font-black text-xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <HiCheckCircle size={28} />
                {t('btn_confirm')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
