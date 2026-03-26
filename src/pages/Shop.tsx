import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiShoppingCart, HiCheckCircle, HiX, HiFire, HiCube, HiChartBar, HiUsers } from 'react-icons/hi';
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
    <div className="space-y-12 pb-20 overflow-hidden">
      {/* Header et Stats d'Évolution */}
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between px-6">
        <header className="max-w-2xl">
            <h1 className="text-6xl font-black mb-4 tracking-tighter">{t('shop_title')}</h1>
            <p className="text-xl text-slate-500 font-bold leading-relaxed">
            {t('shop_subtitle')}
            </p>
        </header>

        {/* LES DEUX CARTES D'ÉVOLUTION RE-AJOUTÉES */}
        <div className="flex flex-wrap gap-4">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-6 min-w-[240px] shadow-xl"
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-6 min-w-[240px] shadow-xl"
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
          <p className="text-slate-500 font-black uppercase tracking-widest text-xs">{t('shop_loading')}</p>
        </div>
      ) : (
        /* INFINITE CAROUSEL FOR PRODUCTS */
        <section className="relative w-full">
            <div className="max-w-full overflow-hidden">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    whileHover={{ animationPlayState: 'paused' }}
                    className="flex gap-8 w-max px-8"
                >
                    {[...products, ...products].map((product, i) => (
                        <motion.div
                            key={`${product.id}-${i}`}
                            whileHover={{ scale: 1.02 }}
                            className="glass rounded-[3.5rem] overflow-hidden flex flex-col group relative border border-white/5 w-[350px] shrink-0"
                        >
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

      {/* Floating Checkout Toggle */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => setCheckoutModalOpen(true)}
            className="fixed bottom-8 right-8 left-8 md:right-12 md:left-auto md:w-80 h-24 bg-orange-500 text-white rounded-[2.5rem] shadow-2xl shadow-orange-500/40 flex items-center justify-between px-8 z-[1001] transition-transform hover:scale-105 active:scale-95 border-4 border-white dark:border-slate-950"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <HiShoppingCart size={28} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{t('order_summary')}</div>
                <div className="font-black text-2xl">${total.toFixed(2)}</div>
              </div>
            </div>
            <div className="h-10 w-10 bg-white text-orange-500 rounded-full flex items-center justify-center font-black">
              {cartCount}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
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
                className="absolute top-8 right-8 h-12 w-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-orange-500 transition-all"
              >
                <HiX size={32} />
              </button>
              
              <div className="mb-10 text-center">
                <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">{t('order_summary')}</h2>
                <p className="text-slate-500 font-bold">{t('checkout_desc')}</p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center bg-slate-950/20 p-8 rounded-3xl border border-white/5">
                  <span className="font-black text-slate-500 uppercase tracking-widest text-[10px]">{t('cart_total')}</span>
                  <span className="text-5xl font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                   setCheckoutModalOpen(false);
                   alert(t('order_sent'));
                }}
                className="w-full py-6 bg-orange-500 text-white rounded-3xl font-black text-xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-orange-700/50"
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
