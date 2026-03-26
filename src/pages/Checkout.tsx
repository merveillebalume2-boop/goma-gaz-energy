import { motion } from 'framer-motion';
import { HiCheckCircle, HiArrowLeft, HiChartBar, HiTrendingUp, HiArchive, HiChevronRight, HiLightningBolt } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function Checkout() {
  const { total, cartCount, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (cartCount === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8">
        <div className="h-32 w-32 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300">
           <HiArchive size={64} />
        </div>
        <h2 className="text-4xl font-black">{t('select_order')}</h2>
        <Link to="/shop" className="px-10 py-5 bg-orange-500 text-white rounded-3xl font-black flex items-center gap-3">
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
             className="flex items-center gap-2 text-slate-500 font-bold hover:text-orange-500 transition-colors mb-4 group"
           >
             <HiArrowLeft className="group-hover:-translate-x-2 transition-transform" />
             {t('nav_shop')}
           </button>
           <h1 className="text-6xl font-black tracking-tighter uppercase">{t('order_summary')}</h1>
        </div>
        <div className="bg-orange-500/10 text-orange-500 p-8 rounded-[3rem] border border-orange-500/20 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest mb-1">{t('cart_total')}</div>
            <div className="text-5xl font-black">${total.toFixed(2)}</div>
        </div>
      </header>

      {/* SECTION DES DEUX CARTES D'ÉVOLUTION STATISTIQUE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CARTE 1 : ÉVOLUTION DES VENTES (CHARTS) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-green-500/20 text-green-500 rounded-2xl flex items-center justify-center">
                        <HiTrendingUp size={30} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Ventes / Mois</h3>
                </div>
                <span className="text-green-500 font-black">+18% ce mois</span>
            </div>
            
            {/* Visualisation Statistique (Courbe de vente) */}
            <div className="h-48 flex items-end gap-3 px-4">
                {[40, 60, 45, 90, 65, 80, 100].map((h, i) => (
                    <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className={`flex-1 rounded-t-xl transition-colors ${i === 6 ? 'bg-green-500 shadow-lg shadow-green-500/20' : 'bg-green-500/20 group-hover:bg-green-500/30'}`}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                <span>Jan</span><span>Mars</span><span>Mai</span><span>Juil</span><span>Sept</span><span>Nov</span><span>Déc</span>
            </div>
        </motion.div>

        {/* CARTE 2 : ÉVOLUTION DES STOCKS (GAUGE) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center">
                        <HiChartBar size={30} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Stock Entrepôt</h3>
                </div>
                <span className="text-slate-400 font-black">92% Capacité</span>
            </div>

            <div className="space-y-8 mt-10">
                <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                        <span>Gaz 6kg (Petit)</span>
                        <span className="text-orange-500">85%</span>
                    </div>
                    <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '85%' }} 
                            className="h-full bg-orange-500 shadow-lg shadow-orange-500/20" 
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                        <span>Gaz 12kg (Moyen)</span>
                        <span className="text-blue-500">62%</span>
                    </div>
                    <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '62%' }} 
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
        className="glass p-12 rounded-[4rem] border border-white/10 shadow-3xl text-center space-y-10"
      >
        <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter">{t('checkout_desc')}</h2>
            <p className="text-slate-500 font-bold max-w-xl mx-auto leading-relaxed">
               Votre commande de {cartCount} produits est prête pour la livraison immédiate à Goma. 🚀⚡
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
            <HiCheckCircle size={36} />
            {t('btn_confirm')}
            <HiLightningBolt size={24} className="text-yellow-300 animate-pulse" />
        </button>
      </motion.div>
    </div>
  );
}
