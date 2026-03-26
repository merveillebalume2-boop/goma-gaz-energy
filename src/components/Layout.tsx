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
import { 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaInstagram 
} from 'react-icons/fa';
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

  const socialLinks = [
    { icon: <FaFacebook size={20} />, color: 'hover:text-[#1877F2]', link: '#' },
    { icon: <FaTwitter size={20} />, color: 'hover:text-[#1DA1F2]', link: '#' },
    { icon: <FaWhatsapp size={20} />, color: 'hover:text-[#25D366]', link: '#' },
    { icon: <FaInstagram size={20} />, color: 'hover:text-[#E4405F]', link: '#' },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'}`}>
      
      {/* Header Fini/Premium Minimaliste */}
      <header className={`fixed top-0 left-0 right-0 z-[1000] border-b backdrop-blur-xl transition-all h-24 flex items-center ${isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-950/90 border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20 group-hover:rotate-12 transition-transform">
              <HiFire size={28} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase hidden sm:inline">Goma<span className="text-orange-500">Gaz</span></span>
          </Link>

          <div className="flex items-center gap-4">
             {/* Language Selector */}
             <div className="flex bg-slate-200 dark:bg-white/10 p-1 rounded-xl border border-slate-300 dark:border-white/10">
              {(['fr', 'en', 'sw'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                    language === lang 
                      ? 'bg-orange-500 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-orange-500'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-white/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-orange-400 border border-slate-300 dark:border-white/10"
            >
              {theme === 'dark' ? <HiSun size={24} /> : <HiMoon size={24} /> }
            </button>

            <button 
                onClick={() => setDrawerOpen(true)}
                className="h-12 px-6 rounded-2xl bg-orange-500 text-white flex items-center gap-3 shadow-2xl shadow-orange-500/40 hover:scale-[1.05] active:scale-95 transition-all font-black"
            >
              <HiMenu size={26} />
              <span className="hidden md:inline uppercase text-xs tracking-widest font-black leading-none pt-1">{t('nav_menu')}</span>
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
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed top-0 bottom-0 right-0 w-full sm:w-[450px] z-[2000] bg-white dark:bg-slate-950 shadow-2xl flex flex-col p-10 pt-28"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <HiTranslate size={28} className="text-orange-500" />
                  <span className="font-black uppercase tracking-widest text-sm">{t('nav_menu')}</span>
                </div>
                <button 
                   onClick={() => setDrawerOpen(false)}
                   className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:rotate-90 transition-all text-slate-600 dark:text-orange-400"
                >
                   <HiX size={32} />
                </button>
              </div>

              <nav className="flex-1 space-y-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-6 p-6 rounded-[2.5rem] font-black transition-all group ${
                        isActive 
                          ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' 
                          : isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/5'
                      }`
                    }
                  >
                    <div className={`p-4 rounded-2xl ${isLight ? 'bg-slate-100 group-hover:bg-white' : 'bg-white/5 group-hover:bg-white/10'} transition-colors`}>
                        <item.icon size={28} className={item.color} />
                    </div>
                    <span className="text-2xl tracking-tighter">{item.name}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Social Icons in Drawer Menu */}
              <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex justify-center gap-6 mb-8">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    className={`h-12 w-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center transition-all ${social.color} hover:scale-125`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className="opacity-40">
                  <p className="text-[10px] font-black text-slate-500 text-center uppercase tracking-[0.2em]">{t('nav_dashboard')} &bull; GOMA GAZ ENERGY</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-24 px-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Footer with Social Icons */}
      <footer className={`py-16 border-t mt-20 ${isLight ? 'border-slate-200 bg-white/50' : 'border-white/5 bg-slate-950/20'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8 group cursor-default">
            <HiFire size={24} className="text-orange-500 group-hover:rotate-12 transition-transform" />
            <span className="font-black text-2xl tracking-tighter uppercase">Goma<span className="text-orange-500">Gaz</span></span>
          </div>
          
          {/* Social Links Row */}
          <div className="flex items-center justify-center gap-8 mb-10">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.link}
                className={`text-slate-400 ${social.color} transition-all duration-300 hover:scale-125`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
             &copy; {new Date().getFullYear()} Goma Energy Solution &bull; North-Kivu, DRC
          </p>
        </div>
      </footer>
    </div>
  );
}
