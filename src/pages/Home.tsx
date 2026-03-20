import { motion } from 'framer-motion';
import { Zap, Clock, ShieldCheck, MapPin, Users, Building2, Flame } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

export default function Home() {
  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-[3rem] overflow-hidden min-h-[500px] flex items-center p-8 lg:p-16 border border-white/10 glass">
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542382156909-92f80d750cbd?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-0" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-block py-2 px-4 rounded-full bg-orange-500/20 text-orange-500 font-bold mb-4 border border-orange-500/30">
              L'Énergie de Demain, Aujourd'hui.
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
              Propulsez votre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600">
                quotidien
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 text-lg lg:text-xl font-medium"
          >
            L'accès à une énergie propre, rapide et sécurisée à Goma. 
            GOMA GAZ ENERGY redéfinit la distribution avec intelligence.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4"
          >
            <NavLink 
              to="/shop"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
            >
              Commander maintenant
              <Zap size={20} className="fill-white" />
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Clock size={40} className="text-orange-500" />}
          title="Livraison 30 Min"
          desc="Notre réseau géolocalisé garantit une livraison ultra-rapide directement à votre domicile."
          delay={0.1}
        />
        <FeatureCard 
          icon={<ShieldCheck size={40} className="text-green-500" />}
          title="Énergie Propre"
          desc="Testé et sécurisé. Une alternative écologique pour préserver la santé de votre famille."
          delay={0.2}
        />
        <FeatureCard 
          icon={<Zap size={40} className="text-blue-500" />}
          title="Prix Juste"
          desc="Des tarifs transparents et compétitifs, pour démocratiser l'accès au gaz domestique."
          delay={0.3}
        />
      </section>

      {/* Nos Bouteilles de Gaz */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black">Nos Formats de Bouteilles</h2>
          <p className="text-slate-400">Pour chaque foyer, nous avons la solution d'énergie adaptée.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass rounded-[3rem] p-4 text-center space-y-4 hover:-translate-y-2 transition-all border border-white/5 group">
            <div className="overflow-hidden rounded-[2.5rem] h-56 w-full mb-4 bg-slate-900 flex items-center justify-center">
              <Flame size={80} className="text-orange-400 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-black">6 kg</h3>
            <p className="text-sm text-slate-400 pb-4">Idéal pour les studios et les couples.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass rounded-[3rem] p-4 text-center space-y-4 hover:-translate-y-2 transition-all border border-orange-500/40 relative shadow-[0_0_30px_rgba(249,115,22,0.1)] group">
            <div className="absolute top-8 right-8 bg-orange-500 text-xs font-black px-4 py-1.5 rounded-full text-white z-10 shadow-lg">FAVORI</div>
            <div className="overflow-hidden rounded-[2.5rem] h-56 w-full mb-4 bg-slate-900 flex items-center justify-center">
              <Flame size={96} className="text-orange-500 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            </div>
            <h3 className="text-2xl font-black">12 kg</h3>
            <p className="text-sm text-slate-400 pb-4">Le format classique pour une famille.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass rounded-[3rem] p-4 text-center space-y-4 hover:-translate-y-2 transition-all border border-white/5 group">
            <div className="overflow-hidden rounded-[2.5rem] h-56 w-full mb-4 bg-slate-900 flex items-center justify-center">
              <Flame size={120} className="text-orange-600 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-black">20 kg</h3>
            <p className="text-sm text-slate-400 pb-4">Pour les gros consommateurs et restaurants.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Impact */}
      <section className="bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden ring-1 ring-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black">Notre Impact à l'Est</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Nous luttons contre la déforestation du parc des Virunga en offrant une alternative accessible au charbon de bois. GOMA GAZ ENERGY n'est pas qu'une entreprise, c'est un mouvement vers un Kivu plus vert.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mt-8 bg-slate-950/40 p-4 rounded-[2rem] border border-white/5 w-fit hover:bg-slate-950/60 transition-colors"
            >
              <div className="w-16 h-16 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-orange-500 shadow-inner">
                <Zap size={32} className="fill-orange-500/20" />
              </div>
              <div className="pr-4">
                <div className="font-bold text-sm text-slate-300">Réseau & Transport</div>
                <div className="text-xs text-orange-500 font-semibold tracking-wide">ÉNERGIE CONNECTÉE</div>
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-950/50 p-6 rounded-[2rem] border border-white/5 backdrop-blur text-center space-y-2">
              <Users size={32} className="mx-auto text-orange-400" />
              <div className="text-3xl font-black text-white">15k+</div>
              <div className="text-slate-400 text-sm font-semibold">Foyers Équipés</div>
            </div>
            <div className="bg-slate-950/50 p-6 rounded-[2rem] border border-white/5 backdrop-blur text-center space-y-2">
              <Building2 size={32} className="mx-auto text-blue-400" />
              <div className="text-3xl font-black text-white">200+</div>
              <div className="text-slate-400 text-sm font-semibold">Emplois Directs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hubs Locaux */}
      <section className="space-y-8">
        <h2 className="text-3xl font-black text-center">Nos Hubs de Distribution</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['Katindo', 'Les Volcans', 'Kyeshero'].map((hub, i) => (
            <motion.div 
              key={hub}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-[2.5rem] flex items-center gap-4 hover:bg-slate-800 transition-colors"
            >
              <div className="h-16 w-16 rounded-[1.5rem] bg-orange-500/20 flex items-center justify-center text-orange-500">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{hub}</h3>
                <p className="text-sm text-slate-400">Goma, DRC</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass p-8 rounded-[3rem] space-y-4 hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="h-20 w-20 rounded-[2rem] bg-slate-950 flex items-center justify-center border border-white/5">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
    </motion.div>
  );
}
