import { type ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiHome,
  HiShoppingBag,
  HiMap,
  HiChartBar,
  HiLightBulb,
  HiMenu,
  HiX,
  HiSun,
  HiMoon,
  HiShoppingCart,
  HiFire,
} from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { path: '/', name: 'Accueil', icon: HiHome },
  { path: '/shop', name: 'Boutique', icon: HiShoppingBag },
  { path: '/orders', name: 'Suivi', icon: HiMap },
  { path: '/dashboard', name: 'Tableau de bord', icon: HiChartBar },
  { path: '/vision-2030', name: 'Vision 2030', icon: HiLightBulb },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === 'light';

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Top Bar */}
      <header
        className="fixed top-0 w-full z-50 glass"
        style={{ borderBottom: '1px solid var(--border-color)' }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 text-orange-500 font-black text-xl tracking-tight">
            <HiFire size={28} className="text-orange-500" />
            <span>GOMA GAZ</span>
          </NavLink>

          {/* Actions droite */}
          <div className="flex items-center gap-3">
            {/* Panier */}
            {cartCount > 0 && (
              <NavLink
                to="/shop"
                className="relative p-2 rounded-full"
                style={{ background: 'var(--bg-card)' }}
              >
                <HiShoppingCart size={22} className="text-orange-500" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black min-w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              </NavLink>
            )}

            {/* Toggle Thème */}
            <button
              onClick={toggleTheme}
              id="theme-toggle"
              title={isLight ? 'Passer en mode sombre' : 'Passer en mode clair'}
              className="p-2 rounded-full transition-all active:scale-90 hover:opacity-80"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              {isLight ? (
                <HiMoon size={20} className="text-slate-700" />
              ) : (
                <HiSun size={20} className="text-yellow-400" />
              )}
            </button>

            {/* Bouton Menu Hamburger */}
            <button
              id="menu-toggle"
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-full bg-orange-500 text-white fab-pulse transition-all active:scale-90 shadow-lg shadow-orange-500/30"
            >
              <HiMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay Menu complet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 flex flex-col p-8 shadow-2xl"
              style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header du menu */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2 text-orange-500 font-black text-xl">
                  <HiFire size={28} />
                  <span>GOMA GAZ</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full transition-all active:scale-90"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                >
                  <HiX size={20} style={{ color: 'var(--text-primary)' }} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2 flex-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-4 p-4 rounded-2xl font-bold text-base transition-all ${
                          isActive
                            ? 'bg-orange-500/10 text-orange-500'
                            : 'hover:bg-orange-500/5'
                        }`
                      }
                      style={({ isActive }) => ({
                        color: isActive ? '#f97316' : 'var(--text-primary)',
                      })}
                    >
                      <item.icon size={22} />
                      {item.name}
                      {item.path === '/shop' && cartCount > 0 && (
                        <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Toggle thème dans le menu */}
              <div
                className="mt-auto pt-6 rounded-2xl p-4 flex items-center justify-between"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {isLight ? 'Mode Clair' : 'Mode Sombre'}
                </span>
                <button
                  onClick={toggleTheme}
                  className="relative w-12 h-6 rounded-full transition-all duration-300"
                  style={{ backgroundColor: isLight ? '#f97316' : '#334155' }}
                >
                  <motion.div
                    animate={{ x: isLight ? 24 : 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow flex items-center justify-center"
                  >
                    {isLight ? <HiSun size={10} className="text-orange-500" /> : <HiMoon size={10} className="text-slate-400" />}
                  </motion.div>
                </button>
              </div>

              <p className="text-center text-xs mt-4" style={{ color: 'var(--text-secondary)' }}>
                © 2026 Goma Gaz Energy
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <main className="flex-1 pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
