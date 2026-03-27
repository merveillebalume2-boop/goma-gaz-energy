import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArchive, HiArrowSmUp, HiLightningBolt, HiUser, HiPhone, HiTruck } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function Checkout() {
  const { total, cartCount, clearCart, cart } = useCart();
  const { t } = useLanguage();

  const navigate = useNavigate();
  const [activeBar, setActiveBar] = useState<number | null>(null);

  // Formulaire Client pour l'automatisation Zapier
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [isOrdering, setIsOrdering] = useState(false);

  if (cartCount === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8">
        <div className="h-32 w-32 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-300">
           <HiArchive size={64} />
        </div>
        <h2 className="text-4xl font-black">{t('select_order')}</h2>
        <Link to="/shop" className="px-10 py-5 bg-orange-500 text-white rounded-[2rem] font-black flex items-center gap-3">
           <HiArrowLeft /> {t('nav_shop')}
        </Link>
      </div>
    );
  }

  const handleOrderConfirm = async () => {
    if (!customer.name || !customer.phone) {
        alert("SVP! Veuillez remplir votre nom et numéro de téléphone pour la livraison.");
        return;
    }

    setIsOrdering(true);

    // --- DONNÉES COMPLÈTES POUR ZAPIER ---
    const orderDetails = {
        event: 'NEW_ORDER_GOMA_GAZ',
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_address: customer.address || 'Goma Central',
        total_amount: total,
        items: cart.map(item => `${item.name} (x${item.quantity})`).join(', '),
        timestamp: new Date().toLocaleString(),
        source: 'Web App Goma Gaz Energy'
    };


    try {
        // Envoi vers Zapier (Placeholder à remplacer par votre URL finale)
        await fetch('https://hooks.zapier.com/hooks/catch/1234567/abcde/', {
            method: 'POST',
            body: JSON.stringify(orderDetails),
        });
        console.log('Automated Order sent to Zapier! 🚀');
    } catch (e) {
        console.error('Automation Error:', e);
    }

    setTimeout(() => {
        alert(`${t('order_sent')} 🎉\nMerci ${customer.name}, nous vous contacterons au ${customer.phone}`);
        clearCart();
        setIsOrdering(false);
        navigate('/orders');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 pb-32">
      {/* Header */}
      <header className="flex flex-col md:items-start mb-12">
        <button 
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-orange-500 transition-colors mb-6 group border px-4 py-2 rounded-xl border-slate-200 dark:border-white/10"
        >
            <HiArrowLeft className="group-hover:-translate-x-2 transition-transform" />
            {t('nav_shop')}
        </button>
        <h1 className="text-6xl font-black tracking-tighter uppercase">{t('order_summary')}</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* COLONNE GAUCHE : FORMULAIRE CLIENT */}
        <div className="lg:col-span-2 space-y-8">
            <section className="glass p-10 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center">
                        <HiUser size={24} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Vos Coordonnées</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Nom Complet</label>
                        <div className="relative">
                            <HiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Merveille Balume"
                                className="w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-orange-500 transition-all font-bold"
                                value={customer.name}
                                onChange={(e) => setCustomer({...customer, name: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Numéro WhatsApp</label>
                        <div className="relative">
                            <HiPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="tel"
                                placeholder="+243 9..."
                                className="w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-orange-500 transition-all font-bold"
                                value={customer.phone}
                                onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Adresse à Goma (Quartier)</label>
                    <div className="relative">
                        <HiTruck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text"
                            placeholder="Quartier Himbi, Avenue..."
                            className="w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-orange-500 transition-all font-bold"
                            value={customer.address}
                            onChange={(e) => setCustomer({...customer, address: e.target.value})}
                        />
                    </div>
                </div>
            </section>

            {/* STATISTIQUES D'ÉVOLUTION RE-STYLISTÉES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-10 rounded-[3.5rem] border border-white/5 shadow-xl relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black uppercase tracking-widest text-orange-500">Ventes annuel</h3>
                        <span className="text-green-500 font-black text-xs">+18%</span>
                    </div>
                    <div className="h-40 flex items-end gap-2 relative">
                        {[40, 60, 45, 90, 65, 80, 100].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative" onClick={() => setActiveBar(i)}>
                                <AnimatePresence>
                                    {activeBar === i && (
                                        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute -top-8 text-green-500">
                                            <HiArrowSmUp size={24} className="animate-bounce" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <motion.div animate={{ height: `${h}%` }} className={`w-full rounded-t-xl transition-all ${activeBar === i ? 'bg-orange-500' : 'bg-slate-200 dark:bg-white/10'}`} />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="glass p-10 rounded-[4rem] border border-white/5 shadow-xl">
                    <h3 className="text-xl font-black uppercase tracking-widest text-blue-500 mb-8">Stock Global</h3>
                    <div className="space-y-6">
                        <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                            <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-orange-500 shadow-lg" />
                        </div>
                        <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                            <motion.div initial={{ width: 0 }} animate={{ width: '62%' }} className="h-full bg-blue-500 shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* COLONNE DROITE : RÉSUMÉ ET BOUTON ACTION */}
        <div className="space-y-8">
            <section className="glass p-10 rounded-[3.5rem] border border-orange-500/20 bg-orange-500/5 shadow-2xl text-center space-y-6">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Total à Payer</div>
                <div className="text-6xl font-black tracking-tighter">${total.toFixed(2)}</div>
                <div className="h-0.5 w-16 bg-orange-500 mx-auto opacity-30" />
                <p className="text-sm font-bold text-slate-500 italic">Livraison incluse à Goma</p>
                
                <button
                    onClick={handleOrderConfirm}
                    disabled={isOrdering}
                    className="w-full py-7 bg-orange-500 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-orange-500/40 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-4 group border-b-8 border-orange-700/50 relative overflow-hidden disabled:opacity-50"
                >
                    {isOrdering ? (
                         <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full" />
                    ) : (
                        <>
                            {t('btn_confirm')}
                            <HiLightningBolt size={24} className="text-yellow-300 group-hover:rotate-12 transition-transform" />
                        </>
                    )}
                </button>
            </section>

            <p className="text-[10px] font-black text-center text-slate-400 uppercase tracking-widest opacity-50 px-6 leading-relaxed">
               En confirmant, vos données seront transmises au service logistique pour un traitement immédiat.
            </p>
        </div>
      </div>
    </div>
  );
}
