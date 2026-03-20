import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { DollarSign, Users, TrendingUp } from 'lucide-react';

interface Stats {
  salesTotal: number;
  activeClients: number;
  growth: number;
  weeklySales: { name: string; sales: number }[];
  statusDistribution: { name: string; value: number }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-12">Chargement du tableau de bord...</div>;
  if (!stats) return <div className="text-center p-12 text-red-500">Erreur réseau simulée: Failed to load stats</div>;

  return (
    <div className="space-y-8 pb-12">
      <h1 className="text-4xl font-black mb-8">Tableau de Bord</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<DollarSign size={32} className="text-green-500" />}
          title="Ventes Totales"
          value={`$${stats.salesTotal.toFixed(2)}`}
          trend="+8.2%"
          delay={0.1}
        />
        <StatCard 
          icon={<Users size={32} className="text-blue-500" />}
          title="Clients Actifs"
          value={stats.activeClients.toString()}
          trend="+12.5%"
          delay={0.2}
        />
        <StatCard 
          icon={<TrendingUp size={32} className="text-orange-500" />}
          title="Croissance Mensuelle"
          value={`${stats.growth}%`}
          trend="+2.1%"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Ventes 7 Jours */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-8 rounded-[3rem] border border-white/5 shadow-xl h-[400px]"
        >
          <h2 className="text-2xl font-bold mb-6">Évolution des Ventes (7 derniers jours)</h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.weeklySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#f97316" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#f97316', strokeWidth: 2, stroke: '#1e293b' }} 
                  activeDot={{ r: 8, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart - Répartition des commandes par statut */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-8 rounded-[3rem] border border-white/5 shadow-xl h-[400px]"
        >
          <h2 className="text-2xl font-bold mb-6">Répartition par Statut</h2>
          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.statusDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6" 
                  radius={[8, 8, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass p-8 rounded-[3rem] border border-white/5 shadow-xl hover:-translate-y-1 transition-transform"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="bg-slate-900 h-16 w-16 rounded-[2rem] flex items-center justify-center border border-white/5 shadow-inner">
          {icon}
        </div>
        <div className="bg-slate-900 px-3 py-1 rounded-full text-green-400 text-sm font-bold border border-green-500/20">
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-slate-400 font-bold mb-1">{title}</h3>
        <p className="text-4xl font-black text-white">{value}</p>
      </div>
    </motion.div>
  );
}
