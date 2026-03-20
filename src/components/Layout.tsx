import { type ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ShoppingBag, Map, BarChart3, Rocket, Menu, X, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navItems = [
  { path: '/', name: 'Accueil', icon: Home },
  { path: '/shop', name: 'Boutique', icon: ShoppingBag },
  { path: '/orders', name: 'Suivi', icon: Map },
  { path: '/dashboard', name: 'Tableau de bord', icon: BarChart3 },
  { path: '/vision-2030', name: 'Vision 2030', icon: Rocket },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 fixed h-full glass border-r-white/5 rounded-r-[3rem] p-8 z-50">
        <div className="flex items-center gap-3 mb-16 text-orange-500 font-bold text-2xl tracking-tighter">
          <Flame size={36} className="text-orange-500 fill-orange-500/20" />
          <span>GOMA GAZ</span>
        </div>

        <nav className="flex-1 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 font-semibold ${
                  isActive
                    ? 'bg-orange-500/10 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={22} />
              {item.name}
              {item.path === '/shop' && cartCount > 0 && (
                <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto p-6 bg-slate-900/50 rounded-[2rem] border border-white/5 text-sm text-slate-400 text-center">
          <p>© 2026 Goma Gaz Energy.</p>
          <p>Propulser l'avenir.</p>
        </div>
      </aside>

      {/* Header - Mobile */}
      <header className="lg:hidden fixed top-0 w-full glass z-50 border-b border-white/5 flex items-center justify-between p-4 rounded-b-[2rem]">
        <div className="flex items-center gap-2 text-orange-500 font-bold text-xl">
          <Flame size={28} className="fill-orange-500/20" />
          <span>GOMA GAZ</span>
        </div>
        
        <div className="flex items-center gap-4">
          {cartCount > 0 && (
            <div className="relative text-slate-200">
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 bg-orange-500 min-w-5 text-center text-[10px] font-bold py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
          )}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-2xl bg-white/5 text-white active:scale-95"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-xl p-6 flex flex-col pt-8"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-4 rounded-full bg-white/10 text-white"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-12 text-orange-500 font-bold text-3xl">
              <Flame size={40} className="fill-orange-500/20" />
              <span>GOMA GAZ</span>
            </div>
            
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-6 p-5 rounded-[2rem] text-xl transition-all font-bold ${
                      isActive
                        ? 'bg-orange-500/10 text-orange-500'
                        : 'text-slate-300 hover:bg-white/5'
                    }`
                  }
                >
                  <item.icon size={28} />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 pt-24 lg:pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
