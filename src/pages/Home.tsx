import { motion } from 'framer-motion';
import { HiLightningBolt, HiCheckCircle, HiArrowRight, HiShieldCheck, HiFire, HiTruck } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section with Power Pylon Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-20">
        {/* L'image du pylone en arrière-plan avec un overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80" 
            alt="Pylône électrique de transport d'énergie"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center z-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-3 bg-orange-500/20 text-orange-400 px-8 py-3 rounded-full border border-orange-500/30 shadow-2xl backdrop-blur-md"
          >
            <HiLightningBolt className="animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.4em]">{t('hero_badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter text-white"
          >
            {t('hero_title_1')} <br />
            <span className="text-orange-500">{t('hero_title_2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-3xl text-slate-200 mb-14 max-w-3xl mx-auto font-bold leading-relaxed opacity-90"
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Link
              to="/shop"
              className="w-full sm:w-auto px-14 py-7 bg-orange-500 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group border-b-8 border-orange-700/50"
            >
              {t('hero_cta')}
              <HiArrowRight className="group-hover:translate-x-3 transition-transform" size={28} />
            </Link>
            <Link
              to="/vision-2030"
              className="w-full sm:w-auto px-14 py-7 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white rounded-[2.5rem] font-black text-2xl transition-all flex items-center justify-center gap-4 border border-white/20 shadow-2xl"
            >
              <HiFire size={28} className="text-orange-500" />
              {t('hero_vision')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - Fully Translated */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 max-w-7xl mx-auto">
        <FeatureCard 
            icon={<HiFire size={40} />} 
            title={t('feat_safe_title')} 
            desc={t('feat_safe_desc')}
            delay={0.5}
            color="bg-orange-500"
        />
        <FeatureCard 
            icon={<HiTruck size={40} />} 
            title={t('feat_fast_title')} 
            desc={t('feat_fast_desc')}
            delay={0.6}
            color="bg-blue-500"
        />
        <FeatureCard 
            icon={<HiShieldCheck size={40} />} 
            title={t('feat_eco_title')} 
            desc={t('feat_eco_desc')}
            delay={0.7}
            color="bg-green-500"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay, color }: { icon: any, title: string, desc: string, delay: number, color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass p-14 rounded-[4rem] border border-white/10 hover:bg-white/10 transition-colors group relative overflow-hidden shadow-xl"
    >
      <div className={`h-20 w-20 ${color} rounded-2xl flex items-center justify-center text-white mb-10 shadow-2xl transition-transform group-hover:rotate-12`}>
        {icon}
      </div>
      <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 font-black text-lg leading-relaxed">{desc}</p>
    </motion.div>
  );
}
