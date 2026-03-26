import { motion } from 'framer-motion';
import { HiLightningBolt, HiCheckCircle, HiArrowRight, HiShieldCheck, HiFire, HiTruck } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden -mt-20 px-6">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        
        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-3 bg-orange-500/10 text-orange-500 px-6 py-2.5 rounded-full border border-orange-500/20 shadow-lg shadow-orange-500/5 backdrop-blur-sm"
          >
            <HiLightningBolt className="animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('hero_badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.8] tracking-tighter"
          >
            {t('hero_title_1')} <br />
            <span className="text-orange-500">{t('hero_title_2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-14 max-w-2xl mx-auto font-medium"
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
              className="w-full sm:w-auto px-12 py-6 bg-orange-500 text-white rounded-3xl font-black text-xl shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              {t('hero_cta')}
              <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/vision-2030"
              className="w-full sm:w-auto px-12 py-6 glass hover:bg-slate-100 dark:hover:bg-white/10 rounded-3xl font-black text-xl transition-all flex items-center justify-center gap-4 border border-white/5"
            >
              {t('hero_vision')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - Fully Translated */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        <FeatureCard 
            icon={<HiFire size={32} />} 
            title={t('feat_safe_title')} 
            desc={t('feat_safe_desc')}
            delay={0.5}
            color="bg-orange-500"
        />
        <FeatureCard 
            icon={<HiTruck size={32} />} 
            title={t('feat_fast_title')} 
            desc={t('feat_fast_desc')}
            delay={0.6}
            color="bg-blue-500"
        />
        <FeatureCard 
            icon={<HiShieldCheck size={32} />} 
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
      className="glass p-12 rounded-[3.5rem] border border-white/5 hover:bg-white/10 transition-colors group relative overflow-hidden"
    >
      <div className={`h-16 w-16 ${color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl transition-transform group-hover:rotate-12`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{desc}</p>
    </motion.div>
  );
}
