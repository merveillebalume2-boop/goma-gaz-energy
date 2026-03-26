import { ReactNode, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  HiHome, 
  HiShoppingCart, 
  HiTruck, 
  HiDatabase, 
  HiFire, 
  HiMoon, 
  HiSun,
  HiMenu,
  HiX,
  HiLightningBolt,
  HiTranslate
} from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const isLight = theme === 'light';

  const navItems = [
    { name: t('nav_home'), path: '/', icon: HiHome, color: 'text-blue-500' },
    { name: t('nav_vision'), path: '/vision-2030', icon: HiLightningBolt, color: 'text-yellow-500' },
    { name: t('nav_shop'), path: '/shop', icon: HiShoppingCart, color: 'text-orange-500' },
    { name: t('nav_orders'), path: '/orders', icon: HiTruck, color: 'text-green-500' },
    { name: t('nav_dashboard'), path: '/dashboard', icon: HiDatabase, color: 'text-purple-500' },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'}`}>
      
      {/* Header avec Sélecteur de Langue Prioritaire */}
      <header className={`fixed top-0 left-0 right-0 z-[1000] border-b backdrop-blur-xl transition-all h-24 flex items-center ${isLight ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-slate-950/90 border-white/5 shadow-2xl'}`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-orange-500/30 group-hover:rotate-12 transition-transform">
              <HiFire size={30} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase hidden sm:inline text-orange-500">Goma<span className={isLight ? 'text-slate-900' : 'text-white'}>Gaz</span></span>
          </Link>

          {/* Actions Droite - Multilingue Visible */}
          <div className="flex items-center gap-4">
             {/* SÉLECTEUR DE LANGUE TRÈS VISIBLE */}
             <div className="flex bg-slate-200 dark:bg-white/10 p-1.5 rounded-2xl border border-slate-300 dark:border-white/10 shadow-inner">
              {(['fr', 'en', 'sw'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-2 ${
                    language === lang 
                      ? 'bg-orange-500 text-white shadow-xl scale-105' 
                      : 'text-slate-500 hover:text-orange-500'
                  }`}
                >
                  <HiTranslate size={14} className={language === lang ? 'opacity-100' : 'opacity-40'} />
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-white/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-orange-400 border border-slate-300 dark:border-white/10 shadow-sm"
            >
              {theme === 'dark' ? <HiSun size={24} /> : <HiMoon size={24} /> }
            </button>

            {/* BOUTON MENU */}
            <button 
                onClick={() => setDrawerOpen(true)}
                className="h-12 px-6 rounded-2xl bg-orange-500 text-white flex items-center gap-4 shadow-2xl shadow-orange-500/40 hover:scale-[1.05] active:scale-95 transition-all font-black border-b-4 border-orange-700/50"
            >
              <HiMenu size={26} />
              <span className="hidden md:inline uppercase text-sm tracking-widest">{t('nav_menu')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* PANNEAU LATÉRAL (DRAWER) */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[1500] bg-slate-950/60 backdrop-blur-md" 
               onClick={() => setDrawerOpen(false)} 
            />
            <motion.div 
               initial={{ x: '100%', opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: '100%', opacity: 0 }}
               transition={{ type: 'spring', damping: 30, stiffness: 250 }}
               className="fixed top-0 bottom-0 right-0 w-full md:w-[500px] z-[2000] bg-white dark:bg-slate-950 shadow-2xl flex flex-col p-10 pt-32"
            >
              <div className="flex items-center justify-between mb-16 px-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center">
                    <HiTranslate size={28} />
                  </div>
                  <div>
                    <h2 className="font-black uppercase tracking-[0.2em] text-sm text-orange-500">{t('nav_menu')}</h2>
                    <p className="text-xs font-bold text-slate-400">Goma Energy Solutions</p>
                  </div>
                </div>
                <button 
                   onClick={() => setDrawerOpen(false)}
                   className="h-14 w-14 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:rotate-90 transition-all text-slate-400 hover:text-orange-500 shadow-xl"
                >
                   <HiX size={32} />
                </button>
              </div>

              <nav className="flex-1 space-y-4 px-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setDrawerOpen(false)}
                      className={({ isActive }) => 
                        `flex items-center gap-6 p-8 rounded-[3rem] font-black transition-all group ${
                          isActive 
                            ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/40 scale-[1.02]' 
                            : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/5'
                        }`
                      }
                    >
                      <div className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-inner transition-colors ${isLight ? 'bg-slate-200 group-hover:bg-white' : 'bg-white/10 group-hover:bg-white/20'}`}>
                          <item.icon size={32} className={item.color} />
                      </div>
                      <span className="text-2xl tracking-tighter leading-none">{item.name}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-10 px-4 space-y-6">
                 {/* Mobile Quick Language Switcher */}
                 <div className="md:hidden grid grid-cols-3 gap-3">
                    {(['fr', 'en', 'sw'] as const).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => { setLanguage(lang); setDrawerOpen(false); }}
                            className={`py-5 rounded-3xl text-sm font-black uppercase transition-all shadow-xl ${
                            language === lang 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-slate-200 dark:bg-white/5 text-slate-500'
                            }`}
                        >
                            {lang}
                        </button>
                    ))}
                 </div>
                 <p className="text-[10px] font-black text-slate-400 text-center uppercase tracking-widest opacity-50">GOMA GAZ ENERGY &copy; {new Date().getFullYear()}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-24 px-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      <footer className={`py-16 border-t mt-16 ${isLight ? 'border-slate-200 bg-white/50' : 'border-white/5 bg-slate-950/20'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HiFire size={24} className="text-orange-500" />
            <span className="font-black text-lg tracking-tight uppercase">Goma<span className="text-orange-500">Gaz</span></span>
          </div>
          <p className="text-slate-500 text-sm font-black opacity-60 tracking-wider">
             Goma Energy Solutions &bull; Nord-Kivu, DRC &bull; 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
