import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiShoppingCart, HiFire, HiCube, HiChartBar, HiUsers, HiCash } from 'react-icons/hi';
import { ImSpinner8 } from 'react-icons/im';
import { useCart, type Product } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export default function Shop() {
  const { addToCart, cartCount, total } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<(Product & { stock?: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const productsWithStock = data.map((p: any) => ({
            ...p,
            stock: Math.floor(Math.random() * 20) + 5
        }));
        setProducts(productsWithStock);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12 pb-20 overflow-hidden">
      {/* Header et Stats de Ventes / Évolution */}
      <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between px-6">
        <header className="max-w-xl">
            <h1 className="text-6xl font-black mb-4 tracking-tighter uppercase">{t('shop_title')}</h1>
            <p className="text-xl text-slate-500 font-bold leading-relaxed">
            {t('shop_subtitle')}
            </p>
        </header>

        {/* CARTES DE STATISTIQUES (VENTES ET ÉVOLUTION) */}
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-6 flex-1 xl:min-w-[220px] shadow-xl"
            >
                <div className="h-14 w-14 bg-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center">
                    <HiChartBar size={28} />
                </div>
                <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Croissance</div>
                    <div className="text-2xl font-black">+24%</div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-6 flex-1 xl:min-w-[220px] shadow-xl"
            >
                <div className="h-14 w-14 bg-green-500/20 text-green-500 rounded-2xl flex items-center justify-center">
                    <HiCash size={28} />
                </div>
                <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Ventes</div>
                    <div className="text-2xl font-black">$42.5k</div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-6 flex-1 xl:min-w-[220px] shadow-xl"
            >
                <div className="h-14 w-14 bg-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center">
                    <HiUsers size={28} />
                </div>
                <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Clients</div>
                    <div className="text-2xl font-black">1.2k+</div>
                </div>
            </motion.div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 px-6">
          <ImSpinner8 size={48} className="text-orange-500 animate-spin" />
          <p className="text-slate-500 font-black uppercase tracking-widest text-xs uppercase">{t('shop_loading')}</p>
        </div>
      ) : (
        /* INFINITE CAROUSEL FOR PRODUCTS */
        <section className="relative w-full">
            <div className="max-w-full overflow-hidden">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    whileHover={{ animationPlayState: 'paused' }}
                    className="flex gap-8 w-max px-8"
                >
                    {[...products, ...products].map((product, i) => (
                        <motion.div
                            key={`${product.id}-${i}`}
                            whileHover={{ scale: 1.02 }}
                            className="glass rounded-[3.5rem] overflow-hidden flex flex-col group relative border border-white/5 w-[350px] shrink-0"
                        >
                            {/* Stock Badge */}
                            <div className="absolute top-6 right-6 z-30">
                                <div className={`px-4 py-2 rounded-full font-black text-[10px] uppercase shadow-lg ${
                                    (product.stock || 0) < 10 
                                    ? 'bg-orange-500 text-white animate-pulse' 
                                    : 'bg-green-500/80 text-white backdrop-blur-sm'
                                }`}>
                                    Stock: {product.stock}
                                </div>
                            </div>

                            <div className="h-48 flex items-center justify-center bg-slate-950/50 border-b border-white/5 group-hover:bg-slate-900 transition-colors">
                                {product.category === 'bottle' ? (
                                <HiFire size={80} className="text-orange-500 group-hover:scale-110 transition-transform duration-700 opacity-80" />
                                ) : (
                                <HiCube size={80} className="text-blue-500 group-hover:scale-110 transition-transform duration-700 opacity-80" />
                                )}
                            </div>
                            <div className="p-8 flex-1 flex flex-col relative z-20">
                                <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-1">{product.category}</span>
                                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{product.name}</h3>
                                <p className="text-slate-500 text-sm font-bold mb-6 flex-1 italic">{product.description}</p>
                                
                                <div className="flex items-center justify-between mt-auto">
                                <span className="text-3xl font-black">${product.price.toFixed(2)}</span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(product);
                                    }}
                                    className="h-14 w-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all font-black"
                                >
                                    <HiShoppingCart size={24} />
                                </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        </section>
      )}

      {/* Floating Checkout Toggle REDIRECTING TO /CHECKOUT */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => navigate('/checkout')}
            className="fixed bottom-8 right-8 left-8 md:right-12 md:left-auto md:w-96 h-24 bg-orange-500 text-white rounded-[2.5rem] shadow-2xl shadow-orange-500/60 flex items-center justify-between px-10 z-[1001] transition-transform hover:scale-105 active:scale-95 border-b-8 border-orange-700/50"
          >
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <HiShoppingCart size={32} />
              </div>
              <div className="text-left font-black">
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">{t('order_summary')}</div>
                <div className="text-3xl tracking-tighter">${total.toFixed(2)}</div>
              </div>
            </div>
            <div className="h-12 w-12 bg-white text-orange-500 rounded-full flex items-center justify-center font-black text-xl">
              {cartCount}
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
