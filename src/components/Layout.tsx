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
      
      {/* Header Fini/Premium Minimaliste */}
      <header className={`fixed top-0 left-0 right-0 z-[1000] border-b backdrop-blur-md transition-all h-20 flex items-center ${isLight ? 'bg-white/80 border-slate-200' : 'bg-slate-950/80 border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20 group-hover:rotate-12 transition-transform">
              <HiFire size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Goma<span className="text-orange-500">Gaz</span></span>
          </Link>

          {/* Actions Droite - Minimaliste */}
          <div className="flex items-center gap-3">
             {/* Language Selector (Text buttons) */}
             <div className="hidden sm:flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10 mr-2">
              {(['fr', 'en', 'sw'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                    language === lang 
                      ? 'bg-white dark:bg-orange-500 text-orange-500 dark:text-white shadow-sm' 
                      : 'text-slate-500 hover:text-orange-500'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="h-11 w-11 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-orange-400 border border-slate-200 dark:border-white/10"
            >
              {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} /> }
            </button>

            {/* LE SEUL BOUTON MENU */}
            <button 
                onClick={() => setDrawerOpen(true)}
                className="h-11 px-5 rounded-2xl bg-orange-500 text-white flex items-center gap-3 shadow-lg shadow-orange-500/30 hover:scale-[1.05] active:scale-95 transition-all font-black"
            >
              <HiMenu size={22} />
              <span className="hidden sm:inline uppercase text-xs tracking-widest">{t('nav_menu')}</span>
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
               className="fixed inset-0 z-[1500] bg-slate-950/40 backdrop-blur-sm" 
               onClick={() => setDrawerOpen(false)} 
            />
            <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed top-0 bottom-0 right-0 w-full sm:w-[400px] z-[2000] bg-white dark:bg-slate-950 shadow-2xl flex flex-col p-8 pt-24"
            >
              {/* Header du Drawer */}
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2">
                  <HiTranslate size={24} className="text-orange-500" />
                  <span className="font-black uppercase tracking-widest text-sm">{t('nav_menu')}</span>
                </div>
                <button 
                   onClick={() => setDrawerOpen(false)}
                   className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:rotate-90 transition-all text-slate-600 dark:text-orange-400"
                >
                   <HiX size={28} />
                </button>
              </div>

              {/* Liens avec Icons */}
              <nav className="flex-1 space-y-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-5 p-6 rounded-[2.5rem] font-black transition-all group ${
                        isActive 
                          ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' 
                          : isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/5'
                      }`
                    }
                  >
                    <div className={`p-4 rounded-2xl ${isLight ? 'bg-slate-100 group-hover:bg-white' : 'bg-white/5 group-hover:bg-white/10'} transition-colors`}>
                        <item.icon size={28} className={item.color} />
                    </div>
                    <span className="text-xl tracking-tight leading-none">{item.name}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Footer du Drawer */}
              <div className="sm:hidden grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl mb-8">
                {(['fr', 'en', 'sw'] as const).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`py-3 rounded-xl text-xs font-black uppercase transition-all ${
                        language === lang 
                            ? 'bg-white dark:bg-orange-500 text-orange-500 dark:text-white shadow-sm' 
                            : 'text-slate-500'
                        }`}
                    >
                        {lang}
                    </button>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 dark:border-white/5 opacity-50">
                  <p className="text-xs font-bold text-slate-500 text-center">GOMA GAZ ENERGY &copy; {new Date().getFullYear()}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-20 px-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Footer Minimal */}
      <footer className={`py-12 border-t mt-12 ${isLight ? 'border-slate-200 bg-white/50' : 'border-white/5 bg-slate-950/20'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <HiFire size={20} className="text-orange-500" />
            <span className="font-black text-sm tracking-tighter uppercase">GomaGaz</span>
          </div>
          <p className="text-slate-500 text-xs font-medium tracking-wide">
             Goma Energy Solution. North-Kivu, DRC.
          </p>
        </div>
      </footer>
    </div>
  );
}
