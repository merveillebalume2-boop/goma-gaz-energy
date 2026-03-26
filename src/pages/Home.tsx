import { motion } from 'framer-motion';
import { HiLightningBolt, HiArrowRight, HiShieldCheck, HiFire, HiTruck } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="space-y-32 pb-32 overflow-hidden">
      {/* Hero Section with Power Pylon Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-20">
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
            className="mb-8 inline-flex items-center gap-3 bg-orange-500/20 text-orange-400 px-6 py-2.5 rounded-full border border-orange-500/30 shadow-2xl backdrop-blur-md"
          >
            <HiLightningBolt className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{t('hero_badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-[0.85] tracking-tighter text-white"
          >
            {t('hero_title_1')} <br />
            <span className="text-orange-500">{t('hero_title_2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto font-bold opacity-90"
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
              className="w-full sm:w-auto px-10 py-5 bg-orange-500 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group border-b-4 border-orange-700/50"
            >
              {t('hero_cta')}
              <HiArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
            </Link>
            <Link
              to="/vision-2030"
              className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-4 border border-white/20 shadow-2xl"
            >
              <HiFire size={24} className="text-orange-500" />
              {t('hero_vision')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CIRCULATING (CAROUSEL) FEATURES GRID */}
      <section className="relative px-6">
          <div className="max-w-7xl mx-auto overflow-hidden">
             <motion.div 
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-8 w-max pr-8"
             >
                {/* On double les cartes pour l'effet de circulation infinie */}
                {[1, 2].map((loop) => (
                    <div key={loop} className="flex gap-8">
                        <FeatureCard 
                            icon={<HiFire size={32} />} 
                            title={t('feat_safe_title')} 
                            desc={t('feat_safe_desc')}
                            color="bg-orange-500"
                        />
                        <FeatureCard 
                            icon={<HiTruck size={32} />} 
                            title={t('feat_fast_title')} 
                            desc={t('feat_fast_desc')}
                            color="bg-blue-500"
                        />
                        <FeatureCard 
                            icon={<HiShieldCheck size={32} />} 
                            title={t('feat_eco_title')} 
                            desc={t('feat_eco_desc')}
                            color="bg-green-500"
                        />
                    </div>
                ))}
             </motion.div>
          </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) {
  return (
    <div
      className="glass p-12 rounded-[3.5rem] border border-white/10 hover:bg-white/10 transition-colors group relative overflow-hidden shadow-xl w-[350px] sm:w-[400px]"
    >
      <div className={`h-16 w-16 ${color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-2xl transition-transform group-hover:rotate-12`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-white">{title}</h3>
      <p className="text-slate-400 font-bold leading-relaxed">{desc}</p>
    </div>
  );
}
