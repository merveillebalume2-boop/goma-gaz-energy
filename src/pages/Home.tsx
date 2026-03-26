import { motion } from 'framer-motion';
import { HiLightningBolt, HiCheckCircle, HiArrowRight, HiShieldCheck, HiFire } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden -mt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        
        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-6 py-2.5 rounded-full border border-orange-500/20 shadow-lg shadow-orange-500/5 backdrop-blur-sm"
          >
            <HiLightningBolt className="animate-bounce" />
            <span className="text-sm font-black uppercase tracking-[0.2em]">{t('nav_vision')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
          >
            {t('hero_title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-medium"
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/shop"
              className="w-full sm:w-auto px-10 py-5 bg-orange-500 text-white rounded-3xl font-black text-lg shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              {t('hero_cta')}
              <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/vision-2030"
              className="w-full sm:w-auto px-10 py-5 glass hover:bg-slate-100 dark:hover:bg-white/10 rounded-3xl font-black text-lg transition-all flex items-center justify-center gap-3"
            >
              {t('hero_vision')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        <FeatureCard 
            icon={<HiFire size={32} />} 
            title="Sûr & Certifié" 
            desc="Toutes nos bouteilles passent un contrôle de sécurité rigoureux avant livraison."
            delay={0.5}
        />
        <FeatureCard 
            icon={<HiCheckCircle size={32} />} 
            title="Livraison Express" 
            desc="Suivez votre commande en temps réel sur la carte jusqu'à votre porte."
            delay={0.6}
        />
        <FeatureCard 
            icon={<HiShieldCheck size={32} />} 
            title="Énergie Propre" 
            desc="Engagement pour la transition énergétique du Nord-Kivu."
            delay={0.7}
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass p-10 rounded-[3rem] border border-white/5 hover:bg-white/10 transition-colors group"
    >
      <div className="h-16 w-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-orange-500/20 group-hover:rotate-12 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </motion.div>
  );
}
