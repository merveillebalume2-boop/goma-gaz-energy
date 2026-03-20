import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Sun, Leaf, Atom, Wifi } from 'lucide-react';

const pillars = [
  { id: 1, title: 'Hydroélectricité', desc: 'Exploitation responsable des ressources hydrauliques pour compléter le réseau existant.', icon: Zap },
  { id: 2, title: 'Gaz Méthane', desc: 'Extraction sécurisée et valorisation du gaz méthane du Lac Kivu en électricité verte.', icon: Activity },
  { id: 3, title: 'Énergie Solaire', desc: 'Déploiement de fermes solaires et de micro-réseaux pour l\'autonomie des quartiers périphériques.', icon: Sun },
  { id: 4, title: 'Biomasse', desc: 'Valorisation des déchets organiques urbains et ruraux via des digesteurs modernes et écologiques.', icon: Leaf },
  { id: 5, title: 'Nucléaire Civil', desc: 'Initiation d\'un programme de recherche sur les SMR (Small Modular Reactors) pour 2040.', icon: Atom },
  { id: 6, title: 'Smart Grid', desc: 'Intégration de compteurs intelligents et d\'infrastructures connectées pour optimiser la distribution.', icon: Wifi }
];

const roadmap = [
  { year: 2026, text: 'Phase I : Lancement de Goma Gaz. Adoption massive par 15k foyers et diminution visible de la déforestation.' },
  { year: 2027, text: 'Phase II : Intégration des paiements mobiles, mise en place des micro-réseaux solaires pour zones hors-réseau.' },
  { year: 2028, text: 'Phase III : Mise en service de la première unité d\'extraction locale de biogaz et valorisation de la biomasse.' },
  { year: 2029, text: 'Phase IV : Extension nationale du Smart Grid et début des forages commerciaux du méthane du Lac Kivu.' },
  { year: 2030, text: 'Vision Accomplie : 80% des besoins de l\'Est congolais couverts par des énergies propres et souveraines.' },
];

export default function Vision2030() {
  const [activeYear, setActiveYear] = useState<number>(2026);

  return (
    <div className="space-y-16 pb-24">
      {/* Hero Vision */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-12">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-block py-2 px-6 rounded-full bg-slate-900 border border-white/5 text-orange-500 font-bold mb-4">
          Le Plan d'Action Stratégique
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-5xl lg:text-7xl font-black text-white px-4"
        >
          Vision Énergétique <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">2030</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-slate-400 text-xl max-w-2xl mx-auto font-medium"
        >
          Plus qu'une application, un écosystème entier pour garantir la souveraineté énergétique et écologique du Nord-Kivu.
        </motion.p>
      </section>

      {/* 6 Piliers */}
      <section className="space-y-12">
        <h2 className="text-3xl font-black text-center border-b border-white/5 pb-8">Les 6 Piliers Fondamentaux</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div 
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[3rem] hover:-translate-y-2 transition-transform shadow-xl group border border-white/5 border-t-white/10"
            >
              <div className="h-20 w-20 rounded-[2rem] bg-slate-950 flex items-center justify-center mb-6 shadow-inner text-slate-300 group-hover:text-orange-500 group-hover:bg-slate-900 transition-colors border border-white/5">
                <pillar.icon size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roadmap Interactive */}
      <section className="glass rounded-[4rem] p-12 lg:p-20 shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 space-y-16">
          <h2 className="text-4xl font-black text-center mb-12">Feuille de Route</h2>
          
          <div className="flex justify-between items-center relative max-w-4xl mx-auto">
            <div className="absolute left-0 right-0 h-1 bg-slate-800 rounded-full top-6 -z-10" />
            {roadmap.map((item) => (
              <div key={item.year} className="relative flex flex-col items-center group cursor-pointer" onClick={() => setActiveYear(item.year)}>
                <div 
                  className={`h-12 w-12 rounded-full border-[4px] flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    activeYear === item.year 
                      ? 'bg-orange-500 border-slate-950 text-white scale-125 shadow-[0_0_20px_rgba(249,115,22,0.5)]' 
                      : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-orange-500'
                  }`}
                >
                  {item.year - 2000}
                </div>
                <div className={`mt-4 font-bold text-lg transition-colors ${activeYear === item.year ? 'text-white' : 'text-slate-500'}`}>
                  {item.year}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center h-48 flex items-center justify-center">
            {roadmap.filter(r => r.year === activeYear).map(item => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="bg-slate-950/80 backdrop-blur border border-white/10 p-8 rounded-[3rem] text-xl font-medium text-slate-300 leading-relaxed shadow-lg"
              >
                {item.text}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
