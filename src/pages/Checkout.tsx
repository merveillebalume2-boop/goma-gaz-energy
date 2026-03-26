import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiArrowLeft, HiArchive, HiLightningBolt, HiArrowSmUp } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function Checkout() {
  const { total, cartCount, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeBar, setActiveBar] = useState<number | null>(null);

  if (cartCount === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8">
        <div className="h-32 w-32 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300">
           <HiArchive size={64} />
        </div>
        <h2 className="text-4xl font-black uppercase">{t('select_order')}</h2>
        <Link to="/shop" className="px-10 py-5 bg-orange-500 text-white rounded-[2rem] font-black flex items-center gap-3">
           <HiArrowLeft /> {t('nav_shop')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 pb-32">
      {/* Header avec bouton Retour */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div>
           <button 
             onClick={() => navigate('/shop')}
             className="flex items-center gap-2 text-slate-500 font-bold hover:text-orange-500 transition-colors mb-4 group lowercase"
           >
             <HiArrowLeft className="group-hover:-translate-x-2 transition-transform" />
             {t('nav_shop')}
           </button>
           <h1 className="text-6xl font-black tracking-tighter uppercase">{t('order_summary')}</h1>
        </div>
        <div className="bg-orange-500/10 text-orange-500 p-8 rounded-[3rem] border border-orange-500/20 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{t('cart_total')}</div>
            <div className="text-5xl font-black">${total.toFixed(2)}</div>
        </div>
      </header>

      {/* SECTION DES DEUX CARTES D'ÉVOLUTION STATISTIQUE (ICÔNES SUPPRIMÉES) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CARTE 1 : ÉVOLUTION DES VENTES (INTERACTIVE) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden group"
        >
            <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black uppercase tracking-widest text-orange-500">Ventes Annuel</h3>
                <span className="text-green-500 font-black text-sm">+18% Evolution</span>
            </div>
            
            {/* Visualisation Statistique (Interactive avec Flèche) */}
            <div className="h-56 flex items-end gap-3 px-2 relative">
                {[40, 60, 45, 90, 65, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group/bar cursor-pointer" onClick={() => setActiveBar(activeBar === i ? null : i)}>
                        <AnimatePresence>
                            {activeBar === i && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0 }}
                                    animate={{ opacity: 1, y: -5, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0 }}
                                    className="absolute -top-12 text-green-500 flex flex-col items-center gap-1"
                                >
                                    <span className="text-xs font-black">+24%</span>
                                    <HiArrowSmUp size={28} className="animate-bounce" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            whileHover={{ scaleX: 1.1, backgroundColor: "#f97316" }}
                            transition={{ delay: i * 0.1, duration: 1 }}
                            className={`w-full rounded-t-2xl transition-all duration-300 ${activeBar === i ? 'bg-orange-500 shadow-2xl shadow-orange-500/30' : 'bg-slate-200 dark:bg-white/10'}`}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                <span>Jan</span><span>Mars</span><span>Mai</span><span>Juil</span><span>Sept</span><span>Nov</span><span>Déc</span>
            </div>
        </motion.div>

        {/* CARTE 2 : ÉVOLUTION DES STOCKS (ICÔNES SUPPRIMÉES) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden group"
        >
            <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black uppercase tracking-widest text-blue-500">Capacité Stock</h3>
                <span className="text-slate-400 font-black text-sm">92% Global</span>
            </div>

            <div className="space-y-10 mt-10">
                <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                        <span>Gaz 6kg (Petit)</span>
                        <span className="text-orange-500">85%</span>
                    </div>
                    <div className="h-5 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '85%' }} 
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-orange-500 shadow-lg shadow-orange-500/20" 
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                        <span>Gaz 12kg (Moyen)</span>
                        <span className="text-blue-500">62%</span>
                    </div>
                    <div className="h-5 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '62%' }} 
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-blue-500 shadow-lg shadow-blue-500/20" 
                        />
                    </div>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Résumé Final et Bouton de Validation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="glass p-14 rounded-[4.5rem] border border-white/10 shadow-3xl text-center space-y-12"
      >
        <div className="space-y-6">
            <div className="h-16 w-16 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <HiCheckCircle size={40} />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">{t('checkout_desc')}</h2>
            <p className="text-slate-500 font-black max-w-xl mx-auto leading-relaxed text-lg">
               La logistique de Goma Gaz est en mouvement. Confirmez pour lancer votre livraison à domicile. 🚀⚡
            </p>
        </div>

        <button
            onClick={() => {
               alert(t('order_sent'));
               clearCart();
               navigate('/orders');
            }}
            className="w-full max-w-lg mx-auto py-8 bg-orange-500 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-6 group border-b-8 border-orange-700/50"
        >
            {t('btn_confirm')}
            <HiLightningBolt size={32} className="text-yellow-300 animate-pulse" />
        </button>
      </motion.div>
    </div>
  );
}
