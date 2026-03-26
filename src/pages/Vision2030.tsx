import { motion } from 'framer-motion';
import { HiLightningBolt, HiGlobe, HiChevronRight, HiFire, HiSparkles } from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';

export default function Vision2030() {
  const { t } = useLanguage();

  const phases = [
    {
      id: 1,
      title: t('phase_1_title'),
      desc: t('phase_1_desc'),
      icon: <HiFire size={24} />,
      color: 'bg-orange-500',
    },
    {
      id: 2,
      title: t('phase_2_title'),
      desc: t('phase_2_desc'),
      icon: <HiGlobe size={24} />,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      title: t('phase_3_title'),
      desc: t('phase_3_desc'),
      icon: <HiSparkles size={24} />,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="py-8 md:py-20 space-y-12 md:space-y-20 px-2 sm:px-6">
      <header className="max-w-4xl mx-auto text-center px-2">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="mb-6 inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-1.5 rounded-full border border-orange-500/20 shadow-sm"
        >
          <HiLightningBolt size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">{t('nav_vision')}</span>
        </motion.div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tighter leading-tight">
          {t('vision_title')}
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl mx-auto px-4">
          {t('vision_subtitle')}
        </p>
      </header>

      {/* Timeline / Phases */}
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-8 px-2">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="glass p-5 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] border border-white/5 hover:bg-white/10 transition-all group flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8"
          >
            {/* Phase Number / Icon */}
            <div className={`h-12 w-12 sm:h-20 sm:w-20 shrink-0 ${phase.color} rounded-2xl sm:rounded-3xl flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform`}>
              {phase.icon}
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                 <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full">Phase {phase.id}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black mb-2 sm:mb-4 tracking-tight leading-tight uppercase">{phase.title}</h3>
              <p className="text-xs sm:text-sm md:text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                {phase.desc}
              </p>
            </div>

            <HiChevronRight className="hidden md:block text-slate-400 group-hover:translate-x-2 transition-transform opacity-30" size={32} />
          </motion.div>
        ))}
      </div>

      {/* Footer Decoration */}
      <div className="max-w-xs mx-auto text-center opacity-30 pt-10">
         <div className="h-0.5 w-full bg-slate-300 dark:bg-white/10 rounded-full" />
         <p className="text-[8px] font-black uppercase tracking-widest pt-4">GOMA ENERGY STRATEGY CENTER</p>
      </div>
    </div>
  );
}
