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
  HiLightningBolt
} from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const isLight = theme === 'light';

  const navItems = [
    { name: t('nav_home'), path: '/', icon: HiHome },
    { name: t('nav_vision'), path: '/vision-2030', icon: HiLightningBolt },
    { name: t('nav_shop'), path: '/shop', icon: HiShoppingCart },
    { name: t('nav_orders'), path: '/orders', icon: HiTruck },
    { name: t('nav_dashboard'), path: '/dashboard', icon: HiDatabase },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'}`}>
      {/* Header Fini/Premium */}
      <header className={`fixed top-0 left-0 right-0 z-[1000] border-b backdrop-blur-md transition-all h-20 flex items-center ${isLight ? 'bg-white/80 border-slate-200' : 'bg-slate-950/80 border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:rotate-12 transition-transform">
              <HiFire size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Goma<span className="text-orange-500">Gaz</span></span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                      : isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/5'
                  }`
                }
              >
                <item.icon size={18} />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions Droite */}
          <div className="flex items-center gap-3">
             {/* Language Switcher */}
             <div className="hidden md:flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
              {(['fr', 'en', 'sw'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    language === lang 
                      ? 'bg-white dark:bg-orange-500 text-orange-500 dark:text-white shadow-sm' 
                      : 'text-slate-500 hover:text-orange-500'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Cart & Theme */}
            <Link to="/shop" className="relative h-11 w-11 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10">
              <HiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className="h-11 w-11 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-orange-400 border border-slate-200 dark:border-white/10"
            >
              {theme === 'dark' ? <HiSun size={22} /> : <HiMoon size={22} /> }
            </button>

            {/* Mobile Menu Toggle */}
            <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden h-11 w-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div className={`fixed inset-0 z-[900] bg-slate-950/20 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMenuOpen(false)} />
      <div className={`fixed top-0 bottom-0 right-0 w-80 z-[950] bg-white dark:bg-slate-950 shadow-2xl lg:hidden transition-transform duration-500 ease-out transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 pt-24 space-y-6">
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl w-full mb-8">
            {(['fr', 'en', 'sw'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setMenuOpen(false); }}
                className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase transition-all ${
                  language === lang 
                    ? 'bg-white dark:bg-orange-500 text-orange-500 dark:text-white shadow-sm' 
                    : 'text-slate-500'
                }`}
              >
                {lang === 'sw' ? 'Swahili' : lang === 'fr' ? 'Français' : 'English'}
              </button>
            ))}
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                    isActive 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                      : isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/5'
                  }`
                }
              >
                <item.icon size={24} />
                <span className="text-lg">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

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
          <p className="text-slate-500 text-xs font-medium">&copy; {new Date().getFullYear()} Goma Energy Solution. North-Kivu, DRC.</p>
        </div>
      </footer>
    </div>
  );
}
